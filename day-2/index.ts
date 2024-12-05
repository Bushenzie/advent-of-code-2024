import { readTextFile } from "../utils/read"
import {join} from "path";

const solve = async () => {
    const path = join(process.cwd(),"day-2","./input.txt")
    const data = await readTextFile(path)
    if(data === null) return;

    const formatInput = (data: string) => {
        const levels = data.split("\n").map(line =>  line.split(" ").map(Number));
        return levels
    }

    const partOne = (data: string) => {
        const levels = formatInput(data)
        const MIN_DIFFER = 1;
        const MAX_DIFFER = 3;

        let safeReportCount = 0;

        levels.forEach((level,index) => {
            let isSafe = true;
            let isDecreasingType = level[0] > level[1];

            level.reduce((prevVal,currVal) => {
                const difference = isDecreasingType ? prevVal - currVal : currVal - prevVal;
                const isValid = difference <= MAX_DIFFER && difference >= MIN_DIFFER;
                if(!isValid && isSafe) isSafe = false
                return currVal;
            })
            safeReportCount += isSafe ? 1 : 0;
        })

        console.log("Part 1:")
        console.log(safeReportCount)
        return safeReportCount;
    }

    const partTwo = (data: string) => {
        const levels = formatInput(data)
        const MIN_DIFFER = 1;
        const MAX_DIFFER = 3;

        let safeReportCount = 0;

        levels.forEach((level,index) => {
            let isSafe = true;
            // TODO
        })

        console.log("Part 2:")
        console.log("Not yet implemented")
        return null;
    }

    partOne(data)
    partTwo(data)
}

solve();