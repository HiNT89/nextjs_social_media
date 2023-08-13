export const handleLikePost = (like: string[], userID: string) => {
  const isExist = like.includes(userID);
  const newLike = isExist
    ? like.filter((x) => x !== userID)
    : [userID, ...like];
  return newLike;
};
