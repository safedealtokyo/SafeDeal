export const formatDate = (datetime: string) => {
  const tmp = new Date(datetime).toLocaleString("ja-JP", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
  });
  return tmp;
};
