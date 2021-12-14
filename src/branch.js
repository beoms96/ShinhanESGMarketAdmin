import { db } from "../firebase-connect.js";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { jumResult } from "../data/xlsxtodata.js";

async function getBranches() {
  const branchList = [];
  const querySnapshot = await getDocs(collection(db, "branch"));
  querySnapshot.forEach((doc) => {
    branchList.push(doc.data());
    console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
  });
  return branchList;
}

async function addBranches(xlsxToData) {
  const branchList = await getBranches();
  const existBranchCode = [];
  for (const temp of branchList) {
    existBranchCode.push(temp["branch_no"]);
  }

  try {
    for (let comIdx in xlsxToData) {
      if (comIdx != 0) {
        // 첫행은 속성명
        const oneBranchInfoArr = xlsxToData[comIdx];
        const oneBranchJSON = {
          branch_no: oneBranchInfoArr[0] || oneBranchInfoArr[1],
          branch_name: oneBranchInfoArr[2],
          latitude: Math.round(oneBranchInfoArr[6] * 1e15) / 1e15 || 0,
          longitude: Math.round(oneBranchInfoArr[8] * 1e15) / 1e15 || 0,
          community_code: oneBranchInfoArr[9],
        };

        if (
          existBranchCode.includes(oneBranchJSON["branch_no"]) ||
          oneBranchJSON["branch_no"] === "" ||
          oneBranchJSON["branch_name"] === ""
        ) {
          continue;
        } else {
          const docRef = await addDoc(collection(db, "branch"), oneBranchJSON);
          console.log("Document writeen with ID: ", docRef.id);
        }
      }
    }
    return "Upload Success";
  } catch (e) {
    console.error("Error adding document: ", e);
    return "Upload Fail";
  }
}

// getBranches().then((result) => console.log(result));

// addBranches(jumResult(1)).then((result) => console.log(result));
