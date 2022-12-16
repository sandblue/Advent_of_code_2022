import { readFileSync } from "fs";

const main = () => {
    const heightArray = readInput()
    createConnection(heightArray)
    const nodeS = findAllNodeFromC(heightArray, 'S')
    console.log('1 :', findShortestStep(nodeS, 'E', heightArray))
    resetCheck(heightArray)
    const nodeA = findAllNodeFromC(heightArray, 'a')
    console.log('2 :', findShortestStep(nodeA, 'E', heightArray))
}


const findShortestStep = (headNode: Node[], targetChar: string, heightArray: Node[][]) => {
    let step = 0
    headNode.forEach((n) => {
        n.checked = true
    })
    let next: Node[] = [...headNode]
    while (next.length > 0) {
        //drawMap(heightArray)
        for (const node of next) { if (node.charValue == targetChar) return step }
        step++
        const nextNodeUnCheck: Node[] = []
        for (const node of next) {
            const uncheckedNextNode = node.nextNode.filter((n) => { return !n.checked })
            uncheckedNextNode.forEach((n) => {
                n.checked = true
            })
            nextNodeUnCheck.push(...uncheckedNextNode)
        }
        next = nextNodeUnCheck
    }
    return step
}

const drawMap = (heightArray: Node[][]) => {
    console.log()
    for (let i = 0; i < heightArray.length; i++) {
        for (let j = 0; j < heightArray[i].length; j++) {
            if (heightArray[i][j].checked) {
                process.stdout.write("*")
            } else {
                process.stdout.write(heightArray[i][j].charValue)
            }
        }
        console.log()
    }
}

const scoreChar = 'SabcdefghijklmnopqrstuvwxyzE'

interface Node {
    checked: boolean
    charValue: string
    value: number
    nextNode: Node[]
    index: number
}

const findAllNodeFromC = (heightArray: Node[][], targetChar: string) => {
    const result: Node[] = []
    for (let row = 0; row < heightArray.length; row++) {
        for (let column = 0; column < heightArray[row].length; column++) {
            const curNode = heightArray[row][column]
            if (curNode.charValue == targetChar) result.push(curNode)
        }
    }
    return result
}

const resetCheck = (heightArray: Node[][]) => {
    for (let row = 0; row < heightArray.length; row++) {
        for (let column = 0; column < heightArray[row].length; column++) {
            const curNode = heightArray[row][column]
            curNode.checked = false
        }
    }
}

const createConnection = (heightArray: Node[][]) => {
    let headNode = {} as Node
    let index = 0
    for (let row = 0; row < heightArray.length; row++) {
        for (let column = 0; column < heightArray[row].length; column++) {
            const curNode = heightArray[row][column]
            curNode.index = index++
            if (row < heightArray.length - 1) {
                const downNode: Node = heightArray[row + 1][column]
                if (downNode.value - curNode.value < 2) {
                    curNode.nextNode.push(downNode)
                }
            }
            if (row > 0) {
                const upperNode = heightArray[row - 1][column]
                if (upperNode.value - curNode.value < 2) {
                    curNode.nextNode.push(upperNode)
                }
            }
            if (column > 0) {
                const leftNode = heightArray[row][column - 1]
                if (leftNode.value - curNode.value < 2) {
                    curNode.nextNode.push(leftNode)
                }
            }
            if (column < heightArray[row].length - 1) {
                const rightNode = heightArray[row][column + 1]
                if (rightNode.value - curNode.value < 2) {
                    curNode.nextNode.push(rightNode)
                }
            }
        }
    }
    return headNode
}

const readInput = () => {
    try {
        const data = readFileSync('.\\day12\\input.txt', 'utf8');
        return data.split('\r\n')
            .map((string) => { return string.split("") })
            .map((charList) => {
                return charList.map((c) => {
                    return {
                        checked: false,
                        charValue: c,
                        value: scoreChar.indexOf(c),
                        nextNode: [],
                        index: 0
                    } as Node
                })
            })
    } catch (err) {
        console.error(err);
        throw new Error()
    }
}

main()