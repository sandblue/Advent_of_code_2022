import { readFileSync } from "fs";

const main = () => {
    const command = readCommandSet() // MOVE [0] FROM [1] TO [2]
    const baseStack = readBaseStack()
    const baseStack2 = readBaseStack()
    console.log('baseStack', baseStack)
    console.log('command', command)
    console.log('1 : ', runCommandSet9000Serie(baseStack, command))
    console.log('2 : ', runCommandSetWith9001Serie(baseStack2, command))
}

const runCommandSet9000Serie = (baseStack: string[][], command: number[][]) => {
    command.forEach((c) => {
        let n = c[0]
        const fromColumn = baseStack[c[1] - 1]
        const toColumn = baseStack[c[2] - 1]
        for (let i = 0; i < n; i++) {
            if (fromColumn.length > 0) {
                toColumn.push(fromColumn.pop() ?? '')
            } else {
                break;
            }
        }
    })
    return baseStack.map((c) => {
        return c[c.length - 1]
    })
}

const runCommandSetWith9001Serie = (baseStack: string[][], command: number[][]) => {
    command.forEach((c) => {
        let n = c[0]
        const fromColumn = baseStack[c[1] - 1]
        const toColumn = baseStack[c[2] - 1]
        toColumn.push(...fromColumn.slice(fromColumn.length - n))
        baseStack[c[1] - 1] = fromColumn.slice(0, fromColumn.length - n)
    })
    return baseStack.map((c) => {
        return c[c.length - 1]
    })
}

const readBaseStack = () => {
    try {
        const data = readFileSync('.\\day5\\baseStack.txt', 'utf8');
        const cargos = data.split('\r\n')
            .map((cargo) => {
                return cargo.replace(/[ ]{4}/g, '[*]')
                    .replace(/[\[\] ]/g, '')
            })
        const cargoStackRow: string[][] = []
        cargos.reverse().forEach((cargoRow) => {
            Array.from(cargoRow).forEach((cargo, i) => {
                if (cargo == '*') return
                if (cargoStackRow.length <= i) cargoStackRow.push([])
                const column = cargoStackRow[i]
                column.push(cargo)
            })
        })
        return cargoStackRow
    } catch (err) {
        console.error(err);
        throw new Error()
    }
}

const readCommandSet = () => {
    try {
        const command = readFileSync('.\\day5\\command.txt', 'utf8');
        return command.split('\r\n')
            .map((c) => {
                return c.match(/[0-9]+/g)?.map((i) => parseInt(i?.toString() || '0')) ?? []
            })
    } catch (err) {
        console.error(err);
        throw new Error()
    }
}

main()