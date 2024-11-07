const express = require("express");
const router = express.Router();

router.get("/", (res) => {
	res.send("respond with a resource");
});

module.exports = router;
