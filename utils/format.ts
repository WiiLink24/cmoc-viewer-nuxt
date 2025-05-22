export function formatWiiNumber(wii_number: number) {
  return wii_number
    .toString()
    .padStart(15, "0")
    .replace(/(\d{4})(?=\d)/g, "$1-");
}
