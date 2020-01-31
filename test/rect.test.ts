import { isRectCircle, isRectRect } from '../src'

test('rect rect left top', () => {
  const rect1 = { x: 2, y: 2, w: 3, h: 3 }
  const rect2 = { x: 1, y: 1, w: 2, h: 2 }
  expect(isRectRect(rect1, rect2)).toBeTruthy()
})

test('rect rect right top', () => {
  const rect1 = { x: 2, y: 2, w: 3, h: 3 }
  const rect2 = { x: 4, y: 1, w: 2, h: 2 }
  expect(isRectRect(rect1, rect2)).toBeTruthy()
})

test('rect rect right bottom', () => {
  const rect1 = { x: 2, y: 2, w: 3, h: 3 }
  const rect2 = { x: 4, y: 4, w: 2, h: 2 }
  expect(isRectRect(rect1, rect2)).toBeTruthy()
})

test('rect rect left bottom', () => {
  const rect1 = { x: 2, y: 2, w: 3, h: 3 }
  const rect2 = { x: 1, y: 4, w: 2, h: 2 }
  expect(isRectRect(rect1, rect2)).toBeTruthy()
})

test('rect rect inside', () => {
  const rect1 = { x: 2, y: 2, w: 3, h: 3 }
  const rect2 = { x: 3, y: 3, w: 1, h: 1 }
  expect(isRectRect(rect1, rect2)).toBeTruthy()
})

test('rect rect outside', () => {
  const rect1 = { x: 2, y: 2, w: 3, h: 3 }
  const rect2 = { x: 0, y: 0, w: 6, h: 6 }
  expect(isRectRect(rect1, rect2)).toBeTruthy()
})

test('rect rect dont', () => {
  const rect1 = { x: 2, y: 2, w: 3, h: 3 }
  const rect2 = { x: 0, y: 0, w: 1, h: 1 }
  expect(isRectRect(rect1, rect2)).toBeFalsy()
})

test('rect circle inside', () => {
  const rect = { x: 2, y: 2, w: 3, h: 3 }
  const circle = { x: 3.5, y: 3.5, r: 1 }
  expect(isRectCircle(rect, circle)).toBeTruthy()
})

test('rect circle outside', () => {
  const rect = { x: 2, y: 2, w: 3, h: 3 }
  const circle = { x: 3.5, y: 3.5, r: 1000 }
  expect(isRectCircle(rect, circle)).toBeTruthy()
})

// left top
// right top
// right bottom
// left bottom
// dont
