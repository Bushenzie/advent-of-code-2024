import { readTextFile } from "../utils/read";
import { join } from "path";

const solve = async () => {
  const path = join(process.cwd(), "day-4", "./input.txt");
  const data = await readTextFile(path);
  if (data === null) return;

  const formatInput = (data: string) => {
    return data.split("\n");
  };

  const partOne = (data: string) => {
    const lines = formatInput(data);

    let sum = 0;
    for (let i = 0; i < lines.length; i++) {
      for (let x = 0; x < lines[i].length; x++) {
        //TODO Should use parrent instead of hardcoding this check

        // Horizontally
        if (
          lines?.[i]?.[x] === "X" &&
          lines?.[i]?.[x + 1] === "M" &&
          lines?.[i]?.[x + 2] === "A" &&
          lines?.[i]?.[x + 3] === "S"
        ) {
          sum++;
        }

        //Horizontally B
        if (
          lines?.[i]?.[x] === "X" &&
          lines?.[i]?.[x - 1] === "M" &&
          lines?.[i]?.[x - 2] === "A" &&
          lines?.[i]?.[x - 3] === "S"
        ) {
          sum++;
        }

        //Vertically
        if (
          lines?.[i]?.[x] === "X" &&
          lines?.[i + 1]?.[x] === "M" &&
          lines?.[i + 2]?.[x] === "A" &&
          lines?.[i + 3]?.[x] === "S"
        ) {
          sum++;
        }

        //Vertically B
        if (
          lines?.[i]?.[x] === "X" &&
          lines?.[i - 1]?.[x] === "M" &&
          lines?.[i - 2]?.[x] === "A" &&
          lines?.[i - 3]?.[x] === "S"
        ) {
          sum++;
        }

        // \ down
        if (
          lines?.[i]?.[x] === "X" &&
          lines?.[i + 1]?.[x + 1] === "M" &&
          lines?.[i + 2]?.[x + 2] === "A" &&
          lines?.[i + 3]?.[x + 3] === "S"
        ) {
          sum++;
        }

        // \ up
        if (
          lines?.[i]?.[x] === "X" &&
          lines?.[i - 1]?.[x - 1] === "M" &&
          lines?.[i - 2]?.[x - 2] === "A" &&
          lines?.[i - 3]?.[x - 3] === "S"
        ) {
          sum++;
        }

        // / down
        if (
          lines?.[i]?.[x] === "X" &&
          lines?.[i + 1]?.[x - 1] === "M" &&
          lines?.[i + 2]?.[x - 2] === "A" &&
          lines?.[i + 3]?.[x - 3] === "S"
        ) {
          sum++;
        }

        // / up
        if (
          lines?.[i]?.[x] === "X" &&
          lines?.[i - 1]?.[x + 1] === "M" &&
          lines?.[i - 2]?.[x + 2] === "A" && //  / up
          lines?.[i - 3]?.[x + 3] === "S"
        ) {
          sum++;
        }
      }
    }

    console.log("Part 1:");
    console.log(sum);
    return sum;
  };

  const partTwo = (data: string) => {
    const lines = formatInput(data);

    //TODO Should use parrent instead of hardcoding this check
    let sum = 0;
    for (let i = 0; i < lines.length; i++) {
      for (let x = 0; x < lines[i].length; x++) {
        /*
          M . M
          . A .
          S . S
        */
        if (
          lines?.[i]?.[x] === "A" &&
          lines?.[i - 1]?.[x - 1] === "M" &&
          lines?.[i + 1]?.[x + 1] === "S" &&
          lines?.[i - 1]?.[x + 1] === "M" &&
          lines?.[i + 1]?.[x - 1] === "S"
        ) {
          sum++;
        }

        /*
          S . M
          . A .
          S . M
        */
        if (
          lines?.[i]?.[x] === "A" &&
          lines?.[i - 1]?.[x - 1] === "S" &&
          lines?.[i - 1]?.[x + 1] === "M" &&
          lines?.[i + 1]?.[x + 1] === "M" &&
          lines?.[i + 1]?.[x - 1] === "S"
        ) {
          sum++;
        }

        /*
          S . S
          . A .
          M . M
        */
        if (
          lines?.[i]?.[x] === "A" &&
          lines?.[i - 1]?.[x - 1] === "S" &&
          lines?.[i + 1]?.[x + 1] === "M" &&
          lines?.[i - 1]?.[x + 1] === "S" &&
          lines?.[i + 1]?.[x - 1] === "M"
        ) {
          sum++;
        }

        /*
          M . S
          . A .
          M . S
        */
        if (
          lines?.[i]?.[x] === "A" &&
          lines?.[i - 1]?.[x - 1] === "M" &&
          lines?.[i + 1]?.[x + 1] === "S" &&
          lines?.[i - 1]?.[x + 1] === "S" &&
          lines?.[i + 1]?.[x - 1] === "M"
        ) {
          sum++;
        }
      }
    }

    console.log("Part 2:");
    console.log(sum);
    return sum;
  };

  partOne(data);
  partTwo(data);
};

solve();
