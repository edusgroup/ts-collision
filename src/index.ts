// https://github.com/bmoren/p5.collide2D/blob/master/p5.collide2d.js

export type TPoint = { x: number, y: number }
export type TSize = { w: number, h: number }
export type TCircle = { r: number } & TPoint
export type TRectangle = TPoint & TSize
export type TPolygon = TPoint[]
export type TVector = { b: TPoint, e: TPoint }
export type TTriangle = { a: TPoint, b: TPoint, c: TPoint }

export function dist(p1: TPoint, p2: TPoint) {
    return Math.sqrt(Math.pow((p2.x - p1.x), 2) + Math.pow((p2.y - p1.y), 2))
}

export function isRectRect(rect1: TRectangle, rect2: TRectangle) {
    return rect1.x + rect1.w >= rect2.x
        && rect1.x <= rect2.x + rect2.w
        && rect1.y + rect1.h >= rect2.y
        && rect1.y <= rect2.y + rect2.h
}

export function isRectCircle(rect: TRectangle, circle: TCircle) {
    let nearX = circle.x
    let nearY = circle.y

    if (circle.x < rect.x) {
        nearX = rect.x
    } else if (circle.x > rect.x + rect.w) {
        nearX = rect.x + rect.w
    }

    if (circle.y < rect.y) {
        nearY = rect.y
    } else if (circle.y > rect.y + rect.h) {
        nearY = rect.y + rect.h
    }

    const distance = dist(
        {x: circle.x, y: circle.y},
        {x: nearX, y: nearY}
    )

    return distance <= circle.r
}

export function isCircleCircle(circle1: TCircle, circle2: TCircle) {
    const rDistance = dist(
        {x: circle1.x, y: circle1.y},
        {x: circle2.x, y: circle2.y}
    )

    return rDistance <= circle1.r + circle2.r
}

export function isPointCircle(point: TPoint, circle: TCircle) {
    return dist(point, {x: circle.x, y: circle.y}) <= circle.r
}

export function isPointRect(point: TPoint, rect: TRectangle) {
    return point.x >= rect.x &&
        point.x <= rect.x + rect.w &&
        point.y >= rect.y &&
        point.y <= rect.y + rect.h
}

export function isPointLine(point: TPoint, line: TVector, accurate: number = 0.1) {
    const d1 = dist(point, line.b)
    const d2 = dist(point, line.e)

    const lineLen = dist(line.b, line.e)

    return d1 + d2 >= lineLen - accurate && d1 + d2 <= lineLen + accurate
}

export function isLineCircle(line: TVector, circle: TCircle) {
    if (isPointCircle(line.b, circle)) {
        return true
    }

    if (isPointCircle(line.e, circle)) {
        return true
    }

    const len = dist(line.b, line.e)

    const dot = (((circle.x - line.b.x) * (line.e.x - line.b.x))
        + ((circle.y - line.b.y) * (line.e.y - line.b.y))) / Math.pow(len, 2)

    const closest = {
        x: line.b.x + (dot * (line.e.x - line.b.x)),
        y: line.b.y + (dot * (line.e.y - line.b.y))
    }

    if (isPointLine(closest, line)) {
        return false
    }

    return dist(closest, circle) <= circle.r
}

export function isLineLine(line1: TVector, line2: TVector) {
    const [l1bx, l1ex, l2bx, l2ex] = [line1.b.x, line1.e.x, line2.b.x, line2.e.x]
    const [l1by, l1ey, l2by, l2ey] = [line1.b.y, line1.e.y, line2.b.y, line2.e.y]

    const uA = ((l2ex - l2bx) * (l1by - l2by) - (l2ey - l2by) * (l1bx - l2bx))
        / ((l2ey - l2by) * (l1ex - l1bx) - (l2ex - l2bx) * (l1ey - l1by))
    const uB = ((l1ex - l1bx) * (l1by - l2by) - (l1ey - l1by) * (l1bx - l2bx))
        / ((l2ey - l2by) * (l1ex - l1bx) - (l2ex - l2bx) * (l1ey - l1by))

    return uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1
}

export function getLineOfRectangle(rect: TRectangle, side: number): TVector {
    switch (side) {
        case 0:
            return {b: {x: rect.x, y: rect.y}, e: {x: rect.x + rect.w, y: rect.y}}
        case 1:
            return {b: {x: rect.x + rect.w, y: rect.y}, e: {x: rect.x + rect.w, y: rect.y + rect.h}}
        case 2:
            return {b: {x: rect.x + rect.w, y: rect.y + rect.h}, e: {x: rect.x, y: rect.y + rect.h}}
        case 3:
        default:
            return {b: {x: rect.x, y: rect.y + rect.h}, e: {x: rect.x, y: rect.y}}

    }
}

export function isLineRect(line: TVector, rect: TRectangle) {
    if (isLineLine(line, getLineOfRectangle(rect, 0))) {
        return true
    }

    if (isLineLine(line, getLineOfRectangle(rect, 1))) {
        return true
    }

    if (isLineLine(line, getLineOfRectangle(rect, 2))) {
        return true
    }

    return isLineLine(line, getLineOfRectangle(rect, 3))
}

export function isPointPoly(point: TPoint, vertices: TPolygon) {
    let collision = false

    let next = 0
    for (let current = 0; current < vertices.length; current++) {
        next = next === vertices.length ? 0 : current + 1

        const cu = vertices[current]
        const vn = vertices[next]

        if (((cu.y > point.y && vn.y < point.y) || (cu.y < point.y && vn.y > point.y)) &&
            (point.x < (vn.x - cu.x) * (point.y - cu.y) / (vn.y - cu.y) + cu.x)) {
            collision = !collision
        }
    }
    return collision
}

export function isCirclePoly(circle: TCircle, poly: TPolygon) {
    let next = 0
    for (let current = 0; current < poly.length; current++) {
        next = next === poly.length ? 0 : current + 1
        const line = {b: poly[current], e: poly[next]}
        if (isLineCircle(line, circle)) {
            return true
        }
    }

    return false
}


export function isRectPoly(rect: TRectangle, poly: TPolygon) {
    let next = 0
    for (let current = 0; current < poly.length; current++) {
        next = next === poly.length ? 0 : current + 1

        const line = {b: poly[current], e: poly[next]}
        if (isLineRect(line, rect)) {
            return true
        }
    }

    return false
}

export function isLinePoly(line: TVector, poly: TPolygon) {
    let next = 0
    for (let current = 0; current < poly.length; current++) {
        next = next === poly.length ? 0 : current + 1

        const polyLine = {b: poly[current], e: poly[next]}
        if (isLineLine(line, polyLine)) {
            return true
        }
    }

    return false
}

export function isPolyPoly(poly1: TPolygon, poly2: TPolygon) {
    let next = 0
    for (let current = 0; current < poly1.length; current++) {
        next = next === poly1.length ? 0 : current + 1

        const line = {b: poly1[current], e: poly1[next]}
        if (isLinePoly(line, poly2)) {
            return true
        }
    }

    return false
}

export function isPointTriangle(point: TPoint, tr: TTriangle) {
    const [x1, x2, x3] = [tr.a.x, tr.b.x, tr.c.x]
    const [y1, y2, y3] = [tr.a.y, tr.b.y, tr.c.y]
    const areaOrig = Math.abs((x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1))

    const area1 = Math.abs((x1 - point.x) * (y2 - point.y) - (x2 - point.x) * (y1 - point.y))
    const area2 = Math.abs((x2 - point.x) * (y3 - point.y) - (x3 - point.x) * (y2 - point.y))
    const area3 = Math.abs((x3 - point.x) * (y1 - point.y) - (x1 - point.x) * (y3 - point.y))
    return area1 + area2 + area3 === areaOrig
}

export function isPointPoint(p1: TPoint, p2: TPoint, accurate: number = 0) {
    return accurate === 0 ? p1.x === p2.x && p1.y === p2.y : dist(p1, p2) <= accurate
}
