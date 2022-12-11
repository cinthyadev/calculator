class Calculator {
  constructor() {
    this.operation = null;
    this.operationCount = 0;
    this.operatorsDict = {
      "+": this.addition,
      "-": this.substraction,
      "x": this.multiply,
      "/": this.divide,
    };
  }

  addition = (number1, number2) => {
    return number1 + number2;
  };

  substraction = (number1, number2) => {
    return number1 - number2;
  };

  multiply = (number1, number2) => {
    return number1 * number2;
  };

  divide = (number1, number2) => {
    return number1 / number2;
  };

  disableDot = () => {
    let dot = document.querySelector(".dot");
    dot.removeEventListener("click", populateDisplay);
    dot.classList.add("firstRowButtons");
  };

  enableDot = () => {
    let dot = document.querySelector(".dot");
    dot.addEventListener("click", populateDisplay);
    dot.classList.remove("firstRowButtons");
  };

  getNumbersFromDisplay = (displayString) => {
    const numbers = Array.from(displayString.matchAll(/[0-9(\.)]+/g));
    return numbers;
  };

  performOperation = (displayString, operation) => {
    const prepareString = this.getNumbersFromDisplay(displayString);
    let result = 0;
    if (prepareString.length > 1) {
      result = operation(
        parseFloat(prepareString[0]),
        parseFloat(prepareString[1])
      );
    } else {
      result = operation(
        parseFloat(prepareString[0]),
        parseFloat(prepareString[0])
      );
    }
    result = result % 1 == 0 ? result : result.toFixed(4);
    if (result == Infinity) {
      result = 0;
      alert("Your attempt to divide by 0 shall not pass!!");
    }
    return result;
  };
}

const calculator = new Calculator();
let operationToPerform = calculator.operation;
let operationCount = calculator.operationCount;

const populateDisplay = (item) => {
  let display = document.querySelector(".display").textContent;
  item = item.currentTarget;
  const value = item.innerText;
  const lastCharacterPosition = display.length - 1;
  const lastCharacter = display.charAt(lastCharacterPosition);
  if (value in calculator.operatorsDict) {
    calculator.enableDot();
    if (
      (lastCharacter in calculator.operatorsDict) &
      (value in calculator.operatorsDict)
    ) {
      const replaceOperator = `${display.substring(
        0,
        lastCharacterPosition
      )}${value}`;
      document.querySelector(".display").textContent = replaceOperator;
      return;
    }
    operationCount += 1;
    if (operationCount > 1) {
      const result = calculator.performOperation(display, operationToPerform);
      document.querySelector(".display").textContent = `${result}`;
    }
    operationToPerform = calculator.operatorsDict[value];
  }

  //   if the display is set to default (0) and the inserted value is not one of the positive/negative number operators, check for the following conditions
  if ((display == "0") & (value != "x") & (value != "/")) {
    // if first input is a dot, keep the initial 0 and add the dot
    if ((value == ".") & !display.includes(".")) {
      document.querySelector(".display").textContent += value;
      calculator.disableDot();
    } else {
      // if the first input is not a dot, change the defualt 0 to the inserted number
      document.querySelector(".display").textContent = value;
    }
    // if it is not the first number inserted, but it is a dot, add it and remove its event listener until another operation symbol is selected
  } else if (value == ".") {
    document.querySelector(".display").textContent += value;
    calculator.disableDot();
    //   if the display has a value different than the default and the selected value is not a dot, concatenate it.
  } else {
    document.querySelector(".display").textContent += value;
  }
};

const operate = () => {
  if (operationCount > 0) {
    const display = document.querySelector(".display").textContent;
    const result = calculator.performOperation(display, operationToPerform);
    document.querySelector(".display").textContent = result;
    operationCount = 0;
  }
};

const allClear = () => {
    document.querySelector(".display").textContent = 0;
    calculator.operationCount = 0;
} 

const numberElements = document.querySelectorAll(".number");
numberElements.forEach((item) => {
  item.addEventListener("click", populateDisplay);
});

const operatorElements = document.querySelectorAll(".operationButton");
operatorElements.forEach((item) => {
  item.addEventListener("click", populateDisplay);
});

document.querySelector(".equalsButton").addEventListener("click", operate);
document.querySelector(".acButton").addEventListener("click", allClear);
