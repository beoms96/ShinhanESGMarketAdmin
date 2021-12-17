import { db } from "../firebase-connect.js";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { userPlusComm } from "../data/usercomm.js";

async function getUsers() {
  const userList = [];
  const querySnapshot = await getDocs(collection(db, "user"));
  querySnapshot.forEach((doc) => {
    userList.push(doc.data());
    console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
  });
  return userList;
}

async function addUsers(resultJSON) {
  const userList = await getUsers();
  const existEmployeeNo = [];
  for (const temp of userList) {
    existEmployeeNo.push(temp["employee_no"]);
  }

  try {
    for (let oneUser of resultJSON) {
      if (existEmployeeNo.includes(oneUser["employee_no"])) {
        continue;
      } else {
        const docRef = await addDoc(collection(db, "user"), oneUser);
        console.log("Document writeen with ID: ", docRef.id);
      }
    }
    return "Upload Success";
  } catch (e) {
    console.error("Error adding document: ", e);
    return "Upload Fail";
  }
}

/*addUsers(userPlusComm()).then((a) => {
  console.log(a);
});*/

/*getUsers().then((b) => {
  console.log(b.length);
});*/
