import React from "react";
import similarity from "./similarity";

function bm(diseaseList, dnaTest, nama_penyakit) {
  // returning test result, disease name
  // TODO : add similarity
  for (let i = 0; i < diseaseList.length; i++) {
    // const disease = diseaseList[i];
    // const pattern = disease.dna;
    // const diseaseName = disease.nama;
    if (diseaseList[i].nama === nama_penyakit) {
      const pattern = diseaseList[i].dna;
      const diseaseName = diseaseList[i].nama;
      const result = bmStringMatching(dnaTest, pattern);
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

function bmStringMatching(text, pattern) {
  let arr = charLastOcc(pattern);
  let n = text.length;
  let m = pattern.length;
  let i = m - 1;
  if (i > n - 1) {
    return -1;
  }
  let j = m - 1;
  do {
    // use do-while so the check done atleast once
    if (pattern.charAt(j) === text.charAt(i)) {
      if (j === 0) {
        return i;
      } else {
        j--;
        i--;
      }
    } else {
      let char = arr[text.charCodeAt(i)];
      i = i + m - Math.min(j, 1 + char);
      j = m - 1;
    }
  } while (i <= n - 1);
  return -1;
}

function charLastOcc(pattern) {
  // find and store the last appearance of each char on the pattern in an array based on ASCII
  const arr = [];
  for (let i = 0; i < 256; i++) arr[i] = -1; // initialize the array based on ASCII
  for (let i = 0; i < pattern.length; i++) arr[pattern.charCodeAt(i)] = i; // store the last appearance of each char on the pattern
  return arr;
}

let pos = bmStringMatching("nama s ayayoseph", "aya");
console.log(pos);

export default bm;
