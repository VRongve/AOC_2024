const fs = require("fs").promises; // Use the promises API

async function readFileInput() {
  try {
    const data = await fs.readFile(
      "C:/Github/AOC_2024/day_three_input.txt",
      "utf8"
    );
    let dataList = data.split("\n");
    return dataList;
  } catch (err) {
    console.error("Error reading the file:", err);
  }
}

function findMatches(input) {
  let regexPattern = /mul\(\d+,\d+\)/g;
  let result = input.match(regexPattern);
  return result;
}

function calculateMul(arr) {
  let total = 0;
  arr.forEach((element) => {
    let values = element.match(/\d+/g);
    let mulValue = values[0] * values[1];
    total += mulValue;
  });
  return total;
}

function getSubsetData(input, regexPattern) {
  let listOfSubset = input.match(regexPattern);
  return listOfSubset;
}

function calculateSubsetData(data) {
  let total = 0;
  data.forEach((inputString) => {
    let arrayOfMul = findMatches(inputString);
    total += calculateMul(arrayOfMul);
  });
  return total;
}

async function main() {
  let data = await readFileInput();
  let newString = data.join("");
  let updatedString = "do()" + newString + "don't()";

  // Part 1

  // find matches
  let arrayOfMul = findMatches(updatedString);

  // calculate total
  let sumPart1 = calculateMul(arrayOfMul);

  console.log("Sum part1: " + sumPart1);

  // Part 2
  // calculate mul of second subset data
  let regexPattern = /do\(\)(.*?)don\'t\(\)/gs;
  let secondSubsetStrings = getSubsetData(updatedString, regexPattern);
  let sumSecondSubsetData = calculateSubsetData(secondSubsetStrings);

  let sumPart2 = sumSecondSubsetData;
  console.log("Sum part 2: " + sumPart2);
}

main();
