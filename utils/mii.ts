export function downloadMii(
  name: string | [number, number],
  entry_id: string,
  mii_data: string
) {
  // Decode base64 string
  const binaryString = atob(mii_data);
  const binaryLen = binaryString.length;
  // Create binary array from base64 decoded string
  const bytes = new Uint8Array(binaryLen);
  // Fill the binary array
  for (let i = 0; i < binaryLen; i++) {
    const ascii = binaryString.charCodeAt(i);
    bytes[i] = ascii;
  }

  // Create a blob object
  const blob = new Blob([bytes], { type: "application/octet-stream" });

  // Create a URL for the blob
  const url = URL.createObjectURL(blob);

  // Create a link element
  const link = document.createElement("a");
  link.href = url;
  link.download = `${name}-(${entry_id}).miigx`; // The name of the downloaded file

  // Append the link to the document
  document.body.appendChild(link);

  // Trigger the download by clicking the link
  link.click();

  // Remove the link from the document
  document.body.removeChild(link);

  // Revoke the object URL after the download
  URL.revokeObjectURL(url);
}

export function renderMii(base64String: string) {
  const binaryString = atob(base64String);
  const binaryLen = binaryString.length;
  const bytes = new Uint8Array(binaryLen);

  for (let i = 0; i < binaryLen; i++) {
    const ascii = binaryString.charCodeAt(i);
    bytes[i] = ascii;
  }


  const blob = new Blob([bytes], { type: "application/octet-stream" });

  const file = new File([blob], "file.miigx");

  const formData = new FormData();
  formData.append("platform", "wii");
  formData.append("data", file);

  return fetch("https://miicontestp.wii.rc24.xyz/cgi-bin/studio.cgi", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      const mii = data.mii;

      const src =
        "https://studio.mii.nintendo.com/miis/image.png?data=" +
        mii +
        "&type=face_only&expression=normal&width=270&bgColor=FFFFFF00";

      // Return the mii image
      return src;
    });
}
