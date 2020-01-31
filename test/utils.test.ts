import { dist } from '../src'

test('math destination', () => {
  const p1 = {x:1, y:2}
  const p2 = {x:1, y:6}
  expect(dist(p1, p2)).toEqual(4)
})
