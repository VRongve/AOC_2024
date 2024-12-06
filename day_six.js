const { readFile } = require("fs");

const fs = require("fs").promises; // Use the promises API

async function readFileInput() {
  try {
    const data = await fs.readFile(
      "C:/Github/AOC_2024/day_six_input.txt",
      "utf8"
    );
    let dataList = data.split("\n").map((row) => row.replace(/\r/gs, ""));
    return dataList;
  } catch (err) {
    console.error("Error reading the file:", err);
  }
}

function findGuardPositionAndDirection(map) {
  let guardIndex = -1;
  let guardRow = -1;
  let guardDir = -1;
  for (let i = 0; i < map.length; i++) {
    let indexOfUp = map[i].indexOf("^");
    let indexOfDown = map[i].indexOf("v");
    let indexOfLeft = map[i].indexOf("<");
    let indexOfRight = map[i].indexOf(">");
    if (indexOfUp > -1) {
      guardDir = 0;
      guardRow = i;
      guardIndex = indexOfUp;
      break;
    } else if (indexOfDown > -1) {
      guardDir = 2;
      guardRow = i;
      guardIndex = indexOfDown;
      break;
    } else if (indexOfRight > -1) {
      guardDir = 1;
      guardRow = i;
      guardIndex = indexOfRight;
      break;
    } else if (indexOfLeft > -1) {
      guardDir = 3;
      guardRow = i;
      guardIndex = indexOfLeft;
      break;
    } else {
      // Check next row
    }
  }
  // row, index, direction
  return [guardRow, guardIndex, guardDir];
}

function changeGuardDirection(direction) {
  let guardDirections = ["^", ">", "v", "<"];

  if (direction === 3) {
    return guardDirections[0];
  } else {
    return guardDirections[direction + 1];
  }
}

function moveGuard(guardRow, guardIndex, guardDir, map) {
  let flag = true;
  try {
    if (guardDir === 0) {
      // move upwards
      if (map[guardRow - 1][guardIndex] === "#") {
        // Switch direction
        map[guardRow][guardIndex] = changeGuardDirection(guardDir);
      } else {
        // Set X where guard have been
        map[guardRow][guardIndex] = "X";
        map[guardRow - 1][guardIndex] = "^";
      }
    } else if (guardDir === 2) {
      // move downwards
      if (map[guardRow + 1][guardIndex] === "#") {
        // Switch direction
        map[guardRow][guardIndex] = changeGuardDirection(guardDir);
      } else {
        // Set X where guard have been
        map[guardRow][guardIndex] = "X";
        map[guardRow + 1][guardIndex] = "v";
      }
    } else if (guardDir === 1) {
      // move left
      if (map[guardRow][guardIndex + 1] === "#") {
        // Switch direction
        map[guardRow][guardIndex] = changeGuardDirection(guardDir);
      } else {
        // Set X where guard have been
        map[guardRow][guardIndex] = "X";
        map[guardRow][guardIndex + 1] = ">";
      }
    } else {
      // move right
      if (map[guardRow][guardIndex - 1] === "#") {
        // Switch direction
        map[guardRow][guardIndex] = changeGuardDirection(guardDir);
      } else {
        // Set X where guard have been
        map[guardRow][guardIndex] = "X";
        map[guardRow][guardIndex - 1] = "<";
      }
    }
    return flag;
  } catch (error) {
    map[guardRow][guardIndex] = "X";
    flag = false;
    return flag;
  }
}

function processGuardMap(map) {
  let guardPos = findGuardPositionAndDirection(map);

  let flag = moveGuard(guardPos[0], guardPos[1], guardPos[2], map);

  return flag;
}

function sumNumX(map) {
  let mapString = map.map((row) => row.join("")).join("");
  let count = mapString.split("X").length - 1;
  return count;
}

async function main() {
  const data = await readFileInput();

  let map = [...data].map((row) => row.split(""));

  let processMap = true;
  while (processMap === true) {
    processMap = processGuardMap(map);
    //let output = map.map((row) => row.join("")).join("\n");
  }

  let numX = sumNumX(map);
  console.log("Num X: " + numX);
}

main();
