// 1. Deposit some money
// 2. Determine number of lines to bet on
// 3. Collect a bet amount
// 4. Spin the slot machine
// 5. Check if the user won
// 6. Give the user their winnings
// 7. Play again 


//STEP 1
const prompt = require("prompt-sync")();

//STEP 4
const ROWS = 3; 
const COLS = 3;

const SYMBOLS_COUNT = {
    "A":2,
    "B":4,
    "C":6,
    "D":8
}

const SYMBOL_VALUES = {
    "A":5,
    "B":4,
    "C":3,
    "D":2
}
//End of STEP 4

const deposit = () => {
    while(true){
        const depositAmount = prompt("Enter a deposit amount: ")
        const numberDepositAmount = parseFloat(depositAmount);
        
        if(isNaN(numberDepositAmount) || numberDepositAmount <= 0){
            console.log("Invalid deposit amount, try again.")
        } 

        else {
            return numberDepositAmount;
        }
    } 
};

//STEP 2
const getNumberOfLInes = () => {
    while(true){
        const lines = prompt("Enter a number of lines to bet on (1-3): ")
        const numberOfLines = parseFloat(lines);
        
        if(isNaN(numberOfLines) || numberOfLines <= 0 || numberOfLines > 3){
            console.log("Invalid deposit amount, try again.")
        } 

        else {
            return numberOfLines;
        }
    } 
};


//STEP 3
const getBet = (balance, lines) => {
    while(true){
        const bet = prompt("Enter the bet per line : ")
        const numberOfBets = parseFloat(bet);
        
        if(isNaN(numberOfBets) || numberOfBets <= 0 || numberOfBets > (balance/ lines)){
            console.log("Invalid deposit amount, try again.")
        } 

        else {
            return numberOfBets;
        }
    } 
};


//STEP 4
const spin = () => {
    const symbols = []; //We dont need to make it a let since we are not changing the value of the array, in javascript an array is an reference data type which means I can manipulate whats inside of the array without changeing the reference of the array so we can use const and still append the list.
    for(const[symbol,count] of Object.entries(SYMBOLS_COUNT)){
        for(let i = 0; i < count; i++){
            symbols.push(symbol);             //push is the js version of pythons append
        }
    }
    
    const reels = [[],[],[]];
    for(let i = 0; i < COLS; i++){
        const reelSymbols = [...symbols];
        for(let j = 0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length); // `Math.floor` rounds numbers down since indexs can only be whole nubmers
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1); //.splice removes n (1) element from the array with random index


        }
    }
    return reels;
};
//End of STEP 4

console.log(spin());
let balance = deposit();    //Changing to let allows us to change the values of the varaibles since not constant `const`
const numberOfLines = getNumberOfLInes();
const bet = getBet(balance, numberOfLines );