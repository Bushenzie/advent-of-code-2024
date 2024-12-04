import { readTextFile } from "../utils/read"
import {join} from "path";

const solve = async () => {
    const path = join(process.cwd(),"day-1","./input.txt")
    const data = await readTextFile(path)
    if(data === null) return;

    const formatInput = (data: string) => {
        const leftList: number[] = [];
        const rightList: number[] = [];
    
        data.split("\n").map(line => {
            const numberArray = line.split(" ").filter(Boolean) // Could just do .split("   ");
    
            const leftNumber = Number(numberArray[0]);
            const rightNumber = Number(numberArray[1]);
            leftList.push(leftNumber)
            rightList.push(rightNumber)
        })
    
        leftList.sort();
        rightList.sort();

        return [leftList,rightList]
    }

    const partOne = (data: string) => {
        const [leftList,rightList] = formatInput(data);
    
        let differenceSum = 0;
        for(let index = 0; index < leftList.length; index++) {
            const difference = Math.abs(leftList[index]-rightList[index])
            differenceSum += difference;
        }
    
        console.log("Part 1:")
        console.log(differenceSum)
        return differenceSum;
    }

    const partTwo = (data: string) => {
        const [leftList,rightList] = formatInput(data);
        const leftListFiltered = [...(new Set(leftList))];
        
        const rightListOccurencies = {};
        rightList.forEach(item => item in rightListOccurencies ? 
            rightListOccurencies[item] += 1 : 
            rightListOccurencies[item] = 1)

        let similarityScore = 0;
        leftListFiltered.forEach(item => {
            similarityScore += item * (rightListOccurencies[item] ?? 0);
        })

        console.log("Part 2:")
        console.log(similarityScore)
        return similarityScore;
    }

    partOne(data)
    partTwo(data)
}

solve();