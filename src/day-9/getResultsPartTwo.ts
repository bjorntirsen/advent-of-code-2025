type Point = [number, number]

function parseInput(input: string) {
  const parsed = input
    .split('\n')
    .map((line) => line.split(',').map(Number) as Point)

  return parsed
}

interface RectangleResult {
  from: Point
  to: Point
  area: number
}

function rectangleIsInsideTyped(
  outsideSum: Uint32Array,
  wallSum: Uint32Array,
  w: number,
  a: Point,
  b: Point,
  xIndex: Map<number, number>,
  yIndex: Map<number, number>,
) {
  const minX = Math.min(a[0], b[0])
  const maxX = Math.max(a[0], b[0])
  const minY = Math.min(a[1], b[1])
  const maxY = Math.max(a[1], b[1])

  const cx1 = xIndex.get(minX)!
  const cx2 = xIndex.get(maxX)!
  const cy1 = yIndex.get(minY)!
  const cy2 = yIndex.get(maxY)!

  // interior-only in compressed grid space
  const ix1 = cx1 + 1
  const ix2 = cx2 - 1
  const iy1 = cy1 + 1
  const iy2 = cy2 - 1

  if (ix1 > ix2 || iy1 > iy2) return false

  if (rectCount1D(outsideSum, w, ix1, iy1, ix2, iy2) !== 0) return false
  if (rectCount1D(wallSum, w, ix1, iy1, ix2, iy2) !== 0) return false

  return true
}

function findLargestValidRectangle(
  points: Point[],
  outsideSum: Uint32Array,
  wallSum: Uint32Array,
  w: number,
  xIndex: Map<number, number>,
  yIndex: Map<number, number>,
): RectangleResult | null {
  let best: RectangleResult | null = null
  let bestArea = 0

  const n = points.length

  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const a = points[i]
      const b = points[j]

      const width = Math.abs(a[0] - b[0]) + 1
      const height = Math.abs(a[1] - b[1]) + 1
      const area = width * height

      if (area <= bestArea) continue

      if (
        rectangleIsInsideTyped(outsideSum, wallSum, w, a, b, xIndex, yIndex)
      ) {
        bestArea = area
        best = { from: a, to: b, area }
      }
    }
  }

  return best
}

function compressCoordinates(points: Point[]) {
  const xs = new Set<number>()
  const ys = new Set<number>()

  for (const [x, y] of points) {
    xs.add(x)
    xs.add(x - 1)
    xs.add(x + 1)

    ys.add(y)
    ys.add(y - 1)
    ys.add(y + 1)
  }

  const xsArr = Array.from(xs).sort((a, b) => a - b)
  const ysArr = Array.from(ys).sort((a, b) => a - b)

  const xIndex = new Map<number, number>()
  const yIndex = new Map<number, number>()

  xsArr.forEach((x, i) => xIndex.set(x, i))
  ysArr.forEach((y, i) => yIndex.set(y, i))

  return { xs: xsArr, ys: ysArr, xIndex, yIndex }
}

function makeGrid(w: number, h: number) {
  return new Uint8Array(w * h) // 0 empty, 1 wall
}

function idx(x: number, y: number, w: number) {
  return y * w + x
}

function drawBoundaryFromVertices(
  wall: Uint8Array,
  w: number,
  points: Point[],
  xIndex: Map<number, number>,
  yIndex: Map<number, number>,
) {
  const n = points.length

  for (let i = 0; i < n; i++) {
    const [x1, y1] = points[i]
    const [x2, y2] = points[(i + 1) % n]

    const cx1 = xIndex.get(x1)!
    const cy1 = yIndex.get(y1)!
    const cx2 = xIndex.get(x2)!
    const cy2 = yIndex.get(y2)!

    const dx = Math.sign(cx2 - cx1)
    const dy = Math.sign(cy2 - cy1)

    let x = cx1
    let y = cy1
    wall[idx(x, y, w)] = 1

    while (x !== cx2 || y !== cy2) {
      x += dx
      y += dy
      wall[idx(x, y, w)] = 1
    }
  }
}

function floodOutsideTyped(wall: Uint8Array, w: number, h: number) {
  const outside = new Uint8Array(w * h) // 0/1
  const stack: number[] = [0] // start at (0,0) => index 0

  while (stack.length) {
    const p = stack.pop()!
    if (outside[p]) continue
    if (wall[p]) continue

    outside[p] = 1
    const x = p % w
    const y = (p / w) | 0

    if (y > 0) stack.push(p - w)
    if (y + 1 < h) stack.push(p + w)
    if (x > 0) stack.push(p - 1)
    if (x + 1 < w) stack.push(p + 1)
  }

  return outside
}

function buildPrefixSum(mask: Uint8Array, w: number, h: number) {
  const sum = new Uint32Array(w * h)

  for (let y = 0; y < h; y++) {
    let rowAcc = 0
    for (let x = 0; x < w; x++) {
      rowAcc += mask[idx(x, y, w)]
      const above = y > 0 ? sum[idx(x, y - 1, w)] : 0
      sum[idx(x, y, w)] = rowAcc + above
    }
  }
  return sum
}

function rectCount1D(
  sum: Uint32Array,
  w: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
) {
  const A = sum[idx(x2, y2, w)]
  const B = y1 > 0 ? sum[idx(x2, y1 - 1, w)] : 0
  const C = x1 > 0 ? sum[idx(x1 - 1, y2, w)] : 0
  const D = x1 > 0 && y1 > 0 ? sum[idx(x1 - 1, y1 - 1, w)] : 0
  return A - B - C + D
}

export function getResultForPartTwo(input: string) {
  const points = parseInput(input)
  const { xs, ys, xIndex, yIndex } = compressCoordinates(points) // ✅ red only
  console.log('compressed grid size:', xs.length, ys.length)

  const w = xs.length
  const h = ys.length

  const wall = makeGrid(w, h)
  drawBoundaryFromVertices(wall, w, points, xIndex, yIndex)

  const outside = floodOutsideTyped(wall, w, h)

  const outsideSum = buildPrefixSum(outside, w, h)
  const wallSum = buildPrefixSum(wall, w, h)

  const rectangleResult = findLargestValidRectangle(
    points,
    outsideSum,
    wallSum,
    w,
    xIndex,
    yIndex,
  )

  if (!rectangleResult) throw new Error('Search failed!')
  const { from, to, area } = rectangleResult
  const resultText = `The largest rectangle you can make in this example using only red and green tiles has area ${area}. One way to do this is between ${from.join(',')} and ${to.join(',')}.`
  return resultText
}
