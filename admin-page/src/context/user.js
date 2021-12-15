import { firestore } from "../firebase.js";
import { collection, addDoc, getDocs } from "firebase/firestore";

export async function getUsers() {
  const userList = [];
  const querySnapshot = await getDocs(collection(firestore, "user"));
  querySnapshot.forEach((doc) => {
    userList.push(doc.data());
    console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
  });
  return userList;
}

export async function addUser(resultJSON) {
  const userList = await getUsers();
  const existEmployeeNo = [];
  for (const temp of userList) {
    existEmployeeNo.push(temp["employee_no"]);
  }

  try {
    if (existEmployeeNo.includes(oneUser["employee_no"])) {
      return "Exist";
    } else {
      const docRef = await addDoc(collection(firestore, "user"), resultJSON);
      console.log("Document writeen with ID: ", docRef.id);
    }
    return true;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
}

export async function addUsers(resultJSONArr) {
  const userList = await getUsers();
  const existEmployeeNo = [];
  for (const temp of userList) {
    existEmployeeNo.push(temp["employee_no"]);
  }

  try {
    for (let oneUser of resultJSONArr) {
      if (existEmployeeNo.includes(oneUser["employee_no"])) {
        continue;
      } else {
        const docRef = await addDoc(collection(firestore, "user"), oneUser);
        console.log("Document writeen with ID: ", docRef.id);
      }
    }
    return "Upload Success";
  } catch (e) {
    console.error("Error adding document: ", e);
    return "Upload Fail";
  }
}
