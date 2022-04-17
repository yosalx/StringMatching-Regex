function similarity(text, pattern) { //using hamming distance
    let j = 0;
    let smallest_distance = 999;
    while (j<=text.length-pattern.length) {
        var count = 0;
        for (var i = 0; i < pattern.length; i++) {
            if (pattern.charAt(i) != text.charAt(j+i)) {
                count++;
            }
        }
        if (count < smallest_distance) {
            smallest_distance = count;
        }
        j++;
    }
    return((pattern.length - smallest_distance)/pattern.length)*100;
}

let test = similarity("abcghfabcdhiabcdeg", "abcdef");
console.log(test);