import { readFileSync } from "fs";

const main = () => {
    const data = readInput()
    //console.log('data', data)
    console.log('1 : ', sumDuplicatePriority(data))
    console.log('2 : ', sumDuplicatePriorityGroup(data, 3))
}

const priorityChar = ".abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"

const sumDuplicatePriority = (compartments: string[]) => {
    let sum = 0
    compartments.forEach((ruckSack) => {
        const firstHalfRuckSack = ruckSack.substring(0, ruckSack.length / 2)
        const secondHalfRuckSack = ruckSack.substring(ruckSack.length / 2)
        const duplicate = findOnly1Dup(firstHalfRuckSack, secondHalfRuckSack)
        sum += priorityChar.indexOf(duplicate || '.')
    })
    return sum
}

const sumDuplicatePriorityGroup = (compartments: string[], groupSize: number) => {
    let sum = 0
    for (let i = 0; i < compartments.length; i += groupSize) {
        const group = compartments.slice(i, i + groupSize)
        const duplicate = findOnly1DupForAllGroup(group[0], group.slice(1))
        sum += priorityChar.indexOf(duplicate || '.')
    }
    return sum
}

const findOnly1Dup = (i: string, j: string) => {
    return Array.from(i).find((item) => {
        return j.split(item).length > 1
    })
}

const findOnly1DupForAllGroup = (i: string, j: string[]) => {
    return Array.from(i).find((item) => {
        return j.map((k) => { return k.split(item).length > 1 })
            .reduce((prev, cur) => { return prev && cur })
    })
}

const readInput = () => {
    try {
        const data = readFileSync('.\\day3\\input.txt', 'utf8');
        return data.split('\r\n')
    } catch (err) {
        console.error(err);
        throw new Error()
    }
}

main()