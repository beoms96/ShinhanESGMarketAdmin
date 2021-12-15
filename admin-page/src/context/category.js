import { firestore } from "../firebase.js";
import { collection, addDoc, getDocs } from "firebase/firestore";

export async function getCategories() {
  const categoryList = [];
  const querySnapshot = await getDocs(collection(firestore, "category"));
  querySnapshot.forEach((doc) => {
    categoryList.push(doc.data());
    console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
  });
  return categoryList;
}

export async function addCategory(resultJSON) {
  const categoryList = await getCategories();
  let maxId = -1;
  for (const temp of categoryList) {
    maxId = temp.id >= maxId ? temp.id : maxId;
  }

  resultJSON.id = maxId + 1;
  try {
    const docRef = await addDoc(collection(firestore, "category"), resultJSON);
    console.log("Document writeen with ID: ", docRef.id);
    return "Upload Success";
  } catch (e) {
    console.error("Error adding document: ", e);
    return "Upload Fail";
  }
}
