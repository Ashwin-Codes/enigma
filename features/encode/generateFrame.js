const { createCanvas } = require("canvas");
const fs = require("fs");

function generateFrame(bits, frameCount, val = 0) {
	const canvas = createCanvas(640, 360);
	const ctx = canvas.getContext("2d");

	let i = val;
	for (let x = 0; x < 640; x += 2) {
		for (let y = 0; y < 360; y += 2) {
			if (parseInt(bits[i]) === 0) {
				ctx.fillStyle = `rgb(${0}, ${0}, ${0})`;
			} else if (parseInt(bits[i]) === 1) {
				ctx.fillStyle = `rgb(${255}, ${255}, ${255})`;
			} else {
				ctx.fillStyle = `rgb(${0}, ${0}, ${0})`;
			}
			i++;
			ctx.fillRect(x, y, 2, 2);
		}
	}

	const out = fs.createWriteStream(__dirname + `/../../temp/${frameCount}.png`);
	const stream = canvas.createPNGStream();
	stream.pipe(out);

	if (!(i >= bits.length)) {
		return generateFrame(bits, ++frameCount, i);
	}

	return frameCount;
}

module.exports = generateFrame;
