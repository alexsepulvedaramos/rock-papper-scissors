import { createInterface } from "readline";

const options = ["rock", "paper", "scissors"];
let scoreboard = [0, 0];

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

function getComputerOption() {
    return options[Math.floor(Math.random() * 3)];
}

function questionText() {
    const menu = options.map((o, i) => `${i + 1} (${o})`).join("\n");
    return `Introduce your selection:\n${menu}\n4 (exit)\n> `;
}

function calculateWinner(selectionNumber) {
    const userOption = options[selectionNumber - 1];
    const computerOption = getComputerOption();
    console.log(`Your selection: ${userOption}`);
    console.log(`CPU's selection: ${computerOption}`);

    if (userOption === computerOption) {
        console.log("It's a tie!");
    } else if (
        (userOption === "rock" && computerOption === "scissors") ||
        (userOption === "paper" && computerOption === "rock") ||
        (userOption === "scissors" && computerOption === "paper")
    ) {
        console.log("You win!");
        scoreboard[0]++;
    } else {
        console.log("CPU wins!");
        scoreboard[1]++;
    }

    const totalGames = scoreboard[0] + scoreboard[1];
    console.log(`Scoreboard: You ${scoreboard[0]} - CPU ${scoreboard[1]} (Total games: ${totalGames})`);
}

function askUserOption() {
    rl.question(questionText(), (selection) => {
        const selectionNumber = Number(selection);
        const isValid = Number.isInteger(selectionNumber) && selectionNumber >= 1 && selectionNumber <= 4;

        if (!isValid) {
            console.log("Invalid selection. Choose 1, 2, 3 or 4...");
            askUserOption();
            return;
        } else if (selectionNumber === 4) {
            rl.close();
        }

        calculateWinner(selectionNumber);

        const timeoutId = setTimeout(() => {
            askUserOption();
        }, 1000);
    });
}

askUserOption();