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

async function main() {
  const data = await readFileInput();

  const dataPart1 = data.part1;
  const dataPart2 = data.part2;

  console.log(dataPart1);
  console.log(dataPart2);
}

main();
