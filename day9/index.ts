import { readFileSync } from "fs";

const main = () => {
    const command = readInput()
    //console.log('command', command)
    console.log('1 : ', countTailVisitAtLeast1(command))
    console.log('2 : ', countTailVisitWith10KnotAtLeast1(command))
}

const countTailVisitWith10KnotAtLeast1 = (command: (string | number)[][]) => {
    // [X , Y] head[0] -> tail[9]
    let knots = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]]
    const pathSet = new Set<string>
    for (let c of command) {
        for (let j = 0; j < c[1]; j++) {
            switch (c[0]) {
                case 'U':
                    knots[0][1] += 1
                    break
                case 'D':
                    knots[0][1] -= 1
                    break
                case 'L':
                    knots[0][0] -= 1
                    break
                case 'R':
                    knots[0][0] += 1
                    break
                default:
                    break
            }
            for (let i = 0; i < knots.length - 1; i++) {
                const headPosition = knots[i]
                const tailPosition = knots[i + 1]
                const diffX = headPosition[0] - tailPosition[0]
                const diffY = headPosition[1] - tailPosition[1]
                // Move To Top Right
                if (diffX > 1 && diffY > 1) {
                    tailPosition[0]++
                    tailPosition[1]++
                    continue
                }
                // Move To Top Left
                if (diffX > 1 && diffY < -1) {
                    tailPosition[0]++
                    tailPosition[1]--
                    continue
                }
                // Move To Bottom Right
                if (diffX < -1 && diffY > 1) {
                    tailPosition[0]--
                    tailPosition[1]++
                    continue
                }
                // Move To Bottom Left
                if (diffX < -1 && diffY < -1) {
                    tailPosition[0]--
                    tailPosition[1]--
                    continue
                }
                // Move To Right
                if (diffX > 1) {
                    tailPosition[1] = headPosition[1]
                    tailPosition[0]++
                    continue
                }
                // Move to Left
                if (diffX < - 1) {
                    tailPosition[1] = headPosition[1]
                    tailPosition[0]--
                    continue
                }
                // Move To Top
                if (diffY > 1) {
                    tailPosition[0] = headPosition[0]
                    tailPosition[1]++
                    continue
                }
                // Move to Bottom
                if (diffY < - 1) {
                    tailPosition[0] = headPosition[0]
                    tailPosition[1]--
                    continue
                }
            }
            pathSet.add(knots[knots.length - 1].toString())
        }
    }
    return pathSet.size
}

const countTailVisitAtLeast1 = (command: (string | number)[][]) => {
    // X , Y
    let headPosition = [0, 0]
    let tailPosition = [0, 0]
    const pathSet = new Set<string>
    for (let c of command) {
        switch (c[0]) {
            case 'U':
                headPosition[1] += c[1] as number
                break
            case 'D':
                headPosition[1] -= c[1] as number
                break
            case 'L':
                headPosition[0] -= c[1] as number
                break
            case 'R':
                headPosition[0] += c[1] as number
                break
            default:
                break
        }
        //X
        const diffX = headPosition[0] - tailPosition[0]
        if (diffX > 1) {
            // Head move right [..T.XH]
            tailPosition[1] = headPosition[1]
            while (tailPosition[0] < headPosition[0] - 1) {
                tailPosition[0] += 1
                pathSet.add(tailPosition.toString())
            }
        } else if (diffX < -1) {
            // Head move left [.HX.T.]
            tailPosition[1] = headPosition[1]
            while (tailPosition[0] > headPosition[0] + 1) {
                tailPosition[0] -= 1
                pathSet.add(tailPosition.toString())
            }
        }
        //Y
        const diffY = headPosition[1] - tailPosition[1]
        if (diffY > 1) {
            // Head move top 
            // [..H..]
            // [..X..]
            // [.T...]
            tailPosition[0] = headPosition[0]
            while (tailPosition[1] < headPosition[1] - 1) {
                tailPosition[1] += 1
                pathSet.add(tailPosition.toString())
            }
        } else if (diffY < -1) {
            // Head move down 
            // [..T..]
            // [.X...]
            // [.H...]
            tailPosition[0] = headPosition[0]
            while (tailPosition[1] > headPosition[1] + 1) {
                tailPosition[1] -= 1
                pathSet.add(tailPosition.toString())
            }
        }
    }
    return pathSet.size + 1
}

const readInput = () => {
    try {
        const data = readFileSync('.\\day9\\input.txt', 'utf8');
        return data.split('\r\n')
            .map((i) => {
                const command = i.split(' ')
                return [command[0], parseInt(command[1])]
            })
    } catch (err) {
        console.error(err);
        throw new Error()
    }
}

main()