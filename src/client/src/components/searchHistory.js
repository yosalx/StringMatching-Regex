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

const test = [
  {
    id: 1,
    tanggal: "2020-01-02",
    nama_pengguna: "aox",
    nama_penyakit: "has",
    hasil: true,
    kemiripan: 75,
  },
  {
    id: 1,
    tanggal: "2020-01-03",
    nama_pengguna: "aoq",
    nama_penyakit: "has",
    hasil: true,
    kemiripan: 75,
  },
  {
    id: 1,
    tanggal: "2020-01-04",
    nama_pengguna: "aor",
    nama_penyakit: "ha",
    hasil: true,
    kemiripan: 75,
  },
  {
    id: 1,
    tanggal: "2020-01-01",
    nama_pengguna: "aoa",
    nama_penyakit: "haq",
    hasil: true,
    kemiripan: 75,
  },
];

let result = [];

function searchFromDatabase(input) {
  let tipe = Search(input);
  if (tipe.type === "tanggal") {
    let search =
      tipe.data.tahun + "-" + tipe.data.bulan + "-" + tipe.data.tanggal;
    for (let i = 0; i < test.length; i++) {
      if (search === test[i].tanggal) {
        result.push(test[i]);
        console.log(test[i]);
      }
    }
  } else if (tipe.type === "penyakit") {
    let search = tipe.data.penyakit;
    for (let i = 0; i < test.length; i++) {
      if (search === test[i].nama_penyakit) {
        result.push(test[i]);
        console.log(test[i]);
      }
    }
  } else if (tipe.type === "tanggalPenyakit") {
    let search =
      tipe.data.tahun + "-" + tipe.data.bulan + "-" + tipe.data.tanggal;
    let penyakit = tipe.data.penyakit;
    for (let i = 0; i < test.length; i++) {
      if (search === test[i].tanggal && penyakit === test[i].nama_penyakit) {
        result.push(test[i]);
        console.log(test[i]);
      }
    }
  }
}

console.log(Search("01 01 2020"));
console.log(Search("01 10 2022 HIV"));
console.log(Search("Talasemia12"));

export default Search;
