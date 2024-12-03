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

function isSafeRow(array) {
  let reversArr = [...array].reverse();
  let listArrys = [array, reversArr];
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

function checkIfArraySafe(array) {
  let result = true;
  let validNumbers = [1, 2, 3];
  for (let i = 0; i < array.length - 1; i++) {
    let absValue = Math.abs(array[i] - array[i + 1]);
    let test1 = array[i] > array[i + 1];
    let test2 = validNumbers.includes(absValue);
    if (test1 === true && test2 === true) {
    } else {
      result = false;
      break;
    }
  }
  return result;
}

async function main() {
  let data = await readFileInput();
  let countOriginalSafe = 0;
  let countUpdatedSafe = 0;
  let unSafeArrays = [];
  data.forEach((row) => {
    let data = row.split(" ");
    let Arr = data.map(Number);
    let result = isSafeRow(Arr);
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
    let Arr = data.map((item) => Number(item));
    for (let i = 0; i < Arr.length; i++) {
      let modifiedArray = Arr.filter((item, index) => index !== i);
      let result = isSafeRow(modifiedArray);
      if (result) {
        countUpdatedSafe += 1;
        break;
      }
    }
  });

  console.log("Sum updated safe rows: " + countUpdatedSafe);

  let totalSafeRows = countOriginalSafe + countUpdatedSafe;

  console.log("Sum total safe rows: " + totalSafeRows);
}

main();
