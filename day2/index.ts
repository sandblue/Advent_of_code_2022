import { readFileSync } from "fs";

const main = () => {
    const data = readInput()
    console.log('data', data)
    console.log('part1', findSumTournamentScore(data))
    console.log('part2', findSumTournamentScorePart2(data))
}

const mapResult: { [id: string]: number } = {
    "A X": 4,
    "A Y": 8,
    "A Z": 3,

    "B X": 1,
    "B Y": 5,
    "B Z": 9,

    "C X": 7,
    "C Y": 2,
    "C Z": 6,
}

const mapResulPart2: { [id: string]: number } = {
    "A X": 3, //"A C" -> 0 + 3 
    "A Y": 4, //"A A" -> 3 + 1
    "A Z": 8, //"A B" -> 6 + 2

    "B X": 1, //"B A" -> 0 + 1 
    "B Y": 5, //"B B" -> 3 + 2
    "B Z": 9, //"B C" -> 6 + 3

    "C X": 2, //"C B" -> 0 + 2
    "C Y": 6, //"C C" -> 3 + 3
    "C Z": 7, //"C A" -> 6 + 1
}

const findSumTournamentScore = (result: string[]) => {
    return result.map((i) => {
        return mapResult[i]
    }).reduce((prev, curr) => {
        return prev + curr
    })
}

const findSumTournamentScorePart2 = (result: string[]) => {
    return result.map((i) => {
        return mapResulPart2[i]
    }).reduce((prev, curr) => {
        return prev + curr
    })
}

const readInput = () => {
    try {
        const data = readFileSync('.\\day2\\input.txt', 'utf8');
        return data.split('\r\n')
    } catch (err) {
        console.error(err);
        throw new Error()
    }
}

main()