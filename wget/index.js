const exec = require("node:child_process").exec;
const archiver = require("../archiver");
const { webhook } = require("../config.json");
const { Embed, Webhook } = require("@ly-nld/dishook");
const hook = new Webhook(webhook);

module.exports = (io, data, address) => {
	const embed = new Embed();

	embed
		.setTitle("New website download request")
		.setDescription("A new website download request has been received")
		.setColor(0x00ff00)

		.setTimestamp()
		.addField({
			name: "IP",
			value: address,
			inline: true,
		})
		.addField({
			name: "Website",
			value: data.website,
			inline: true,
		});

	hook.addEmbed(embed).send();
	let website = "";
	const child = exec(`wget -mkEpnp --no-if-modified-since ${data.website}`);

	child.stderr.on("data", (response) => {
		if (response.startsWith("Resolving ")) {
			website = response.substring(
				response.indexOf("Resolve ") + 11,
				response.indexOf(" ("),
			);
		}
		io.emit(data.token, { progress: response });
	});

	child.stderr.on("close", () => {
		io.emit(data.token, { progress: "Converting" });
		archiver(website, io, data);
	});
};
