import { getBranch } from "../context/branch.js";
import { getCommunity } from "../context/community.js";

export async function findBranchAndCommunity(branchNo) {
  const branchInfo = await getBranch(branchNo);
  let communityInfo = {};
  if (Object.keys(branchInfo).length === 0) {
    return {
      branch_no: "0",
      branch_name: "0",
      community_code: "0",
      community_name: "0",
      latitude: "0",
      longitude: "0",
    };
  } else {
    communityInfo = await getCommunity(branchInfo.community_code);
  }

  return {
    branch_no: branchInfo.branch_no,
    branch_name: branchInfo.branch_name,
    community_code: communityInfo["community_code"] || "0",
    community_name: communityInfo["community_name"] || "0",
    latitude: branchInfo.latitude,
    longitude: branchInfo.longitude,
  };
}
