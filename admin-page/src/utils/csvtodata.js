import iconv from "iconv-lite";
import { fillZero } from "./util";

export function uploadCSVToData(file) {
  let reader = new FileReader();
  const data = reader.readAsBinaryString(file);
  const utf8Text = iconv.decode(data, "euc-kr");

  const rows = utf8Text.split("\n");
  const empResult = [];

  for (let rowIndex in rows) {
    let row = rows[rowIndex].split(",");

    if (rowIndex === "0") {
      continue;
    } else {
      if (row[18] === "0" && row[0]) {
        // 퇴직 구분이 0이고, 행번 데이터가 있을때만
        const temp = {
          employee_no: fillZero(8, row[0]),
          name: row[1].trim(),
          nickname: "",
          branch_no: row[2],
          branch_nm: row[3].trim(),
        };
        empResult.push(temp);
      }
    }
  }

  return empResult;
}
