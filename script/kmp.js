function computeFail(pattern){
  const fail = []
  fail[0] = 0;
  let m = pattern.length;
  let j = 0;
  let i = 1;
  while (i < m) {
      if (pattern.charAt(j) == pattern.charAt(i)) { // j+1 chars match
          fail[i] = j + 1;
          i++;
          j++;
      } else if (j > 0) // j follows matching prefix
          j = fail[j - 1];
      else { // no match
          fail[i] = 0;
          i++;
      }
  }
  return fail;
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