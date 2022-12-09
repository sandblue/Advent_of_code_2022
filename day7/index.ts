import { readFileSync } from "fs";

const main = () => {
    const data = readInput()
    console.log('1 : ', countCharBeforeFlag(data, 4))
    console.log('2 : ', countCharBeforeFlag(data, 14))
}

const countCharBeforeFlag = (signal: string, size: number) => {
    for (let i = 0; i + size < signal.length; i++) {
        const window = signal.slice(i, i + size)
        const charSet = new Set(window)
        if (charSet.size == window.length) return i + size
    }
    return -1
}

const readInput = () => {
    try {
        const data = readFileSync('.\\day7\\input.txt', 'utf8');
        return data
    } catch (err) {
        console.error(err);
        throw new Error()
    }
}

main()