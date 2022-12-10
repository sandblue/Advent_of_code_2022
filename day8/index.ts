import { readFileSync } from "fs";

const main = () => {
    const data = readInput()
    //console.log(data)
    console.log('1 :', findAllVisibleTree(data))
    console.log('2 :', findHighestScenicScore(data))
}

const findHighestScenicScore = (map: number[][]) => {
    const scenicScore = map.map((row, ri) => {
        return row.map((t, ci) => {
            let left = 0
            for (let leftIndex = ci - 1; leftIndex >= 0; leftIndex--) {
                left++
                if (map[ri][leftIndex] >= t) break
            }
            let right = 0
            for (let leftIndex = ci + 1; leftIndex < map[ri].length; leftIndex++) {
                right++
                if (map[ri][leftIndex] >= t) break
            }
            let top = 0
            for (let topIndex = ri - 1; topIndex >= 0; topIndex--) {
                top++
                if (map[topIndex][ci] >= t) break
            }
            let bottom = 0
            for (let bottomIndex = ri + 1; bottomIndex < map.length; bottomIndex++) {
                bottom++
                if (map[bottomIndex][ci] >= t) break
            }
            if (left == 0) left = 1
            if (right == 0) right = 1
            if (top == 0) top = 1
            if (bottom == 0) bottom = 1
            return left * right * top * bottom

        })
    }).map((scoreRow) => {
        return scoreRow.reduce((prev, curr) => { return prev > curr ? prev : curr })
    }).reduce((prev, curr) => { return prev > curr ? prev : curr })
    return scenicScore

}

const findAllVisibleTree = (map: number[][]) => {
    const resultSet = new Set<string>()
    addVisibleTreeInXToSet(map, resultSet)
    addVisibleTreeInYToSet(map, resultSet)
    return resultSet.size + (map.length * 2) + ((map[0].length - 2) * 2)
}

const addVisibleTreeInXToSet = (map: number[][], currentSet: Set<string>) => {
    const rowLenght = map.length
    for (let r = 1; r < rowLenght - 1; r++) {
        let prevValue = map[r][0]
        for (let c = 1; c < map[r].length - 1; c++) {
            if (map[r][c] > prevValue) currentSet.add('r' + r + 'c' + c)
            else continue
            prevValue = map[r][c]
        }
    }
    for (let r = 1; r < rowLenght - 1; r++) {
        let prevValue = map[r][map[r].length - 1]
        for (let c = map[r].length - 2; c > 0; c--) {
            if (map[r][c] > prevValue) currentSet.add('r' + r + 'c' + c)
            else continue
            prevValue = map[r][c]
        }
    }
}

const addVisibleTreeInYToSet = (map: number[][], currentSet: Set<string>) => {
    const columnSize = map[0].length
    for (let c = 1; c < columnSize - 1; c++) {
        let prevValue = map[0][c]
        for (let r = 1; r < map.length - 1; r++) {
            if (map[r][c] > prevValue) currentSet.add('r' + r + 'c' + c)
            else continue
            prevValue = map[r][c]
        }
    }
    for (let c = 1; c < columnSize - 1; c++) {
        let prevValue = map[map.length - 1][c]
        for (let r = map.length - 2; r > 0; r--) {
            if (map[r][c] > prevValue) currentSet.add('r' + r + 'c' + c)
            else continue
            prevValue = map[r][c]
        }
    }
}

const readInput = () => {
    try {
        const data = readFileSync('.\\day8\\input.txt', 'utf8');
        return data.split('\r\n').map((c) => {
            return Array.from(c).map((num) => parseInt(num))
        })
    } catch (err) {
        console.error(err);
        throw new Error()
    }
}

main()

