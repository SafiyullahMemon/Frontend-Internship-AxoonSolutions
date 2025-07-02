// Simple grade calculator using if/else
let marks = 78;
let grade;

if (marks >= 90) {
  grade = 'A';
} else if (marks >= 75) {
  grade = 'B';
} else if (marks >= 60) {
  grade = 'C';
} else {
  grade = 'F';
}

console.log("Grade:", grade);
