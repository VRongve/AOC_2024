const fs = require("fs").promises; // Use the promises API

async function readFileInput() {
  try {
    const data = await fs.readFile(
      "C:/Github/AOC_2024/day_five_input_test.txt",
      "utf8"
    );
    let dataList = data
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "");

    console.log(dataList);

    const part1 = [];
    const part2 = [];

    lines.forEach((line) => {
      if (line.includes("|")) {
        const pair = line.split("|").map(Number);
        part1.push(pair);
      } else {
        const numbers = line.split(",").map(Number);
        part2.push(numbers);
      }
    });
    return dataList;
  } catch (err) {
    console.error("Error reading the file:", err);
  }
}

async function main() {
  const data = await readFileInput();
}

main();
