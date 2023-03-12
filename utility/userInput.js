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

async function promptInput(name, message) {
	return await inquirer.prompt({
		name,
		message,
		type: "input",
	});
}

async function promptChoice(name, message) {
	return await inquirer.prompt({
		type: "confirm",
		name: name,
		message: message,
		initial: true,
	});
}

module.exports = { promptOptions, promptInput, promptChoice };
