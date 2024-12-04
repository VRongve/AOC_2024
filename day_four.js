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

function processXmasRows(row1, row2, row3, row4) {
  let sumRowsCount = 0;
  let horizontalCount = processHorizontalCount(row1, row2, row3, row4);
  let verticalCount = processVerticalCount(row1, row2, row3, row4);
  let diagonalCount = processDiagonalCount(row1, row2, row3, row4);

  sumRowsCount += horizontalCount + verticalCount + diagonalCount;

  return sumRowsCount;
}

function processHorizontalCount(row1, row2, row3, row4) {
  let count = 0;
  let listRows = [row1, row2, row3, row4];
  listRows.forEach((row) => {
    // Loop through string and count occurences
    for (let i = 0; i < row.length - 3; i++) {
      let stringResult = row[i] + row[i + 1] + row[i + 2] + row[i + 3];
      console.log(stringResult);
      if (stringResult === "XMAS" || stringResult === "SAMX") {
        count += 1;
      }
    }
  });
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
    let stringResult = row1[i] + row2[i + 1] + row3[i + 2] + row4[i + 3];
    if (stringResult === "XMAS" || stringResult === "SAMX") {
      count += 1;
    }
  }
  return count;
}

async function main() {
  let data = await readFileInput();

  let countXmasTimes = 0;

  for (let i = 0; i < data.length - 4; i++) {
    // Process 4 rows at the time
    let row1 = data[i];
    let row2 = data[i + 1];
    let row3 = data[i + 2];
    let row4 = data[i + 3];

    let count = processXmasRows(row1, row2, row3, row4);

    countXmasTimes += count;
  }

  console.log("Count Xmas Occurences: " + countXmasTimes);
}

main();
