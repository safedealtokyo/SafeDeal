export const formatDate = (datetime: string) => {
  const tmp = new Date(datetime).toLocaleString("ja-JP", {
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
  return tmp;
};
