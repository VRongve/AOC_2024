let row = "MMMSXXMASM\r";

let count = 0;

let row1 = "XMASS";
let row2 = "MMSSS";
let row3 = "AAASS";
let row4 = "SASSS";

// Loop through string and count occurences
for (let i = 0; i < row.length - 3; i++) {
  let stringResult = row[i] + row[i + 1] + row[i + 2] + row[i + 3];
  if (stringResult === "XMAS" || stringResult === "SAMX") {
    count += 1;
  }
}

console.log("Count Hori: " + count);

function processVerticalCount(row1, row2, row3, row4) {
  let count = 0;
  for (let i = 0; i < row1.length; i++) {
    let stringResult = row1[i] + row2[i] + row3[i] + row4[i];
    if (stringResult === "XMAS" || stringResult === "SAMX") {
      count += 1;
    }
  }
  return count;
}

console.log("Vertcal Count: " + processVerticalCount(row1, row2, row3, row4));

function processDiagonalCount(row1, row2, row3, row4) {
  let count = 0;
  // Loop through string and count occurences
  for (let i = 0; i < row.length - 3; i++) {
    let stringResult = row1[i] + row2[i + 1] + row3[i + 2] + row4[i + 3];
    if (stringResult === "XMAS" || stringResult === "SAMX") {
      count += 1;
    }
  }
  return count;
}

console.log(
  "Horizontal Count: " + processDiagonalCount(row1, row2, row3, row4)
);
