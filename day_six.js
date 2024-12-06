const { readFile } = require("fs");

const fs = require("fs").promises; // Use the promises API

async function readFileInput() {
  try {
    const data = await fs.readFile(
      "C:/Github/AOC_2024/day_six_input_test.txt",
      "utf8"
    );
    let dataList = data.split("\n");
    return dataList;
  } catch (err) {
    console.error("Error reading the file:", err);
  }
}

function findGuardPositionAndDirection(map) {
  let indexPos = 0;
  let rowPos = 0;
  let direction = 0;
  let flag = true;
  for (let i = 0; i < map.length; i++) {
    if (flag) {
      for (let j = 0; j < map[i].length; j++) {
        console.log("Element: " + map[i][j]);
        let indexOfUp = map[i][j].indexOf("^");
        let indexOfDown = map[i][j].indexOf("v");
        let indexOfLeft = map[i][j].indexOf("<");
        let indexOfRight = map[i][j].indexOf(">");
        if (indexOfUp > -1) {
          direction = 0;
          rowPos = i;
          indexPos = indexOfUp;
          flag = false;
          break;
        } else if (indexOfDown > -1) {
          direction = 1;
          rowPos = i;
          indexPos = indexOfDown;
          flag = false;
          break;
        } else if (indexOfRight > -1) {
          direction = 2;
          rowPos = i;
          indexPos = indexOfRight;
          flag = false;
          break;
        } else if (indexOfLeft > -1) {
          direction = 3;
          rowPos = i;
          indexPos = indexOfLeft;
          flag = false;
          break;
        } else {
        }
      }
    } else {
      break;
    }
  }
  // row, index, direction
  return [rowPos, indexPos, direction];
}

function moveGuardPosition(guardPosition, map) {
  let rowPos = guardPosition[0];
  let indexPos = guardPosition[1];
  let direction = guardPosition[2];

  // Num loopings
  let numLoops = 0;

  let result = {};

  // if direction up
  if (direction === 0) {
    // number of rows available up
    numLoops = 0;
    result = moveGuard(map, numLoops, indexPos, rowPos, direction);
  } else if (direction === 1) {
    numLoops = map.length - rowPos + 1;
  } else if (direction === 2) {
    numLoops = indexPos;
  } else {
    numLoops = map[0].length - indexPos + 1;
  }
}

function changeGuardDirection(direction) {
  if (direction === 3) {
    return 0;
  } else {
    return direction + 1;
  }
}

function moveGuard(map, numLoops, indexPos, rowPos, direction) {
  let count = 0;
  for (let i = rowPos; i > numLoops; i--) {
    if (map[i - 1][0][indexPos] === "#") {
      let newDirection = changeGuardDirection(direction);
      map[i - 1][0][indexPos] = "X";
    } else {
      count += 1;
      map[i][0][indexPos] = "X";
      map[i - 1][0][indexPos] = "^";
      // Print the array in the desired format
      map.forEach((row) => console.log(row.join()));
      console.log(""); // Add a blank line between iterations if needed
    }
  }
  return { count: count, positions: positions };
}

async function main() {
  const data = await readFileInput();
  const processedData = data.map((x) => [x.split("")]);

  processedData.forEach((row) => console.log(row.join("")));
  console.log(" ");

  let map = [...processedData];

  let storeGuardPositions = [];

  let guardPosition = findGuardPositionAndDirection(map);
  let moveGuard = moveGuardPosition(guardPosition, map);

  console.log(guardPosition);
}

main();
