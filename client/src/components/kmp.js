import React from "react";

function computeFail(pattern) {
  const fail = [];
  fail[0] = 0;
  let m = pattern.length;
  let j = 0;
  let i = 1;
  while (i < m) {
    if (pattern.charAt(j) === pattern.charAt(i)) {
      // j+1 chars match
      fail[i] = j + 1;
      i++;
      j++;
    } else if (j > 0)
      // j follows matching prefix
      j = fail[j - 1];
    else {
      // no match
      fail[i] = 0;
      i++;
    }
  }
  return fail;
}

function kmp(diseaseList, dnaTest) {
  // returning test result, disease name
  // TODO : add similarity
  for (let i = 0; i < diseaseList.length; i++) {
    const disease = diseaseList[i];
    const pattern = disease.dna;
    const diseaseName = disease.nama;
    const result = kmpMatch(dnaTest, pattern);
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

function kmpMatch(text, pattern) {
  let n = text.length;
  let m = pattern.length;
  let fail = computeFail(pattern);
  let i = 0;
  let j = 0;
  while (i < n) {
    if (pattern.charAt(j) === text.charAt(i)) {
      if (j === m - 1) {
        return i - m + 1;
      }
      i++;
      j++;
    } else {
      if (j > 0) {
        j = fail[j - 1];
      } else {
        i++;
      }
    }
  }
  return -1;
}

let pos = kmpMatch("namassayasyoseph", "saya");
console.log(pos);

export default kmp;
