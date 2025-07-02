// Function to return the factorial of a number
function factorial(n) {
  if (n < 0) return "Invalid input";
  let fact = 1;
  for (let i = 1; i <= n; i++) {
    fact *= i;
  }
  return fact;
}

console.log(factorial(5));
