const { reverse } = require("dns");

const fs = require("fs").promises; // Use the promises API

async function readFileInput() {
  try {
    const data = await fs.readFile(
      "C:/Github/AOC_2024/day_two_input.txt",
      "utf8"
    );
    let dataList = data.split("\n");
    return dataList;
  } catch (err) {
    console.error("Error reading the file:", err);
  }
}

function isIncreasingOrDecreasing(array) {
  let data = array.split(" ");
  let Arr = data.map(Number);
  let reversArr = [...Arr].reverse();
  let listArrys = [Arr, reversArr];
  let result = false;
  for (let i = 0; i < listArrys.length; i++) {
    let value = checkArray(listArrys[i]);
    if (value === true) {
      result = true;
      break;
    }
  }
  return result;
}

function checkArray(array) {
  let result = true;
  let validNumbers = [1, 2, 3];
  for (let i = 0; i < array.length - 1; i++) {
    let absValue = Math.abs(array[i] - array[i + 1]);
    if (array[i] > array[i + 1] && validNumbers.includes(absValue)) {
    } else {
      result = false;
    }
  }
  return result;
}

async function main() {
  let data = await readFileInput();
  let newData = [];
  let countOriginal = 0;
  let countUpdated = 0;
  data.forEach((row) => {
    let result = isIncreasingOrDecreasing(row);
    if (result) {
      countOriginal += 1;
    }
  });
  console.log("Sum original: " + countOriginal);
  console.log("Sum updated: " + countUpdated);
}

main();
