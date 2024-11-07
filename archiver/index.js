const archiver = require("archiver");
const fs = require("node:fs");

module.exports = (file, io, data) => {
	const output = fs.createWriteStream(`./public/sites/${file}.zip`);
	const archive = archiver("zip", {
		zlib: { level: 9 },
	});

	output.on("close", () => {
		console.log(`${archive.pointer()} total bytes`);
		console.log(
			"archiver has been finalized and the output file descriptor has closed.",
		);
		io.emit(data.token, { progress: "Completed", file });
	});

	output.on("end", () => {
		console.log("Data has been drained");
	});

	archive.on("warning", (err) => {
		if (err.code === "ENOENT") {
			// log warning
		} else {
			throw err;
		}
	});

	archive.on("error", (err) => {
		throw err;
	});

	archive.pipe(output);

	archive.directory(`./${file}`, false);

	archive.finalize();
};
