export default function convertNumber(number) {
  return number.trim().replace(/_| |\(|\)|\+|/g, '');
}
