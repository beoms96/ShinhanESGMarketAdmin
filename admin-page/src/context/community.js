import { firestore } from "../firebase.js";
import { collection, query, where, getDocs } from "firebase/firestore";

export async function getCommunity(communityCode) {
  let community = {};
  const q = query(
    collection(firestore, "community"),
    where("community_code", "==", communityCode)
  );
  try {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      community = doc.data();
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });
  } catch (err) {
    alert(err.message);
  }

  return community;
}
