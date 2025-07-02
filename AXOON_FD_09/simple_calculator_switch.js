// Simple calculator using switch statement
let operator = "+";
let num1 = 10;
let num2 = 5;
let result;

switch(operator) {
  case "+": result = num1 + num2; break;
  case "-": result = num1 - num2; break;
  case "*": result = num1 * num2; break;
  case "/": result = num1 / num2; break;
  default: result = "Invalid operator";
}

console.log("Result:", result);
