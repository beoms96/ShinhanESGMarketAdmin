import { firestore } from "../firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function getBranch(branchNo) {
  let branch = {};
  const q = query(
    collection(firestore, "branch"),
    where("branch_no", "==", branchNo)
  );
  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      branch = doc.data();
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });
  } catch (err) {
    alert(err.message);
  }

  return branch;
}
