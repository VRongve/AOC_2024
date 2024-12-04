const fs = require("fs").promises; // Use the promises API

async function readFileInput() {
  try {
    const data = await fs.readFile(
      "C:/Github/AOC_2024/day_four_input_test.txt",
      "utf8"
    );
    let dataList = data.split("\n");
    return dataList;
  } catch (err) {
    console.error("Error reading the file:", err);
  }
}

function processHorizontalCount(row) {
  let count = 0;
  // Loop through string and count occurences
  for (let i = 0; i < row.length - 3; i++) {
    let stringResult = row[i] + row[i + 1] + row[i + 2] + row[i + 3];
    let stringResultReverse = row[i + 3] + row[i + 2] + row[i + 1] + row[i];
    if (stringResult === "XMAS" || stringResultReverse === "XMAS") {
      count += 1;
    }
  }

  return count;
}

function processVerticalCount(row1, row2, row3, row4) {
  let count = 0;
  for (let i = 0; i < row1.length; i++) {
    let stringResult = row1[i] + row2[i] + row3[i] + row4[i];
    if (stringResult === "XMAS" || stringResult === "SAMX") {
      count += 1;
    }
  }

  return count;
}

function processDiagonalCount(row1, row2, row3, row4) {
  let count = 0;
  // Loop through string and count occurences
  for (let i = 0; i < row1.length - 3; i++) {
    let stringResultDiagonal1 =
      row1[i] + row2[i + 1] + row3[i + 2] + row4[i + 3];
    let stringResultDiagonal1Reverse =
      row4[i + 3] + row3[i + 2] + row2[i + 1] + row1[i];
    let stringResultDiagonal2 =
      row1[i + 3] + row2[i + 2] + row3[i + 1] + row4[i];
    let stringResultDiagonal2Reverse =
      row4[i] + row3[i + 1] + row2[i + 2] + row1[i + 3];

    // check first diagonal
    if (
      stringResultDiagonal1 === "XMAS" ||
      stringResultDiagonal1Reverse === "XMAS"
    ) {
      count += 1;
    }

    // check second diagonal

    if (
      stringResultDiagonal2 === "XMAS" ||
      stringResultDiagonal2Reverse === "XMAS"
    ) {
      count += 1;
    }
  }
  return count;
}

async function main() {
  let data = await readFileInput();

  let countXmasTimes = 0;
  for (let i = 0; i < data.length; i++) {
    let horizontalCount = 0;
    let verticalCount = 0;
    let diagonalCount = 0;
    horizontalCount = processHorizontalCount(data[i]);
    console.log("Horizontal count: " + horizontalCount);
    if (i >= data.length - 3) {
      // Skip
    } else {
      verticalCount = processVerticalCount(
        data[i],
        data[i + 1],
        data[i + 2],
        data[i + 3]
      );
      console.log("Vertical Count: " + verticalCount);
      diagonalCount = processDiagonalCount(
        data[i],
        data[i + 1],
        data[i + 2],
        data[i + 3]
      );
      console.log("Diagonal count: " + diagonalCount);
    }
    countXmasTimes += horizontalCount + verticalCount + diagonalCount;
  }

  console.log("Count Xmas Occurences: " + countXmasTimes);
}

main();
