import React from "react";
import similarity from "./similarity";

function kmpBorderFunction(pattern) {
  const arr = [];
  arr[0] = 0;
  let m = pattern.length;
  let j = 0;
  let i = 1;
  while (i < m) {
    if (pattern.charAt(j) === pattern.charAt(i)) {
      // if char at j is same as the next char
      j++;
      arr[i] = j;
      i++;
    } else if (j > 0) j = arr[j - 1];
    else {
      // no match
      arr[i] = 0;
      i++;
    }
  }
  return arr;
}

function kmp(diseaseList, dnaTest, nama_penyakit) {
  // returning test result, disease name
  // TODO : add similarity
  for (let i = 0; i < diseaseList.length; i++) {
    // const disease = diseaseList[i];
    // const pattern = disease.dna;
    // const diseaseName = disease.nama;
    if (diseaseList[i].nama === nama_penyakit) {
      const pattern = diseaseList[i].dna;
      const diseaseName = diseaseList[i].nama;
      const result = kmpStringMatching(dnaTest, pattern);
      if (result > -1) {
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
        return {
          bool: true,
          nama: diseaseName,
          similarity: similarity(dnaTest, pattern),
        };
      } else {
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
        let percentate = similarity(dnaTest, pattern);
        console.log("similarity " + percentate);
        if (percentate >= 80) {
          return { bool: true, nama: diseaseName, similarity: percentate };
        } else {
          return { bool: false, nama: diseaseName, similarity: percentate };
        }
      }
    }
  }
  return { bool: false, nama: "" };
}

function kmpStringMatching(text, pattern) {
  let n = text.length;
  let m = pattern.length;
  let arr = kmpBorderFunction(pattern);
  let i = 0;
  let j = 0;
  let temp = 0;
  // temp is not defined
  while (i < n) {
    if (pattern.charAt(j) === text.charAt(i)) {
      if (j === m - 1) {
        // if pattern is found
        temp = i - m + 1;
        return temp;
      }
      i++;
      j++;
    } else {
      // no match
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
