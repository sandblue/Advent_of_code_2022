import { readFileSync } from "fs";

const main = () => {
    const commands = readInput()
    //console.log(commands)
    console.log('1 :', findSumFirst6SignalStrengths(commands))
    console.log('2 :', drawCRTRowFor40Preriod(commands))
}

const drawCRTRowFor40Preriod = (commands: string[][]) => {
    const maxCycle = 240
    const period = 40
    let value = 1
    const crt: string[][] = [[]]
    let currentCrtRow = crt[0]
    const currentCommands = commands.reverse()
    let currentExe: number | undefined = undefined
    for (let c = 0; c < maxCycle; c++) {
        if (c % 40 == 0) {
            crt.push([])
            currentCrtRow = crt[c / 40]
        }
        if (c % 40 >= value - 1 && c % 40 <= value + 1) {
            currentCrtRow.push('#')
        } else {
            currentCrtRow.push('.')
        }
        if (currentExe) {
            value += currentExe
            currentExe = undefined
        } else {
            const command = currentCommands.pop()
            if (command?.length) {
                if (command[0] == 'addx') {
                    currentExe = parseInt(command[1])
                }
            }
        }
    }
    crt.forEach((r) => console.log(r.toString()))
}

const findSumFirst6SignalStrengths = (commands: string[][]) => {
    const period = 40
    let checkValue = 20
    let count = 1
    let value = 1
    let sum = 0
    for (let command of commands) {
        if (count + 1 >= checkValue) {
            sum += checkValue * value
            checkValue += period
        }
        if (command[0] == 'noop') {
            count += 1
            continue
        }
        if (command[0] == 'addx') {
            count += 2
            value += parseInt(command[1])
            continue
        }
    }
    return sum
}

const readInput = () => {
    try {
        const data = readFileSync('.\\day10\\input.txt', 'utf8');
        return data.split('\r\n')
            .map((c) => { return c.split(" ") })
    } catch (err) {
        console.error(err);
        throw new Error()
    }
}

main()