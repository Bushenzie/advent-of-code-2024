import { readTextFile } from "../utils/read"
import {join} from "path";

type LevelType = "increase" | "decrease";

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

        let safeReports = levels
            .filter((level) => {
                let prevVal = level[0];
                let isSafe = true;
                let levelType: LevelType = level[0] > level[level.length-1] ? "decrease" : "increase";
                
                level.forEach((currVal,index) => {
                    if(index === 0) return;

                    let difference = 0;

                    if(levelType === "decrease") difference = prevVal - currVal;
                    else difference = currVal - prevVal;

                    const isValid = difference <= MAX_DIFFER && difference >= MIN_DIFFER;
                    if(!isValid && isSafe) isSafe = false
                    prevVal = currVal;
                })
                return isSafe;
            })

        console.log("Part 1:")
        console.log(safeReports.length)
        return safeReports.length;
    }

    const partTwo = (data: string) => {
        const levels = formatInput(data)
        const MIN_DIFFER = 1;
        const MAX_DIFFER = 3;

        //I am not proud of this solution at all
        let safeReports = levels
            .filter((level) => {

                const isSolvable = (level: number[]) => {
                    let prevVal = level[0];
                    let isSafe = true;
                    let levelType: LevelType = level[0] > level[level.length-1] ? "decrease" : "increase";
                    
                    level.forEach((currVal,index) => {
                        if(index === 0) return;
    
                        let difference = 0;
    
                        if(levelType === "decrease") difference = prevVal - currVal;
                        else difference = currVal - prevVal;
    
                        const isValid = difference <= MAX_DIFFER && difference >= MIN_DIFFER;
                        if(!isValid && isSafe) {
                            isSafe = false
                        }
                        prevVal = currVal;
                    })

                    return isSafe;
                }

                let badLevels = isSolvable(level) ? 0 : 1;

                for(let i = 0; i < level.length; i++) {
                    const levelCopy = [...level];
                    levelCopy.splice(i,1);
                    badLevels += !isSolvable(levelCopy) ? 1 : 0;
                }

                return badLevels !== level.length+1;
            })

        console.log("Part 2:")
        console.log(safeReports.length)
        return safeReports.length;
    }

    partOne(data)
    partTwo(data)
}

solve();