const fs = require("fs").promises;

function writeBits(filepath, data) {
	let imgBuffer = "";
	for (let i = 0; i < data.length; i = i + 8) {
		// Create a byte
		let byte = "";
		let temp = i;

		while (byte.length !== 8) {
			if (data[temp] === undefined) {
				byte += "0";
			} else {
				byte += data[temp++];
			}
		}

		// Get binary from byte
		imgBuffer += String.fromCharCode(parseInt(byte, 2));
	}
	const binaryBuffer = Buffer.from(imgBuffer, "binary");
	fs.appendFile(filepath, binaryBuffer);
}

module.exports = writeBits;
