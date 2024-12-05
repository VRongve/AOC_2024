const fs = require("fs").promises;

async function readFileInput() {
  const part1 = [];
  const part2 = [];

  // Read the file
  const data = await fs.readFile(
    "C:/Github/AOC_2024/day_five_input_test.txt",
    "utf8"
  );

  const lines = data
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "");

  // Process first part (rows with '|')

  lines.forEach((line) => {
    if (line.includes("|")) {
      const pair = line.split("|").map(Number);
      part1.push(pair);
    } else {
      const numbers = line.split(",").map(Number);
      part2.push(numbers);
    }
  });

  return { part1: part1, part2: part2 };
}

function processUpdate(update, orders) {
  let result = false;
  let listAllPairs = [];
  for (let i = 0; i < update.length - 1; i++) {
    let arrayOfPairs = [];
    for (let j = i + 1; j < update.length; j++) {
      arrayOfPairs.push([update[i], update[j]]);
    }
    listAllPairs.push(arrayOfPairs);
  }

  let orderResult = checkOrder(listAllPairs, orders);

  let middleNumber = 0;
  if (orderResult) {
    // get the middle number from the update
    let middleIndex = Math.floor(update.length / 2);
    middleNumber = update[middleIndex];
    result = orderResult;
  }

  return { result: result, middleNumber: middleNumber };
}

function checkOrder(listAllPairs, orders) {
  let result = true;

  listAllPairs.forEach((listOfPair) => {
    for (let i = 0; i < listOfPair.length; i++) {
      let isParInOrderList = checkIfParIsInOrderList(listOfPair[i], orders);
      if (!isParInOrderList) {
        result = false;
        break;
      }
    }
  });

  return result;
}

function checkIfParIsInOrderList(pair, orders) {
  for (let i = 0; i < orders.length; i++) {
    let isPairInOrderList = JSON.stringify(pair) === JSON.stringify(orders[i]);
    if (isPairInOrderList) {
      return true;
    }
  }
  return false;
}

function processIncorrectlyUpdates(update) {
  update.sort((a, b) => b - a);
  return update[Math.floor(update.length / 2)];
}

async function main() {
  const data = await readFileInput();

  const orders = data.part1;
  const updates = data.part2;

  let sumMiddleNumber = 0;
  let sumMiddleNumberFixedUpdates = 0;

  updates.forEach((update) => {
    // Check each update for its order
    let result = processUpdate(update, orders);
    if (result.result) {
      sumMiddleNumber += result.middleNumber;
    } else {
      let resultFixedUpdates = processIncorrectlyUpdates(update);
      sumMiddleNumberFixedUpdates += resultFixedUpdates;
    }
  });

  // Part 1:
  console.log("Sum: " + sumMiddleNumber);

  // Part 2:
  console.log("Sum Part 2: " + sumMiddleNumberFixedUpdates);
}

main();
