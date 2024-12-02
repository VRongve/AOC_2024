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
  let newArr = data.map(Number);
  let copyNewArr = [...newArr].reverse();
  let listArr = [newArr, copyNewArr];
  let result = [];
  let validNumbers = [1, 2, 3];
  let indexValue = [];
  listArr.forEach((element) => {
    let tempResult = [];
    for (let i = 0; i < element.length - 1; i++) {
      // Check if the abs value is a allowed value
      let absValue = Math.abs(element[i] - element[i + 1]);
      if (element[i] > element[i + 1] && validNumbers.includes(absValue)) {
        tempResult.push(0);
      } else {
        tempResult.push(1);
        if (indexValue.length > 0) {
        } else {
          element.splice[(indexValue, 1)];
        }
        break;
      }
    }
    if (tempResult.includes(1)) {
      result.push(false);
    } else {
      if (tempResult.length > 0) {
        result.push(true);
      }
    }
  });

  if (result.includes(true)) {
    return { isSafe: true, updatedArr: newArr };
  } else {
    newArr.splice(indexValue[0], 1);
    return { isSafe: false, updatedArr: newArr.splice(indexValue, 1) };
  }
}

async function isSafe(array) {
  let newArr = array.map(Number);
  let copyNewArr = [...newArr].reverse();
  let listArr = [newArr, copyNewArr];
  let result = [];
  let validNumbers = [1, 2, 3];
  listArr.forEach((element) => {
    let tempResult = [];
    for (let i = 0; i < element.length - 1; i++) {
      if (element[i] > element[i + 1]) {
        // Check if the abs value is a allowed value
        let absValue = Math.abs(element[i] - element[i + 1]);
        if (validNumbers.includes(absValue)) {
          tempResult.push(0);
        } else {
          tempResult.push(1);
        }
      } else if (element[i] === element[i + 1]) {
        tempResult.push(1);
      } else {
        tempResult.push(1);
      }
    }
    if (tempResult.includes(1)) {
      result.push(false);
    } else {
      if (tempResult.length > 0) {
        result.push(true);
      }
    }
  });

  if (result.includes(true)) {
    return true;
  } else {
    return false;
  }
}

async function main() {
  let data = await readFileInput();
  let newData = [];
  let countOriginal = 0;
  let countUpdated = 0;
  data.forEach((row) => {
    let result = isIncreasingOrDecreasing(row);
    newData.push(result.updatedArr);
    if (result.isSafe) {
      countOriginal += 1;
    }
  });

  for (const row of newData) {
    let result = await isSafe(row); // Wait for each call to complete
    if (result) {
      countUpdated += 1;
    }
  }
  console.log("Sum original: " + countOriginal);
  console.log("Sum updated: " + countUpdated);
}

main();
