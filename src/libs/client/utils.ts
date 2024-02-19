export function cls(...classnames: string[]) {
  return classnames.join(" ");
}
export function formatCurrency(currency: string | number) {
  if (typeof currency === "string") {
    currency = currency + "";
  }
  return currency.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
