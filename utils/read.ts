import { readFile } from "node:fs/promises";

export const readTextFile = async (path: string) => {
  try {
    const data = await readFile(path, "utf-8");
    return data;
  } catch (err) {
    console.error("Could not read the text file.");
    return null;
  }
};
