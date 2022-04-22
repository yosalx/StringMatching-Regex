import React from "react";

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
