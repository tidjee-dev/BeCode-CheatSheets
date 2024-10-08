/**==============================================================
 * *                         BLACKJACK
 *---------------------------------------------------------------*
 *  Author: Tidjee
 *  Date: 2024-09-13
 *  Github: https://github.com/tidjee-dev
 *  Description: Small project to play BlackJack in the console
 *  made during my Junior Dev formation @BeCode.
 *==============================================================**/

const readline = require('readline');
const fs = require('fs');
const TABLE = require('cli-table3');
const colors = require('@colors/colors');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**-----------------
 **    Variables
 *------------------ */

let playerName = 'Unknown';
let playerScore = 0;
let bankScore = 0;

// * Colors
const RESET = colors.reset;
const GREEN = colors.green;
const YELLOW = colors.yellow;
const RED = colors.red;
const BLUE = colors.blue;
const CYAN = colors.cyan;

// * Text style
const BOLD = colors.bold;
const ITALIC = colors.italic;
const UNDERLINE = colors.underline;

// * Background colors
const BG_RED = colors.bgRed;
const BG_GREEN = colors.bgGreen;
const BG_YELLOW = colors.bgYellow;
const BG_BLUE = colors.bgBlue;
const BG_CYAN = colors.bgCyan;

// * Style (icon and colored text)
const SUCCESS = (message) => `✅ ${colors.brightGreen(message)}`;
const WARNING = (message) => `⚠️ ${colors.brightYellow(message)}`;
const ERROR = (message) => `❌ ${colors.brightRed(message)}`;
const INFO = (message) => `ℹ️ ${colors.bgBlue(message)}`;
const DEBUG = (message) => `🐞 ${colors.bgCyan(message)}`;
const WIN = (message) => `🎉🎉🎉 ${colors.america(message)} 🎉🎉🎉`;
const LOSE = (message) => `💔 ${colors.brightRed(message)} 💔`;
const TIE = (message) => `🤝 ${colors.blue(message)} 🤝`;

const testStyle = () => {
    console.log(SUCCESS('Player has won!'));
    console.log(WARNING('This is your last chance!'));
    console.log(ERROR('An error occurred!'));
    console.log(INFO('The game has started.'));
    console.log(DEBUG('Debugging the score calculation ... '));
    console.log(WIN('Player wins!'));
    console.log(LOSE('Player loses!'));
    console.log(TIE('Tie!'));
}

/**-----------------
 * *    Tables
 *------------------ */

const displayTitleScreen = () => {
    const menuTable = new TABLE({
        head: [`${CYAN}${BOLD}Menu${RESET}`],
        colWidths: [40],
        colAligns: ['center'],
        style: {
            border: ['grey'],
            compact: true
        }
    });

    menuTable.push(
        ['1. Play\n'],
        ['l. Leaderboard'],
        ['r. Reset leaderboard'],
        ['q. Exit'],
    );

    const titleTable = new TABLE({
        head: [`${BG_BLUE}${BOLD}\nBlackJack\n${RESET}`],
        colWidths: [60],
        colAligns: ['center'],
        style: {
            head: ['white'],
            border: ['yellow'],
            compact: true
        },
        chars: {
            'top': '═',
            'top-mid': '╤',
            'top-left': '╔',
            'top-right': '╗',
            'bottom': '═',
            'bottom-mid': '╧',
            'bottom-left': '╚',
            'bottom-right': '╝',
            'left': '║',
            'left-mid': '╟',
            'mid': '─',
            'mid-mid': '┼',
            'right': '║',
            'right-mid': '╢',
            'middle': '│'
        }
    });

    titleTable.push(
        [`Welcome to BlackJack game in terminal.\n`],
        [`Get as close to 21 as you can without going over!\n`],
        [`So, are you able to ...\n`],
        [`${YELLOW}BEAT THE BANK!${RESET}`],
        [`\nGLHF!\n`],
        [menuTable.toString() + '\n'],
        [`Made in JavaScript by Tidjee\n`],
        [`Source code available at:`],
        [`${INFO('https://github.com/tidjee-dev')}\n${RESET}`]
    );

    console.log(titleTable.toString());
}

const leaderboardTable = (scores) => {
    const table = new TABLE({
        head: ['Name', 'Date', 'Winner', 'Player Score', 'Bank Score'],
        colWidths: [15, 25, 15, 15, 15],
        style: {
            head: ['green'],
            border: ['yellow'],
        }
    });

    scores.forEach(score => {
        table.push([
            score.name,
            score.date,
            score.winner,
            score.playerScore,
            score.bankScore
        ]);
    });

    console.log(table.toString());
}

const goodbyeMenu = () => {
    const goodbyeTable = new TABLE({
        head: ['GOODBYE'],
        colWidths: [60],
        colAligns: ['center'],
        style: {
            head: ['red'],
            border: ['white'],
            compact: true
        }
    });

    goodbyeTable.push(
        ['\nThank you for playing!'],
        ['See you next time!\n']
    );

    console.log(goodbyeTable.toString());
}

/**-----------------
 * *    Functions
 *------------------ */

const startGame = () => {
    console.clear();
    displayMenu();
}

const displayMenu = () => {
    displayTitleScreen();
    displayMenuOptions();
}

const displayMenuOptions = () => {
    rl.question('\nChoose an option: \n', (option) => {
        switch (option) {
            case '1':
                console.clear();
                play();
                break;
            case 'l':
                console.clear();
                readLeaderboard();
                break;
            case 'r':
                resetLeaderboard();
                break;
            case 'q':
                console.clear();
                goodbyeMenu();
                rl.close();
                break;
            default:
                console.clear();
                console.log(`\n${INFO('Invalid option!')} ... Try again ... \n`);
                displayMenu();
                break;
        }
    });
}

const anyKeyToContinue = () => {
    rl.question(`\n${INFO("Press any key to continue ...")} \n`, () => {
        console.clear();
        displayMenu();
    });
}

const gameLoop = () => {
    if (playerScore === 21 || bankScore === 21) {
        checkWinner();
    }

    rl.question('\nDo you want another card? (y/n): \n', (answer) => {
        switch (answer.toLowerCase()) {
            case 'y':
                const newCard = getRandomNumber(1, 11);
                playerScore += newCard;
                console.log(`\nYou got: ${newCard}`);
                console.log(`\nYour total: ${playerScore}`);
                if (playerScore >= 21) {
                    checkWinner();
                    saveScore(playerScore, bankScore);
                    retry();
                    break;
                } else {
                    gameLoop();
                }
                break;
            case 'n':
                checkWinner();
                saveScore(playerScore, bankScore);
                retry();
                break;
            default:
                console.log(`\n${INFO('Invalid option! ...')} Use 'y' or 'n' \n`);
                gameLoop();
        }
    });
}

const checkWinner = () => {
    switch (true) {
        case (playerScore === 21):
            console.log(`\n${WIN('BlackJack! Player wins!')}!`);
            console.log(`\nPlayer score: ${playerScore} | Bank score: ${bankScore}`);
            retry();
            break;
        case (playerScore > 21):
            console.log(`\n${LOSE('Busted! Player loses!')}`);
            console.log(`\nPlayer score: ${playerScore} | Bank score: ${bankScore}`);
            retry();
            break;
        case (bankScore === 21):
            console.log(`\n${LOSE('BlackJack! Bank wins!')}`);
            console.log(`\nPlayer score: ${playerScore} | Bank score: ${bankScore}`);
            retry();
            break;
        case (playerScore > bankScore):
            console.log(`\n${WIN('Player wins!')}`);
            console.log(`\nPlayer score: ${playerScore} | Bank score: ${bankScore}`);
            retry();
            break;
        case (bankScore > playerScore):
            console.log(`\n${LOSE('Bank wins!')}`);
            console.log(`\nPlayer score: ${playerScore} | Bank score: ${bankScore}`);
            retry();
            break;
        case (bankScore === playerScore):
            console.log(`\n${TIE('Tie!')}`);
            console.log(`\nPlayer score: ${playerScore} | Bank score: ${bankScore}`);
            retry();
            break;
        default:
            gameLoop();
            break;
    }
}

const play = () => {
    console.clear();

    rl.question('\nEnter your name: ', (name) => {
        console.log(`\nHello, ${name}!`);

        playerName = name;

        bankScore = getRandomNumber(16, 21);
        playerScore = getRandomNumber(1, 11);

        console.log(`\nPlayer: ${playerScore}`);
        gameLoop();
    });
}

const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const retry = () => {
    rl.question(`\n${INFO('Do you want to play again? (y/n)')} \n`, (answer) => {
        switch (answer.toLowerCase()) {
            case 'y':
                play();
                break;
            case 'n':
                console.clear();
                displayMenu();
                break;
            default:
                console.log('\nInvalid option');
                retry();
        }
    });
}

const createJSON = () => {
    fs.writeFileSync('scores.json', JSON.stringify([]));
}

const saveScore = (playerScore, bankScore) => {
    if (!fs.existsSync('scores.json')) {
        createJSON();
    }

    const scores = JSON.parse(fs.readFileSync('scores.json'));
    const date = new Date().toLocaleString();
    let winner = '';
    if (playerScore > 21 && bankScore > 21) {
        winner = 'No winner';
    } else if (playerScore > 21) {
        winner = 'Bank';
    } else if (bankScore > 21) {
        winner = playerName;
    } else if (playerScore === bankScore) {
        winner = 'Tie';
    } else if (playerScore > bankScore) {
        winner = playerName;
    } else {
        winner = 'Bank';
    }

    scores.push({
        name: playerName,
        date: date,
        winner: winner,
        playerScore: playerScore,
        bankScore: bankScore
    });
    fs.writeFileSync('scores.json', JSON.stringify(scores, null, 2));
}

const readLeaderboard = () => {
    if (!fs.existsSync('scores.json')) {
        createJSON();
    }
    let scores = JSON.parse(fs.readFileSync('scores.json'));

    if (scores.length > 0) {
        console.log(`\n------ ${GREEN}Leaderboard${RESET} ------\n`);

        scores.sort((a, b) => {
            if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
            if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
            return b.winner - a.winner;
        });

        leaderboardTable(scores);
    } else {
        console.clear();
        console.log(`\n${WARNING('No scores available!')}\n`);
        return displayMenu();
    }

    anyKeyToContinue();
}

const eraseLeaderboard = () => {
    createJSON();
    console.log(`\n${SUCCESS('Leaderboard cleared!')}\n`);
    displayMenu();
}

const resetLeaderboard = () => {
    if (!fs.existsSync('scores.json' || fs.statSync('scores.json').size === 0)) {
        console.log(`\n${WARNING('No scores available!')}\n`);
        return displayMenu();
    } else {
        rl.question('\nAre you sure you want to reset the leaderboard? (y/n): \n', (answer) => {
            switch (answer.toLowerCase()) {
                case 'y':
                    console.clear();
                    eraseLeaderboard();
                    break;
                case 'n':
                    console.clear();
                    console.log(`\n${INFO('No changes were made!')}\n`);
                    displayMenu();
                    break;
                default:
                    console.log(`\n${INFO('Invalid option! ...')} Use 'y' or 'n'\n`);
                    resetLeaderboard();
            }
        });
    }

}

/**-----------------
 * *    Main
 *------------------ */

// testStyle();

startGame();