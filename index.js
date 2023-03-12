const { promptOptions } = require("./utility/userInput");
const encode = require("./features/encode/encode");
const which = require("which");

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
			console.log("You picked Decode");
			break;
		case choices[2]:
			console.log("You picked Download");
			break;
		default:
			break;
	}
}

main();
