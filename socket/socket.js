const wget = require("../wget");

module.exports = (io) => {
	io.on("connection", (socket) => {
		socket.on("request", (data) => {
			console.log("Request connection received %s", data.token);
			wget(io, data, socket.handshake.address);
		});
	});
};
