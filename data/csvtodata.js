import path from "path";
import fs from "fs";
import iconv from "iconv-lite";

const filePath = path.join(path.resolve(), "../../직원.csv");
const data = fs.readFileSync(filePath, "binary");
const utf8Text = iconv.decode(data, "euc-kr");

const rows = utf8Text.split("\n");
export const result = [];
let columns = "";

for (let rowIndex in rows) {
  let row = rows[rowIndex].split(",");

  if (rowIndex === "0") {
    columns = row;
  } else {
    if (row[18] === "0" && row[0]) {
      // 퇴직 구분이 0이고, 행번 데이터가 있을때만
      const temp = {
        employee_no: row[0],
        name: row[1],
        nickname: "",
        branch_no: row[2],
        branch_nm: row[3],
      };
      result.push(temp);
    }
  }
}
