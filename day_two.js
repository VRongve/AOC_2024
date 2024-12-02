const { unsubscribe } = require("diagnostics_channel");
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
    let value = checkIfArraySafe(listArrys[i]);
    if (value === true) {
      result = true;
      break;
    }
  }

  return result;
}

function isIncreasingOrDecreasingPart2(array) {
  let result = false;
  let reversArr = [...array].reverse();
  let listArrys = [array, reversArr];
  for (let i = 0; i < listArrys.length; i++) {
    let value = checkIfArraySafe(listArrys[i]);
    if (value === true) {
      result = true;
      break;
    }
  }

  return result;
}

function checkIfArraySafe(array) {
  let result = true;
  let validNumbers = [1, 2, 3];
  for (let i = 0; i < array.length - 1; i++) {
    let absValue = Math.abs(array[i] - array[i + 1]);
    if (array[i] > array[i + 1] && validNumbers.includes(absValue)) {
    } else {
      result = false;
      break;
    }
  }
  return result;
}

async function main() {
  let data = await readFileInput();
  let newData = [];
  let countOriginalSafe = 0;
  let countUpdatedSafe = 0;
  let unSafeArrays = [];
  data.forEach((row) => {
    let result = isIncreasingOrDecreasing(row);
    if (result) {
      countOriginalSafe += 1;
    } else {
      unSafeArrays.push(row);
    }
  });
  console.log("Sum original safe rows: " + countOriginalSafe);

  // Part 2

  unSafeArrays.forEach((row) => {
    let data = row.split(" ");
    let Arr = data.map(Number);
    for (let i = 0; i < Arr.length - 1; i++) {
      let updatedArr = [...Arr];
      updatedArr.splice(i, 1);
      let result = isIncreasingOrDecreasingPart2(updatedArr);
      if (result) {
        countUpdatedSafe += 1;
        break;
      }
    }
  });

  console.log("Sum updated safe rows: " + countUpdatedSafe);

  console.log("Total Safe Rows: " + (countOriginalSafe + countUpdatedSafe));
}

main();
