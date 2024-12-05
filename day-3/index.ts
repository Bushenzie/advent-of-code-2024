import { readTextFile } from "../utils/read";
import { join } from "path";

type Instruction = {
  do: boolean;
  index: number;
};

type Multiplication = {
  multiplication: string;
  index: number;
};

const solve = async () => {
  const path = join(process.cwd(), "day-3", "./input.txt");
  const data = await readTextFile(path);
  if (data === null) return;

  const partOne = (data: string) => {
    const filterRegex = /mul\([0-9]+,[0-9]+\)/gm;
    const numberRegex = /[0-9]+/gm;

    const multiplications = data.match(filterRegex);

    let sum = 0;
    multiplications?.forEach((multiplication) => {
      const numbers = multiplication.match(numberRegex)?.map(Number);
      if (!numbers || numbers.length !== 2) {
        return;
      }
      sum += numbers[0] * numbers[1];
    });

    console.log("Part 1:");
    console.log(sum);
    return sum;
  };

  const partTwo = (data: string) => {
    const filterRegex = /mul\([0-9]+,[0-9]+\)/gm;
    const doRegex = /(don't)|(do)/gm;
    const numberRegex = /[0-9]+/gm;

    const instructionsRaw = data.matchAll(doRegex);
    const instructions = [...instructionsRaw].map((ins) => ({
      do: ins[0] === "do",
      index: ins.index,
    }));

    const multiplicationsRaw = data.matchAll(filterRegex);
    const multiplications = [...multiplicationsRaw].map((mult) => ({
      multiplication: mult[0],
      index: mult.index,
    }));

    let sum = 0;
    let prevM: Multiplication | null = null;
    let isMultEnabled = true;
    multiplications?.forEach((m) => {
      const numbers = m.multiplication.match(numberRegex)?.map(Number);
      if (!numbers || numbers.length !== 2) {
        return;
      }

      const possibleInstructions = instructions.filter((ins) => {
        if (prevM) {
          return ins.index <= m.index && ins.index >= prevM.index;
        }
        return ins.index <= m.index;
      });

      let closestIns: Instruction | null = null;

      for (const possibleIns of possibleInstructions) {
        if (!closestIns) {
          closestIns = possibleIns;
        }

        const closestInsDiff = m.index - closestIns.index;
        const currInsDiff = m.index - possibleIns.index;

        if (currInsDiff < closestInsDiff) {
          closestIns = possibleIns;
        }
      }

      isMultEnabled = closestIns?.do ?? isMultEnabled;

      prevM = m;
      sum += isMultEnabled ? numbers[0] * numbers[1] : 0;
    });

    console.log("Part 2:");
    console.log(sum);
    return sum;
  };

  partOne(data);
  partTwo(data);
};

solve();
