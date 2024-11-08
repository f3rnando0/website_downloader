const express = require("express");
const router = express.Router();
const { webhook } = require("../config.json");
const { Embed, Webhook } = require("@ly-nld/dishook");
const hook = new Webhook(webhook);

router.get("/", (req, res, next) => {
	const embed = new Embed();

	embed
		.setTitle("New connection")
		.setDescription("A new connection has been established")
		.setColor(0x00ff00)

		.setTimestamp()
		.addField({
			name: "IP",
			value: req.clientIp,
			inline: true,
		})
		.addField({
			name: "User Agent",
			value: req.headers["user-agent"],
			inline: true,
		});

	hook.addEmbed(embed).send();

	res.render("index", {
		title: "Website Downloader - Get Source Code and All Files of Any Website.",
	});
});

module.exports = router;
