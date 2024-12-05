import { readTextFile } from "../utils/read"
import {join} from "path";

const solve = async () => {
    const path = join(process.cwd(),"day-3","./input.txt")
    const data = await readTextFile(path)
    if(data === null) return;

    const partOne = (data: string) => {
        const filterRegex = /mul\([0-9]+,[0-9]+\)/gm
        const numberRegex = /[0-9]+/gm

        const multiplications = data.match(filterRegex);

        let sum = 0;
        multiplications?.forEach(multiplication => {
            const numbers = multiplication.match(numberRegex)?.map(Number)
            if(!numbers || numbers.length !== 2) {
                return;
            }
            sum += numbers[0] * numbers[1];
        })

        console.log("Part 1:")
        console.log(sum)
        return sum;
    }

    const partTwo = (data: string) => {
        
        console.log("Part 1:")
        console.log("Not yet implemented")
        return null;
    }

    partOne(data)
    partTwo(data)
}

solve();