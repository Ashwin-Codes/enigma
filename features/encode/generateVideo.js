const fs = require("fs").promises;
const { spawn } = require("child_process");
const { createSpinner } = require("nanospinner");

async function generateVideo(outputFilename, videoRender) {
	const spinner = createSpinner();
	spinner.start({ text: "Rendering video via ffmpeg" });

	const tempFolderPath = __dirname + "/../../temp";
	const ffmpegProcess = spawn(
		"ffmpeg",
		[
			"-framerate",
			"10",
			"-i",
			"%d.png",
			"-c:v",
			"libx264",
			"-pix_fmt",
			"yuv420p",
			`${__dirname}/../../${outputFilename}.mp4`,
		],
		{
			cwd: tempFolderPath,
		}
	);

	ffmpegProcess.on("error", (data) => {
		spinner.error({ text: "Video render failed." });
		console.log(data);
	});

	ffmpegProcess.on("close", () => {
		spinner.success({ text: "Video render complete" });
		videoRender.emit("complete");
	});
}

module.exports = generateVideo;
