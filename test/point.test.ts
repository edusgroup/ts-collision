import * as Api from '../src/index'

test('point - point right', () => {
  const p1 = { x: 1, y: 2 }
  const p2 = { x: 1, y: 2 }
  expect(Api.isPointPoint(p1, p2)).toBeTruthy()
})

test('point - point wrong', () => {
  const p1 = { x: 1, y: 2 }
  const p2 = { x: 1, y: 3 }
  expect(Api.isPointPoint(p1, p2)).toBeFalsy()
})

test('point - point right accurate', () => {
  const p1 = { x: 1, y: 2 }
  const p2 = { x: 1, y: 2.1 }
  expect(Api.isPointPoint(p1, p2, 0.5)).toBeTruthy()
})

test('point - point wrong accurate', () => {
  const p1 = { x: 1, y: 2 }
  const p2 = { x: 1, y: 2.6 }
  expect(Api.isPointPoint(p1, p2, 0.5)).toBeFalsy()
})

test('point - circle right', () => {
  const point = { x: 1, y: 2 }
  const circle = { x: 0, y: 0, r: 5 }
  expect(Api.isPointCircle(point, circle)).toBeTruthy()
})

test('point - circle wrong', () => {
  const point = { x: 1, y: 6 }
  const circle = { x: 0, y: 0, r: 5 }
  expect(Api.isPointCircle(point, circle)).toBeFalsy()
})

test('point - rect center right', () => {
  const point = { x: 2.5, y: 2.5 }
  const rect = { x: 0, y: 0, w: 5, h: 5 }
  expect(Api.isPointRect(point, rect)).toBeTruthy()
})

test('point - rect top wrong', () => {
  const point = { x: 2, y: -1 }
  const rect = { x: 0, y: 0, w: 5, h: 5 }
  expect(Api.isPointRect(point, rect)).toBeFalsy()
})

test('point - rect right wrong', () => {
  const point = { x: 6, y: 2 }
  const rect = { x: 0, y: 0, w: 5, h: 5 }
  expect(Api.isPointRect(point, rect)).toBeFalsy()
})

test('point - rect bottom wrong', () => {
  const point = { x: 2, y: 6}
  const rect = { x: 0, y: 0, w: 5, h: 5 }
  expect(Api.isPointRect(point, rect)).toBeFalsy()
})

test('point - rect left wrong', () => {
  const point = { x: -1, y: 2}
  const rect = { x: 0, y: 0, w: 5, h: 5 }
  expect(Api.isPointRect(point, rect)).toBeFalsy()
})
