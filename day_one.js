const fs = require("fs").promises; // Use the promises API

async function readFileInput() {
  try {
    const data = await fs.readFile(
      "C:/Github/AOC_2024/day_one_input.txt",
      "utf8"
    );
    let dataList = data.split("\n");
    return dataList;
  } catch (err) {
    console.error("Error reading the file:", err);
  }
}

async function calculateDistance() {
  let data = await readFileInput();

  let list1 = [];
  let list2 = [];

  data.forEach((element) => {
    let split = element.split(" ");
    parseInt(list1.push(split[0]));
    parseInt(list2.push(split[3]));
  });

  // sort list1 from smaller to larger
  list1.sort((a, b) => a - b);

  // sort list2 from larger to smaller
  list2.sort((a, b) => a - b);

  let distance = 0;
  for (let i = 0; i < list1.length; i++) {
    distance += Math.abs(list1[i] - list2[i]);
  }

  console.log("Distance: " + distance);
}

async function calculateSimliarity() {
  let data = await readFileInput();

  let list1 = [];
  let list2 = [];

  data.forEach((element) => {
    let split = element.split(" ");
    list1.push(parseInt(split[0].trim()));
    list2.push(parseInt(split[3].trim()));
  });

  let similarityScores = [];
  let similarityScore = 0;

  for (let i = 0; i < list1.length; i++) {
    // Check how many times the number in list1 appears in list2
    let count = 0;
    for (let j = 0; j < list2.length; j++) {
      if (list1[i] === list2[j]) {
        count += 1;
      }
    }
    similarityScore += list1[i] * count;
  }

  console.log("Similarity score: " + similarityScore);
}

calculateDistance();

calculateSimliarity();
