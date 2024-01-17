export const formatPrice = (num) => {
  const amount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format((num / 100).toFixed(2));
  return amount;
};
