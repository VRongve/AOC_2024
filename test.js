const fs = require("fs").promises;

async function readFileInput() {
  const data = await fs.readFile(
    "C:/Github/AOC_2024/day_seven_input_test.txt",
    "utf8"
  );

  let obj = {};
  data.split("\n").forEach((line) => {
    if (line.trim()) {
      const [key, values] = line.split(":");
      obj[key.trim()] = values.trim().split(" ").map(Number);
    }
  });

  console.log(obj);

  return obj;
}

// Function for multiplying values in list
function multValuesInList(key, values) {
  let array = [...values];
  while (array.length > 1) {
    let value = array[0] * array[1];
    array.splice(0, 2, value);
  }
  return parseInt(key) === array[0];
}

// Function for summing values in list
function sumValuesInList(key, values) {
  let array = [...values];
  while (array.length > 1) {
    let value = array[0] + array[1];
    array.splice(0, 2, value);
  }
  return parseInt(key) === array[0];
}

function checkComb(key, array) {
  const n = array.length - 1;
  const totalCombinations = 1 << n; // 2^n possible operator configurations

  for (let mask = 0; mask < totalCombinations; mask++) {
    let result = array[0];
    for (let i = 0; i < n; i++) {
      console.log("Bit: " + (1 << i));
      console.log("Mask and (1 << i): " + (mask & (1 << i) )
      if ((mask & (1 << i)) === 0) {
        result += array[i + 1]; // Add
      } else {
        result *= array[i + 1]; // Multiply
      }
    }
    if (result === parseInt(key)) {
      return true;
    }
  }

  return false;
}

function processData(key, values) {
  let resultSumList = sumValuesInList(key, values);
  let resultMultList = multValuesInList(key, values);

  if (resultMultList || resultSumList) {
    return parseInt(key);
  }

  if (checkComb(key, values)) {
    return parseInt(key);
  }

  if (checkComb(key, [...values].reverse())) {
    return parseInt(key);
  }

  return 0;
}

async function main() {
  let obj = await readFileInput();
  let sum = 0;

  Object.entries(obj).forEach(([key, values]) => {
    sum += processData(key, values);
  });

  console.log("Sum: " + sum);
}

main();
