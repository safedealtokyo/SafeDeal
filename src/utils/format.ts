export const addressFormat = (address: string) => {
  const formated = `${address.slice(0, 6)}...${address.slice(
    address.length - 5,
    address.length
  )}`;
  return formated;
};
