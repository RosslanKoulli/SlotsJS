// 1. Deposit some money
// 2. Determine number of lines to bet on
// 3. Collect a bet amount
// 4. SPin the slot machine
// 5. Check if the user won
// 6. Give the user their winnings
// 7. Play again 


//STEP 1
const prompt = require("prompt-sync")();

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




let balance = deposit();    //Changing to let allows us to change the values of the varaibles since not constant `const`
const numberOfLines = getNumberOfLInes();
const bet = getBet(balance, numberOfLines );