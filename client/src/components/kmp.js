import React from "react";

function kmpBorderFunction(pattern) {
  const arr = [];
  arr[0] = 0;
  let m = pattern.length;
  let j = 0;
  let i = 1;
  while (i < m) {
    if (pattern.charAt(j) === pattern.charAt(i)) { // if char at j is same as the next char
      j++;
      arr[i] = j;
      i++;
    } else if (j > 0)
      j = arr[j - 1];
    else { // no match
      arr[i] = 0;
      i++;
    }
  }
  return arr;
}

function kmp(diseaseList, dnaTest) {
  // returning test result, disease name
  // TODO : add similarity
  for (let i = 0; i < diseaseList.length; i++) {
    const disease = diseaseList[i];
    const pattern = disease.dna;
    const diseaseName = disease.nama;
    const result = kmpStringMatching(dnaTest, pattern);
    if (result > -1) {
      return { bool: true, nama: diseaseName };
    }
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

function kmpStringMatching(text, pattern) {
  let n = text.length;
  let m = pattern.length;
  let arr = kmpBorderFunction(pattern);
  let i = 0;
  let j = 0;
  while (i < n) {
    if (pattern.charAt(j) === text.charAt(i)) {
      if (j === m - 1) { // if pattern is found
        temp = i - m + 1;
        return temp;
      }
      i++;
      j++;
    } else { // no match
      if (j > 0) {
        j = arr[j - 1];
      } else {
        i++;
      }
    }
  }
  return -1; // no match at all
}

let pos = kmpStringMatching("namas sa yasyoseph", "yasy");
console.log(pos);

export default kmp;
