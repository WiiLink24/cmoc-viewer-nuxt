export function formatWiiNumber(wii_number: number) {
  return wii_number
    .toString()
    .padStart(15, "0")
    .replace(/(\d{4})(?=\d)/g, "$1-");
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  const formatter = new Intl.DateTimeFormat("en-EN", options);
  const formattedDate = formatter.format(date);

  return formattedDate;
}