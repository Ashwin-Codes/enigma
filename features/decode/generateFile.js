const fs = require("fs").promises;
const { loadImage, createCanvas } = require("canvas");
const writeBits = require("./writeBits");
const { createSpinner } = require("nanospinner");

async function generateFile(filename) {
	const spinner = createSpinner();
	const tempFolderPath = __dirname + "/../../temp";
	const folderContents = await fs.readdir(tempFolderPath);

	spinner.start({ text: "Preparing bit extraction" });

	for (let i = 0; i < folderContents.length; i++) {
		const image = await loadImage(`${tempFolderPath}/${folderContents[i]}`);
		const canvas = createCanvas(image.width, image.height);
		const ctx = canvas.getContext("2d");
		ctx.drawImage(image, 0, 0, image.width, image.height);

		spinner.update({ text: `Processing frame ${i + 1}/${folderContents.length}` });

		let data = "";
		for (let x = 0; x < image.width; x += 2) {
			for (let y = 0; y < image.height; y += 2) {
				const pixelData = ctx.getImageData(x, y, 2, 2).data;
				const r = pixelData[0];
				if (r < 150) {
					data += "0";
				} else if (r > 150) {
					data += "1";
				}
				if (r == 150) {
					console.log(folderContents[i], pixelData[0], pixelData[1], pixelData[2]);
				}
			}
		}

		// Write bits to file
		writeBits(`${__dirname}/../../${filename}`, data);
	}
	spinner.success({ text: "All frames processed" });
}

module.exports = generateFile;
