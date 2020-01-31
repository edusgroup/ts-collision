import * as Api from '../src'

// y = x
// y = -x + 7

// https://www.desmos.com/calculator/8ixobr7rvs

test('line - line right', () => {
  const line1 = { b: { x: 0, y: 0 }, e: { x: 5, y: 5 } }
  const line2 = { b: { x: 0, y: 7 }, e: { x: 7, y: 0 } }
  expect(Api.isLineLine(line1, line2)).toBeTruthy()
})

test('line - line wrong 1', () => {
  const line1 = { b: { x: 0, y: 0 }, e: { x: 5, y: 5 } }
  const line2 = { b: { x: -5, y: 12 }, e: { x: 0, y: 7 } }
  expect(Api.isLineLine(line1, line2)).toBeFalsy()
})

test('line - line wrong 2', () => {
  const line1 = { b: { x: -5, y: -5 }, e: { x: 0, y: 0 } }
  const line2 = { b: { x: -5, y: 12 }, e: { x: 0, y: 7 } }
  expect(Api.isLineLine(line1, line2)).toBeFalsy()
})

test('line - rect right point outside', () => {
  const line1 = { b: { x: 0, y: 7 }, e: { x: 7, y: 0 } }
  const rect2 = { x: 0, y: 0, w: 5, h: 5 }
  expect(Api.isLineRect(line1, rect2)).toBeTruthy()
})

test('line - rect right point inside', () => {
  const line1 = { b: { x: 4, y: 3 }, e: { x: 3, y: 4 } }
  const rect2 = { x: 0, y: 0, w: 5, h: 5 }
  expect(Api.isLineRect(line1, rect2)).toBeTruthy()
})
