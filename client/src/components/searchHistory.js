import React from 'react';

function Search(pattern) {
  const reTanggal = new RegExp(
    /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/
  );
  // regex string penyakit
  const rePenyakit = new RegExp(/^[a-zA-Z0-9\s]*$/);

  // regex tanggal spasi penyakit
  const reTanggalPenyakit = new RegExp(
    /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d[- /.][a-zA-Z0-9\s]*$/
  );

  if (pattern.match(reTanggalPenyakit)) {
    return {
      type: "tanggalPenyakit",
      data: {
        tanggal: pattern.split(" ")[0],
        bulan: pattern.split(" ")[1],
        tahun: pattern.split(" ")[2],
        penyakit: pattern.split(" ")[3],
      },
    };
  } else if (pattern.match(reTanggal)) {
    return {
      type: "tanggal",
      data: {
        tanggal: pattern.split(" ")[0],
        bulan: pattern.split(" ")[1],
        tahun: pattern.split(" ")[2],
      },
    };
  } else if (pattern.match(rePenyakit)) {
    return {
      type: "penyakit",
      data: {
        penyakit: pattern,
      },
    };
  } else {
    return {
      type: "error",
      data: {
        error: "Format pencarian tidak valid",
      },
    };
  }
}

console.log(Search("01 01 2020"));
console.log(Search("01 10 2022 HIV"));
console.log(Search("Talasemia12"));

export default Search;