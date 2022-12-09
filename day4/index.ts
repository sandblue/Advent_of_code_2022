import { readFileSync } from "fs";

const main = () => {
    const data = readInput()
    console.log('data', data)
    console.log('1 : ', countFullyContains(data))
    console.log('2 : ', countOverLapContains(data))
}

const countFullyContains = (data: number[][][]) => {
    return data.filter((pairRange) => {
        const firstRange = pairRange[0]
        const secondRange = pairRange[1]
        const fContainS = (firstRange[0] >= secondRange[0] && firstRange[1] <= secondRange[1])
        const sContainF = (firstRange[0] <= secondRange[0] && firstRange[1] >= secondRange[1])
        return fContainS || sContainF
    }).length
}

const countOverLapContains = (data: number[][][]) => {
    return data.filter((pairRange) => {
        const firstRange = pairRange[0]
        const secondRange = pairRange[1]
        const fOverLapS = (firstRange[0] >= secondRange[0] && firstRange[0] <= secondRange[1])
        const sOverLapF = (firstRange[0] <= secondRange[0] && firstRange[1] >= secondRange[0])
        return fOverLapS || sOverLapF
    }).length
}

const readInput = () => {
    try {
        const data = readFileSync('.\\day4\\input.txt', 'utf8');
        return data.split('\r\n')
            .map((i) => {
                const pair = i.split(',')
                return pair.map((j) => {
                    const pairRange = j.split('-')
                    return pairRange.map((k) => {
                        return parseInt(k)
                    })
                })
            })
    } catch (err) {
        console.error(err);
        throw new Error()
    }
}

main()