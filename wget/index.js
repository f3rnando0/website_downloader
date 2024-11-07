const exec = require("node:child_process").exec;
const archiver = require("../archiver");

module.exports = (io, data) => {
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
