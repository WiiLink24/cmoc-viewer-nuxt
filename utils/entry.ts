export function decodeEntryId(num: number) {
  const binaryStr = num.toString(2).padStart(32, '0').padStart(40, '0').slice(8);
  
  num = parseInt(binaryStr, 2);
  
  num ^= 0x20070419;
  num ^= (num >>> 0x1D) ^ (num >>> 0x11) ^ (num >>> 0x17);
  num ^= (num & 0xF0F0F0F) << 4;
  num ^= ((num << 0x1E) ^ (num << 0x12) ^ (num << 0x18)) >>> 0;
  
  return num;
}

export function encodeEntryId(entry_id: number): string {
  let num = entry_id
  num = (num ^ ((num << 0x1e) ^ (num << 0x12) ^ (num << 0x18))) >>> 0;
  num = (num ^ ((num & 0xf0f0f0f) << 4)) >>> 0;
  num =
    (num ^ ((num >>> 0x1d) ^ (num >>> 0x11) ^ (num >>> 0x17) ^ 0x20070419)) >>>
    0;

  let crc =
    ((num >>> 8) ^ (num >>> 24) ^ (num >>> 16) ^ (num & 0xff) ^ 0xff) >>> 0;
  if (232 < ((0xd4a50fff < num ? 1 : 0) + (crc & 0xff))) {
    crc &= 0x7f;
  }

  crc &= 0xff;

  const crcBinary = crc.toString(2).padStart(8, "0");
  const numBinary = num.toString(2).padStart(32, "0");
  const combinedBinary = crcBinary + numBinary;
  const combinedNumberString = parseInt(combinedBinary, 2)
    .toString()
    .padStart(12, "0");

  return (combinedNumberString.match(/.{1,4}/g) || []).join("-");
}