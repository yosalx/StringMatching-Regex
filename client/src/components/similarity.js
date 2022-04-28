import React from "react";
function similarity(text, pattern) {
  //using hamming distance
  let j = 0;
  let smallest_distance = 999;
  while (j <= text.length - pattern.length) {
    var count = 0;
    for (var i = 0; i < pattern.length; i++) {
      if (pattern.charAt(i) != text.charAt(j + i)) {
        count++;
      }
    }
    if (count < smallest_distance) {
      smallest_distance = count;
    }
    j++;
  }
  let result = Number.parseFloat(
    ((pattern.length - smallest_distance) / pattern.length) * 100
  ).toFixed(2);
  return result;
}

let test = similarity("abcghfabcdhiabcdeg", "abcdef");
console.log(test);

// for disease in diseases:
//     if similarity(disease, text) > 0.5:

export default similarity;
