import { readFileSync } from "fs";

const main = () => {
    const dataRow = readInput()
    //console.log(dataRow)
    console.log('1 :', findProductMost2Inspec(dataRow))
    console.log('2 :', findProductMost2InspecNround(dataRow, 10000))
}

const readInput = () => {
    try {
        const data = readFileSync('.\\day11\\input.txt', 'utf8');
        return data.split('\r\n\r\n').map((m) => { return m.split('\r\n') })
    } catch (err) {
        console.error(err);
        throw new Error()
    }
}

const findProductMost2InspecNround = (dataRow: string[][], n: number) => {
    const monkeys = createMonkey(dataRow)
    const gcdMonkey = monkeys.slice().map((m) => { return m.diviBy }).reduce((prev, cur) => { return prev * cur })
    for (let r = 0; r < n; r++) {
        for (const m of monkeys) {
            while (m.item.length > 0) {
                let value = useOperation(m.item.pop() ?? 0, m.operation)
                value = value % gcdMonkey
                if (value % m.diviBy == 0) {
                    monkeys[m.ifTrueThrowTo].item.push(value)
                } else {
                    monkeys[m.ifFalseThrowTo].item.push(value)
                }
                m.inspectCount += 1
            }
        }
    }
    const inspectCountList = monkeys.slice().sort((a, b) => { return a.inspectCount > b.inspectCount ? -1 : 1 })
    return inspectCountList[0].inspectCount * inspectCountList[1].inspectCount
}

const findProductMost2Inspec = (dataRow: string[][]) => {
    const monkeys = createMonkey(dataRow)
    for (let r = 0; r < 20; r++) {
        for (let m of monkeys) {
            while (m.item.length > 0) {
                let value = useOperation(m.item.pop() ?? 0, m.operation)
                value = Math.floor(value / 3)
                if (value % m.diviBy == 0) {
                    monkeys[m.ifTrueThrowTo].item.push(value)
                } else {
                    monkeys[m.ifFalseThrowTo].item.push(value)
                }
                m.inspectCount += 1
            }
        }
    }
    const inspectCountList = monkeys.slice().sort((a, b) => { return a.inspectCount > b.inspectCount ? -1 : 1 })
    return inspectCountList[0].inspectCount * inspectCountList[1].inspectCount
}

const useOperation = (value: number, operation: string[]) => {
    const valueA = operation[0] == 'old' ? value : parseInt(operation[0])
    const valueB = operation[2] == 'old' ? value : parseInt(operation[2])
    switch (operation[1]) {
        case '+':
            return valueA + valueB
        case '-':
            return valueA - valueB
        case '*':
            return valueA * valueB
        case '/':
            return valueA / valueB
        default:
            return 0
    }
}

interface Monkey {
    item: number[]
    diviBy: number
    ifTrueThrowTo: number
    ifFalseThrowTo: number
    operation: string[]
    inspectCount: number
}

const createMonkey = (data: string[][]) => {
    const monkeyList: Monkey[] = []
    for (let m of data) {
        const monkey = {} as Monkey
        monkeyList.push(monkey)
        monkey.item = m[1].split(":")[1].split(",").map((i) => { return parseInt(i) })
        monkey.diviBy = parseInt(m[3].split("Test: divisible by ")[1])
        monkey.operation = m[2].split("= ")[1].split(" ")
        monkey.ifTrueThrowTo = parseInt(m[4].split("If true: throw to monkey")[1])
        monkey.ifFalseThrowTo = parseInt(m[5].split("If false: throw to monkey")[1])
        monkey.inspectCount = 0
    }
    return monkeyList
}

main()