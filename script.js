class Calculator {
  constructor() {
    // this.arg1 = arg1;
    // this.arg2 = arg2;
    this.operation = null;
    this.operationCount = 0;
  }

  addition = (number1, number2) => {
    return number1 + number2;
  };

  substract = (number1, number2) => {
    return number1 - number2;
  };

  multiply = (number1, number2) => {
    return number1 * number2;
  };

  divide = (number1, number2) => {
    return number1 / number2;
  };
  operatorsDict = {
    "+": this.addition,
    "-": this.substract,
    x: this.multiply,
    "/": this.divide,
  };
  disableDot = () => {
    let dot = document.querySelector(".dot");
    dot.removeEventListener("click", populateDisplay);
    dot.classList.add("firstRowButtons");
  };

  getNumbersFromDisplay = (displayString) => {
    const numbers = Array.from(displayString.matchAll(/[0-9(\.)]+/g));
    return numbers;
  };

  performOperation = (displayString, operation) => {
    const prepareString = this.getNumbersFromDisplay(displayString);
    const result = operation(
      parseInt(prepareString[0]),
      parseInt(prepareString[1])
    );
    return result;
  };
}

const calculator = new Calculator();
let operationToPerform = calculator.operation;
let operationCount = calculator.operationCount;

const populateDisplay = (item) => {
  let display = document.querySelector(".display").textContent;
  console.log(display);
  console.log("value");
  item = item.currentTarget;
  const value = item.innerText;
  console.log(value);

  if (value in calculator.operatorsDict) {
    const lastCharacterPosition = display.length - 1
    const lastCharacter = display.charAt(lastCharacterPosition)
    operationCount += 1;
    if (lastCharacter in calculator.operatorsDict & value in calculator.operatorsDict){
        console.log('lastCharacter');
        console.log(lastCharacter);
        console.log('value');
        console.log(value);
        console.log(display.substring(0, lastCharacterPosition));
        const replaceOperator = `${display.substring(0, lastCharacterPosition)}${value}`
        document.querySelector(".display").textContent = replaceOperator
    }
    if (operationCount > 1) {

      console.log(operationCount);
      const result = calculator.performOperation(display, operationToPerform);
      document.querySelector(".display").textContent = `${result}`;
    }
    
    operationToPerform = calculator.operatorsDict[value];
  }

  if (display == "0") {
    if ((value == ".") & !display.includes(".")) {
      document.querySelector(".display").textContent += value;
      calculator.disableDot();
    } else {
      document.querySelector(".display").textContent = value;
    }
  } else if (value == ".") {
    if (!display.includes(".")) {
      document.querySelector(".display").textContent += value;
      calculator.disableDot();
    } else {
      document.querySelector(".display").textContent += value;
    }
  } else {
    document.querySelector(".display").textContent += value;
  }
};

const operate = (item) => {
  item = item.currentTarget;
  const  display = document.querySelector(".display").textContent;
      const result = calculator.performOperation(display, operationToPerform);
      document.querySelector(".display").textContent = result
  console.log("equals");
};

const numberElements = document.querySelectorAll(".number");
numberElements.forEach((item) => {
  item.addEventListener("click", populateDisplay);
});

const operatorElements = document.querySelectorAll(".operationButton");
operatorElements.forEach((item) => {
  item.addEventListener("click", populateDisplay);
});

document.querySelector(".equalsButton").addEventListener("click", operate);
// document.querySelector('.number').addEventListener('click',initDocument)
// console.log(document.querySelectorAll('.number'));
// document.querySelectorAll('.number').addEventListener("click", populateDisplay);

// const addition = (number1, number2) => {
//     return number1 + number2;
//   };

//   const substract = (number1, number2) => {
//     return number1 - number2;
//   };

//   const multiply = (number1, number2) => {
//     return number1 * number2;
//   };

//   const divide = (number1, number2) => {
//     return number1 / number2;
//   };

//   const operate = (command) => {
//     const operatorsDict = {
//         '+' : addition,
//         '-' : substract,
//         'x' : multiply,
//         '/' : divide,
//     }

//     const x = document.getElementsByClassName("display")[0].innerText;
//     const filterResult = Array.from(x.matchAll(/[^\(\)0-9(\.)]+/g));
//     const numbers = Array.from(x.matchAll(/[0-9(\.)]+/g));

//     console.log(filterResult.length);
//     console.log(numbers.length);
//     for (let index = 0; index < filterResult.length; index++) {
//         const operation = filterResult
//         // const element = filterResult[index];

//         // console.log('element');
//         // console.log(element);
//         console.log(numbers[index][0])

//     }

//     // filterResult.map((result) => {
//     //     const oper = result[0]
//     //     const  numbers = x.split(oper)
//     //     console.log(oper);
//     //     console.log(numbers);
//     // })
//     // console.log(filterResult[0][0]);
//   };
//   // validate input

//   const allClearHandle = () => {
//     document.getElementsByClassName("display")[0].innerText = "0";
//   };

//   const populateDisplay = (value) => {
//     const operators = ["x", "+", "-", "/"];

//     let display = document.getElementsByClassName("display")[0].innerText;

//     if (operators.includes(value)) {
//       document.getElementsByClassName("display")[0].innerText += value;
//     } else {
//       if (display.length <= 7) {
//         if (display == "0") {
//           if (value == ".") {
//             document.getElementsByClassName("display")[0].innerText += value;
//           } else {
//             document.getElementsByClassName("display")[0].innerText = value;
//           }
//         } else {
//           if (display.includes(".") & (value == ".")) {
//             alert("you already typed a decimal");
//           } else {
//             document.getElementsByClassName("display")[0].innerText += value;
//           }
//         }
//       } else {
//         alert(
//           "Uops! your number is too big! It should be less than 7 characters long (including a dot)"
//         );
//       }
//     }
//   };

// // devide by 0
// // 6 + = 6+6
// // multiple operators

// done
// // multiple dots
// // chain operators
// // use query selector
// // multiple 0s



// // Hi, Branko

// // Due to personal inconveniences, I couldn't have the assignment ready for last saturday's session so I finished it and made sure it meets the requirements checked during the session, like the chaining, not dividing by 0 and duplicating a number when the equal sign is clicked without a second number.

// // Heini-Maria to Everyone (6:29)
// // https://github.com/Heini-Maria/Javascript-Calculator.git
// // Zach to Everyone (6:34)
// // https://github.com/ZachLee12/Simple-Calculator

// // https://github.com/SnuggleTrouble/brainnest-2nd-javascript-project
// // https://github.com/JayRenji/Basic-Calculator/blob/main/script.js
