import { db } from "../firebase-connect.js";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { xlsxToData } from "../data/xlsxtodata.js";

async function getCommunities() {
  const communityList = [];
  const querySnapshot = await getDocs(collection(db, "community"));
  querySnapshot.forEach((doc) => {
    communityList.push(doc.data());
    console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
  });
  return communityList;
}

async function addCommunities(xlsxToData) {
  const communityList = await getCommunities();
  const existCommunityCode = [];
  for (const temp of communityList) {
    existCommunityCode.push(temp["community_code"]);
  }

  try {
    for (let comIdx in xlsxToData) {
      if (comIdx != 0) {
        const oneCommunityInfoArr = xlsxToData[comIdx];
        const oneCommunityJSON = {
          community_code: oneCommunityInfoArr[0],
          community_name: oneCommunityInfoArr[1],
        };

        if (existCommunityCode.includes(oneCommunityJSON["community_code"])) {
          continue;
        } else {
          const docRef = await addDoc(
            collection(db, "community"),
            oneCommunityJSON
          );
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

// getCommunities().then((result) => console.log(result));

// addCommunities(xlsxToData(0)).then((result) => console.log(result));
