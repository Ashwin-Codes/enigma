const fs = require("fs").promises;
const path = require("path");
const { promptInput } = require("../../utility/userInput");
const { promptChoice } = require("../../utility/userInput");
const createReadStream = require("fs").createReadStream;
const existsSync = require("fs").existsSync;
const getBits = require("./getBits");
const generateFrame = require("./generateFrame");
const generateVideo = require("./generateVideo");
const { createSpinner } = require("nanospinner");
const { EventEmitter } = require("events");

async function encode() {
	const spinner = createSpinner();
	const videoRender = new EventEmitter();

	// User Inputs
	const { filePath } = await promptInput("filePath", "Enter file path");
	let { outputFilename } = await promptInput("outputFilename", "Enter output filename");

	// Remove extention
	if (outputFilename.includes(".mp4")) {
		outputFilename = outputFilename.replace(".mp4", "");
	}

	// Check for empty user input
	if (!filePath || !outputFilename) {
		spinner.error({ text: "Invalid filepath or output filename" });
		return;
	}

	// Check if path exists
	const exists = existsSync(filePath);
	if (!exists) {
		spinner.error({ text: "Invalid Path" });
		return;
	}

	// Check if output file already exists
	const outputFileexists = existsSync(`${__dirname}/../../${outputFilename}.mp4`);
	if (outputFileexists) {
		spinner.warn({ text: "Output file already exists" });
		const { overwrite } = await promptChoice("overwrite", "Overwrite existing file ?");
		if (overwrite) {
			await fs.unlink(`${__dirname}/../../${outputFilename}.mp4`);
		} else {
			return;
		}
	}

	// Check if path is a file
	const fileStats = await fs.lstat(filePath);
	if (!fileStats.isFile()) {
		spinner.error({ text: "Filepath is invalid or is not a file" });
		return;
	}

	// Check if temp folder exists
	const tempFolderPath = __dirname + "/../../temp";
	const folderExists = existsSync(tempFolderPath);

	// If temp folder exist remove its contents
	if (folderExists) {
		const folderContents = await fs.readdir(tempFolderPath);
		for (const file of folderContents) {
			await fs.unlink(path.join(tempFolderPath, file), (err) => {
				if (err) throw err;
			});
		}
	} else {
		await fs.mkdir(tempFolderPath);
	}

	// File stream
	const stream = createReadStream(filePath, { encoding: "binary" });

	// Stream error event
	stream.on("error", function (error) {
		spinner.error({ text: "Something went wrong" });
	});

	// Temp variable
	let frameCount = 1;

	// Stream data event
	spinner.start({ text: "0 frames generated" });
	stream.on("data", async (chunk) => {
		const bits = getBits(chunk);
		const totalGeneratedFrames = generateFrame(bits, frameCount);
		spinner.clear();
		spinner.update({ text: `${totalGeneratedFrames} frames generated` });
		frameCount = totalGeneratedFrames;
	});

	// Stream end event
	stream.on("end", async () => {
		spinner.success();
		await generateVideo(outputFilename, videoRender);
	});

	// Video rendered successfully event
	videoRender.on("complete", async () => {
		// Clean temp folder
		spinner.start({ text: "Cleaning temp files" });
		const folderContents = await fs.readdir(tempFolderPath);
		for (const file of folderContents) {
			await fs.unlink(path.join(tempFolderPath, file), (err) => {
				if (err) throw err;
			});
		}
		spinner.success({ text: "Temp files cleaned" });
	});

	// Video render failed event
	videoRender.on("fail", async () => {
		// Clean temp folder
		spinner.start({ text: "Cleaning temp files" });
		const folderContents = await fs.readdir(tempFolderPath);
		for (const file of folderContents) {
			await fs.unlink(path.join(tempFolderPath, file), (err) => {
				if (err) throw err;
			});
		}
		spinner.success({ text: "Temp files cleaned" });
		process.exit();
	});
}

module.exports = encode;
