import { empResult } from "../data/csvtodata.js";
import { jumResult } from "../data/xlsxtodata.js";

export function userPlusComm() {
  const finalJSONArr = [];

  const empJSONArr = empResult; // [ {}, {} ]
  const commArrList = jumResult(0); // [ [], [] ]
  const jumArrList = jumResult(1); // [ [], [] ]

  for (const oneEmpJSON of empJSONArr) {
    // 점정보부터 필요한 거 (branch_no)
    const targetJumArr = jumArrList.filter(
      (oneJum) => oneJum[0] == oneEmpJSON.branch_no
    );

    // 길이 2 이상 없다. (중복되는 지점 없음)
    if (targetJumArr.length == 1) {
      let targetJum = targetJumArr[0];
      oneEmpJSON.latitude = Math.round(targetJum[6] * 1e15) / 1e15 || 0;
      oneEmpJSON.longitude = Math.round(targetJum[8] * 1e15) / 1e15 || 0;
      const targetCommArr = commArrList.filter(
        (oneComm) => oneComm[0] == targetJum[9]
      );
      const targetComm = targetCommArr.length == 1 ? targetCommArr[0] : [0, ""];
      oneEmpJSON.community_code = targetComm[0];
      oneEmpJSON.community_name = targetComm[1].trim();
    } else {
      // 길이 0 -> 지점 사라지거나 한 경우
      oneEmpJSON.latitude = 0;
      oneEmpJSON.longitude = 0;
      oneEmpJSON.community_code = "0";
      oneEmpJSON.community_name = "";
    }

    finalJSONArr.push(oneEmpJSON);
  }

  return finalJSONArr;
}
