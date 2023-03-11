const inquirer = require("inquirer");

async function promptOptions(name, choicesArr) {
	return await inquirer.prompt({
		name: name,
		type: "list",
		message: "Pick an option :",
		prefix: " ",
		choices: choicesArr.map((value) => {
			return value;
		}),
	});
}

async function main() {
	const choices = ["Encode", "Decode", "Download"];
	const option = await promptOptions("picked", choices);

	switch (option.picked) {
		case choices[0]:
			console.log("You picked Encode");
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
