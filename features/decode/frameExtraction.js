const { spawn } = require("child_process");
const { createSpinner } = require("nanospinner");

function frameExtraction(filepath, frameExtraction) {
	const spinner = createSpinner();
	const tempFolderPath = __dirname + "/../../temp";

	const ffmpeg = spawn("ffmpeg", ["-i", filepath, "-vf", "fps=10", `${tempFolderPath}/%d.png`]);

	ffmpeg.on("error", (data) => {
		spinner.error({ text: "Frames extraction failed" });
	});

	ffmpeg.on("exit", (code) => {
		spinner.success({ text: "Frames extracted from video successfully" });
		frameExtraction.emit("complete");
	});
}

module.exports = frameExtraction;
