import { readFileSync } from 'fs';


const main = () => {
  const elfCals = readElfCals()
  console.log(findMaxSumCals(elfCals))
  console.log(findSumTopN(elfCals, 3))
}


const readElfCals = () => {
  try {
    const data = readFileSync('.\\day1\\input1.txt', 'utf8');
    const elfCals = data.split('\r\n\r\n')
      .map((i) => i.split('\r\n'))
      .map((ec) => {
        return ec.map((c) => { return parseInt(c) })
      })
    return elfCals
  } catch (err) {
    console.error(err);
    throw new Error()
  }
}

const findMaxSumCals = (elfCals: number[][]) => {
  let maxSumCal = 0
  elfCals.forEach((cals: number[]) => {
    const sumaryCal = cals.reduce((prev, c) => { return prev + c })
    if (sumaryCal > maxSumCal) maxSumCal = sumaryCal
  })
  return maxSumCal
}

interface linkList {
  next: linkList | undefined,
  prev: linkList | undefined,
  value: any
}

const findSumTopN = (elfCals: number[][], n: number) => {
  const root = { next: undefined, prev: undefined, value: 0 } as linkList
  if (elfCals.length < n) return 'implement later , find sum all input'
  const calculatedCal: number[] = findSumCals(elfCals)
  let currentLink : linkList = root
  for (let i = 0; i < n - 1; i++) {
    const newLinkList = { prev: currentLink, next: undefined, value: 0 } as linkList
    currentLink.next = newLinkList
    currentLink = newLinkList
  }
  for (let cals of calculatedCal) {
    currentLink = root
    if (cals > root.value) {
      while (cals > currentLink.value) {
        if (currentLink.next != undefined) {
          let nextLink = currentLink.next
          if (cals > nextLink.value) {
            currentLink.value = nextLink.value
            currentLink = nextLink
          } else {
            break
          }
        } else {
          break
        }
      }
      currentLink.value = cals
    }
  }
  let sum = 0
  currentLink = root
  while (true) {
    sum = sum + currentLink.value
    if(currentLink.next == undefined) break  
    currentLink = currentLink.next 
  } 
  return sum
}

const printLinkList = (root: linkList) => {
  let currentLink = root
  let str = ''
  while (true) {
    str = str + ',' + currentLink.value
    if(currentLink.next == undefined) break  
    currentLink = currentLink.next 
  } 
  console.log('str currentLink', str)
  console.log('..')
}

const findSumCals = (elfCals: number[][]) => {
  return elfCals.map((cals: number[]) => {
    return cals.reduce((prev, c) => { return prev + c })
  })
}

main()