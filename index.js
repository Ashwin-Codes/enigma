const { promptOptions } = require("./utility/userInput");
const which = require("which");
const encode = require("./features/encode/encode");
const decode = require("./features/decode/decode");

async function main() {
	// Check if ffmpeg is installed
	try {
		await which("ffmpeg");
	} catch (err) {
		console.error("Enigma requires ffmpeg to work. Please install ffmpeg (https://ffmpeg.org/) to continue.");
		process.exit();
	}

	const choices = ["Encode", "Decode", "Download"];
	const option = await promptOptions("picked", choices);

	switch (option.picked) {
		case choices[0]:
			encode();
			break;
		case choices[1]:
			decode();
			break;
		case choices[2]:
			console.log("You picked Download");
			break;
		default:
			break;
	}
}

main();
