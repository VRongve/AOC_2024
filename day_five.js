const fs = require("fs").promises;

async function readFileInput() {
  const part1 = [];
  const part2 = [];

  // Read the file
  const data = await fs.readFile(
    "C:/Github/AOC_2024/day_five_input.txt",
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

function generatePairs(array) {
  result = array.flatMap((v, i) => array.slice(i + 1).map((w) => [v, w]));
  return result;
}

function processUpdate(update, orders) {
  let result = false;
  let listAllPairs = generatePairs(update);

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

function checkOrder(pairs, orders) {
  let result = true;

  for (let i = 0; i < pairs.length; i++) {
    let isParInOrderList = checkIfParIsInOrderList(pairs[i], orders);
    if (!isParInOrderList) {
      result = false;
      break;
    }
  }
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

function processIncorrectlyUpdates(update, orders) {
  let updateListStatus = false;
  let result = {};
  while (updateListStatus === false) {
    for (let i = 0; i < update.length - 1; i++) {
      let pair = [update[i], update[i + 1]];
      let pairInOrderList = checkIfParIsInOrderList(pair, orders);
      if (pairInOrderList) {
      } else {
        let val1 = update[i];
        let val2 = update[i + 1];
        update[i] = val2;
        update[i + 1] = val1;
      }
    }

    // check if order is okay
    result = processUpdate(update, orders);
    if (result.result === true) {
      updateListStatus = true;
    }
  }

  return result;
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
      // Fix the updates which are not in order
      let resultFixedUpdates = processIncorrectlyUpdates(update, orders);
      if (resultFixedUpdates.result) {
        sumMiddleNumberFixedUpdates += resultFixedUpdates.middleNumber;
      }
    }
  });

  // Part 1:
  console.log("Sum: " + sumMiddleNumber);

  // Part 2:
  console.log("Sum Part 2: " + sumMiddleNumberFixedUpdates);
}

main();
