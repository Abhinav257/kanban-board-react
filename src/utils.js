export const getImageFromUsername = (username) => {
  const name = username.split(" ").join("+");
  return `https://ui-avatars.com/api/?name=${name}`;
};
