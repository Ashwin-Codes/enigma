function getBits(dataChunk) {
	let bits = "";
	for (let i = 0; i < dataChunk.length; i++) {
		bits += dataChunk.charCodeAt(i).toString(2).padStart(8, 0);
	}
	return bits;
}

module.exports = getBits;
