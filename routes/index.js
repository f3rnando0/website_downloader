const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
	res.render("index", {
		title:
			"Gifted Website Downloader - Get Source Code and All Files of Any Website.",
	});
});

module.exports = router;
