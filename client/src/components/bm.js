import React from "react";

function bm(diseaseList, dnaTest) {
  // returning test result, disease name
  // TODO : add similarity
  for (let i = 0; i < diseaseList.length; i++) {
    const disease = diseaseList[i];
    const pattern = disease.dna;
    const diseaseName = disease.nama;
    const result = bmMatch(dnaTest, pattern);
    if (result > -1) {
      return { bool: true, nama: diseaseName };
    }
    // log
    console.log(
      "checking " +
        dnaTest +
        " with " +
        pattern +
        " (" +
        diseaseName +
        ") " +
        "result -> " +
        result
    );
  }
}

function bmMatch(text, pattern) {
  let last = buildLast(pattern);
  let n = text.length;
  let m = pattern.length;
  let i = m - 1;
  if (i > n - 1) {
    return -1;
  }
  let j = m - 1;
  do {
    if (pattern.charAt(j) === text.charAt(i)) {
      if (j === 0) {
        return i;
      } else {
        i--;
        j--;
      }
    } else {
      let lo = last[text.charCodeAt(i)];
      i = i + m - Math.min(j, 1 + lo);
      j = m - 1;
    }
  } while (i <= n - 1);
  return -1;
}

function buildLast(pattern) {
  const last = [];
  for (let i = 0; i < 128; i++) last[i] = -1; // initialize array
  for (let i = 0; i < pattern.length; i++) last[pattern.charCodeAt(i)] = i;
  return last;
} // end of buildLast()

let pos = bmMatch("nama saya yoseph", "saya");
console.log(pos);

export default bm;
