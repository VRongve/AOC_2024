const fs = require("fs").promises;

async function readFileInput(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf8");

    const lines = data
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const part1 = [];
    const part2 = [];

    lines.forEach((line) => {
      if (line.includes("|")) {
        part1.push(line.split("|").map(Number));
      } else {
        part2.push(line.split(",").map(Number));
      }
    });

    return { part1, part2 };
  } catch (error) {
    console.error("Error reading file:", error);
    throw error;
  }
}

function generatePairs(array) {
  result = array.flatMap((v, i) => array.slice(i + 1).map((w) => [v, w]));
  console.log(result);
  return result;
}

function checkOrder(pairs, ordersSet) {
  return pairs.every(([a, b]) => ordersSet.has(`${a},${b}`));
}

function processUpdate(update, ordersSet) {
  const pairs = generatePairs(update);
  const isOrdered = checkOrder(pairs, ordersSet);

  return {
    result: isOrdered,
    middleNumber: isOrdered ? update[Math.floor(update.length / 2)] : 0,
  };
}

function processIncorrectUpdates(update, ordersSet) {
  let result = null;

  while (true) {
    let changed = false;

    for (let i = 0; i < update.length - 1; i++) {
      if (!ordersSet.has(`${update[i]},${update[i + 1]}`)) {
        [update[i], update[i + 1]] = [update[i + 1], update[i]];
        changed = true;
      }
    }

    result = processUpdate(update, ordersSet);

    if (result.result || !changed) break;
  }

  return result;
}

async function main() {
  try {
    const filePath = "C:/Github/AOC_2024/day_five_input_test.txt";
    const { part1: orders, part2: updates } = await readFileInput(filePath);

    const ordersSet = new Set(orders.map(([a, b]) => `${a},${b}`));

    let sumMiddleNumber = 0;
    let sumMiddleNumberFixedUpdates = 0;

    updates.forEach((update) => {
      const result = processUpdate([...update], ordersSet);
      if (result.result) {
        sumMiddleNumber += result.middleNumber;
      } else {
        const fixedResult = processIncorrectUpdates([...update], ordersSet);
        sumMiddleNumberFixedUpdates += fixedResult.middleNumber;
      }
    });

    console.log("Sum Part 1:", sumMiddleNumber);
    console.log("Sum Part 2:", sumMiddleNumberFixedUpdates);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
