let currentNumber = "";
let previousNumber = "";
let selectedOperator = "";

const display = document.getElementById("result");


// UPDATE DISPLAY

function updateDisplay() {

    if (currentNumber === "") {
        display.value = "0";
    } else {
        display.value = currentNumber;
    }
}


// ADD NUMBER

function addNumber(number) {

    // Ntukemere decimal ebyiri
    if (number === "." && currentNumber.includes(".")) {
        return;
    }

    currentNumber += number;

    updateDisplay();
}


// CLEAR

function clearCalculator() {

    currentNumber = "";
    previousNumber = "";
    selectedOperator = "";

    updateDisplay();
}

function deleteOne() {
    currentNumber = currentNumber.slice(0, -1);
    updateDisplay();
}

// SELECT OPERATOR

function setOperator(operator) {

    if (currentNumber === "") {
        return;
    }

    previousNumber = currentNumber;

    currentNumber = "";

    selectedOperator = operator;
}


// CALCULATE

function calculate() {

    if (
        previousNumber === "" ||
        currentNumber === "" ||
        selectedOperator === ""
    ) {
        return;
    }

    let firstNumber = parseFloat(previousNumber);
    let secondNumber = parseFloat(currentNumber);

    let answer;


    switch (selectedOperator) {

        case "+":
            answer = firstNumber + secondNumber;
            break;

        case "-":
            answer = firstNumber - secondNumber;
            break;

        case "*":
            answer = firstNumber * secondNumber;
            break;

        case "/":

            if (secondNumber === 0) {

                currentNumber = "Error";

                previousNumber = "";
                selectedOperator = "";

                updateDisplay();

                return;
            }

            answer = firstNumber / secondNumber;

            break;
    }


    currentNumber = String(answer);

    previousNumber = "";

    selectedOperator = "";

    updateDisplay();
}


// PERCENTAGE

function percentage() {

    if (currentNumber === "") {
        return;
    }

    currentNumber =
        String(parseFloat(currentNumber) / 100);

    updateDisplay();
}


// PLUS / MINUS

function changeSign() {

    if (currentNumber === "") {
        return;
    }

    currentNumber =
        String(parseFloat(currentNumber) * -1);

    updateDisplay();
}


// CLOCK

function updateTime() {

    const now = new Date();

    let hours = now.getHours();

    let minutes = now.getMinutes();

    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    document.getElementById("time").textContent =
        hours + ":" + minutes;
}


updateTime();

setInterval(updateTime, 1000);


// KEYBOARD

document.addEventListener("keydown", function(event) {

    const key = event.key;


    // NUMBERS

    if (
        (key >= "0" && key <= "9") ||
        key === "."
    ) {
        addNumber(key);
    }


    // OPERATORS

    if (
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/"
    ) {
        setOperator(key);
    }


    // ENTER

    if (
        key === "Enter" ||
        key === "="
    ) {
        calculate();
    }


    // ESCAPE

    if (key === "Escape") {
        clearCalculator();
    }


    // PERCENT

    if (key === "%") {
        percentage();
    }

});

