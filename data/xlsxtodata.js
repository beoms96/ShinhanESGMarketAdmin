import XLSX from "xlsx";
import path from "path";

let workbook = XLSX.readFile(path.join(path.resolve(), "../../juminfo.xlsx"));

export const xlsxToData = (sheetIndex) => {
  try {
    const excelProducts = XLSX.utils.sheet_to_json(
      workbook.Sheets[workbook.SheetNames[sheetIndex]],
      {
        raw: false,
        header: 1,
        dateNF: "yyyy-mm-dd",
        blankrows: false,
      }
    );
    return excelProducts;
  } catch (err) {
    console.error(err);
    return null;
  }
};
