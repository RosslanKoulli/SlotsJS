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

//STEP 5
//Now we need to transpose the matrix array
const transpose = (reels) =>{
    const rows = [];
    
    for(let i =0; i <ROWS; i++){
        rows.push([]);
        for(let j = 0; j < COLS; j++){

            rows[i].push(reels[j][i]);
        }
    }
    return rows
};

const printRows = (rows) => {
    for(const row of rows) {
        let rowString = "";
        for(const [i,symbol]of row.entries()){
            rowString += symbol;
            if(i != row.length -1){
                rowString += " | ";
            }
        }
        console.log(rowString);

    }
};
//STEP 6
const getWinnings = (rows, bet, lines ) => {
    let winnings = 0;
    for(let row = 0; row < lines; row++){
        const symbols = rows[row];
        let allSame = true;

        for(const symbol of symbols ){
            if(symbol != symbols[0]){
                allSame = false;
                break;
            }
        }
        if(allSame ){
            winnings += bet * SYMBOL_VALUES[symbols[0]];
        }
    }
    return winnings;
};

//STEP 7  Create an exit and not enough money feature
const game = () => {
    let balance = deposit();  //Changing to let allows us to change the values of the varaibles since not constant `const`

    while(true) {
        console.log("You have a balance of $ "+ balance);
        const numberOfLines = getNumberOfLInes();
        const bet = getBet(balance, numberOfLines );
        balance -= bet * numberOfLines;
        const reels = spin();
        const rows = transpose(reels);
        printRows(rows);
        const winnings = getWinnings(rows,bet, numberOfLines);
        balance += winnings;
        console.log("You won, $" + winnings.toString());
        
        if(balance <= 0){
            console.log("you ran out of money! \nGoodbye dusty, see you when you got more money.")
            break;  
        }
        
        const playAgain = prompt("Do you want to pay again? (y,n)? ")

        if (playAgain != "y"){
            console.log("C'mon you know that fortune favors the persistent player; each bet is a step close to victory.");
            const playAgain = prompt("Do you want to pay again? (y,n)? ")
            if (playAgain != "y"){
                break;
            }
       
        }   
    }
}
game();
