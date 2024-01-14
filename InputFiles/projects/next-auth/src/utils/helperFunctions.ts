import { SHA256 } from "crypto-js";

export function slugify(text: string, separator: string = "-"): string {
  // Replace any non-word character with the separator
  const slug: string = text.toLowerCase().replace(/[\W_]+/g, separator);

  // Trim any leading or trailing separators
  return slug.replace(new RegExp(`^${separator}+|${separator}+$`, "g"), "");
}

export const now = () => new Date();

export function getCurrentTimestamp(): string {
  return Date.now().toString();
}

export function debugLog(title: string, data: any): void {
  console.log(`debugLog: ${title}`);
  console.log(JSON.stringify(data, null, 2));
  console.log(`exit debugLog: ${title}`);
}

export function generateSHA256Hash() {
  const randomString = generateRandomString(10); // Generate a random string of length 10
  return SHA256(randomString).toString();
}

export function generateRandomString(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

export function convertToUpperCaseUnderscore(text: string) {
  // Split the input string by space and convert each part to uppercase
  const parts = text.split(" ").map((part) => part.toUpperCase());

  // Join the parts with underscores
  const result = parts.join("_");

  return result;
}
