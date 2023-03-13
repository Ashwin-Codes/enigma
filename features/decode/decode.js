const fs = require("fs").promises;
const path = require("path");
const { promptInput } = require("../../utility/userInput");
const { promptChoice } = require("../../utility/userInput");
const { createSpinner } = require("nanospinner");
const existsSync = require("fs").existsSync;
const frameExtraction = require("./frameExtraction");
const { EventEmitter } = require("events");
const generateFile = require("./generateFile");

async function decode() {
	const spinner = createSpinner();
	const frameExtract = new EventEmitter();

	// User inputs
	const { filePath } = await promptInput("filePath", "Enter video file path");

	// Check for empty user input
	if (!filePath) {
		spinner.error({ text: "Filepath empty" });
		return;
	}

	// Check if path exists
	const exists = existsSync(filePath);
	if (!exists) {
		spinner.error({ text: "Invalid Path" });
		return;
	}

	// Check if path is a file
	const fileStats = await fs.lstat(filePath);
	if (!fileStats.isFile()) {
		spinner.error({ text: "Filepath is not a file" });
		return;
	}

	const { originalFileName } = await promptInput("originalFileName", "Enter original file name with extention");

	// Check for empty user input
	if (!originalFileName) {
		spinner.error({ text: "File name empty" });
		return;
	}

	// Check if original file already exists
	const outputFileexists = existsSync(`${__dirname}/../../${originalFileName}`);
	if (outputFileexists) {
		spinner.warn({ text: `Original file (${originalFileName}) already exists` });
		const { overwrite } = await promptChoice("overwrite", "Overwrite existing file ?");
		if (overwrite) {
			await fs.unlink(`${__dirname}/../../${originalFileName}`);
		} else {
			return;
		}
	}

	// If temp folder already exist remove its contents
	const tempFolderPath = __dirname + "/../../temp";
	const folderExists = existsSync(tempFolderPath);

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

	frameExtraction(filePath, frameExtract);
	frameExtract.on("complete", async () => {
		spinner.start({ text: "Extracting bits from frames" });
		await generateFile(originalFileName);
		spinner.success({ text: "File decoded" });
	});
}

module.exports = decode;
