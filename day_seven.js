const fs = require("fs").promises;
async function readFileInput() {
  // Read the file
  const data = await fs.readFile(
    "C:/Github/AOC_2024/day_seven_input_test.txt",
    "utf8"
  );

  // Split the file into lines and build the object
  let obj = {};
  data.split("\n").forEach((line) => {
    if (line.trim()) {
      // Ignore empty lines
      const [key, values] = line.split(":");
      obj[key.trim()] = values.trim().split(" ").map(Number);
    }
  });
  return obj;
}

// Function for multiplying values in list
function multValuesInList(key, values) {
  let match = false;
  array = [...values];
  let value = 0;
  while (array.length > 1) {
    value = array[0] * array[1];
    array.splice(0, 2, value);
  }
  if (parseInt(key) === array[0]) {
    match = true;
  }
  return match;
}

// Function for summing values in list
function sumValuesInList(key, values) {
  let match = false;
  array = [...values];
  let value = 0;
  while (array.length > 1) {
    value = array[0] + array[1];
    array.splice(0, 2, value);
  }
  if (parseInt(key) === array[0]) {
    match = true;
  }
  return match;
}

function checkComb(key, array) {
  // Helper function to evaluate the expression recursively
  function evaluate(index, currentResult) {
    if (index === array.length) {
      // Base case: If we've processed all elements, check if the result matches the target
      return currentResult === parseInt(key);
    }

    // Evaluate the next element with both '+' and '*' operators
    let addResult = evaluate(index + 1, currentResult + array[index]);
    let multResult = evaluate(index + 1, currentResult * array[index]);

    // If either result is true, return true
    return addResult || multResult;
  }

  // Start the recursion from the first element with the first number in the array
  return evaluate(1, array[0]);
}

function processData(key, values) {
  let array = [...values];
  let reversedArray = [...values];
  reversedArray.reverse();
  let resultOriginalArray = false;
  let resultReverseArray = false;

  // Check sum list
  let resultSumList = sumValuesInList(key, values);
  let resultMultList = multValuesInList(key, values);

  // If result Sum or Result Mult is true then skip the below script

  if (resultMultList || resultSumList) {
    return parseInt(key); // return data
  }

  // check first original array
  resultOriginalArray = checkComb(key, array);

  if (resultOriginalArray === false) {
    // check reversed array
    resultReverseArray = checkComb(key, reversedArray);
  }

  if (resultOriginalArray === true || resultReverseArray === true) {
    return parseInt(key);
  } else {
    return 0;
  }
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
