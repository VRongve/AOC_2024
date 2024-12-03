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

  // Part 1

  // find matches
  let arrayOfMul = findMatches(newString);

  // calculate total
  let sumPart1 = calculateMul(arrayOfMul);

  console.log("Sum part1: " + sumPart1);

  // Part 2

  // calculate mul of first subset data
  let regexPattern1 = /^(.*?)don't\(\)/g;
  let firstSubsetString = getSubsetData(newString, regexPattern1);
  let sumFirstSubsetData = calculateSubsetData(firstSubsetString);
  // calculate mul of second subset data
  let regexPattern2 = /do\(\)(.*?)don't\(\)/g;
  let secondSubsetStrings = getSubsetData(newString, regexPattern2);
  let sumSecondSubsetData = calculateSubsetData(secondSubsetStrings);

  let sumPart2 = sumFirstSubsetData + sumSecondSubsetData;
  console.log("Sum part 2: " + sumPart2);
}

main();
