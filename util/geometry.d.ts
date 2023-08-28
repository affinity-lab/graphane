export declare class Point {
    readonly x: number;
    readonly y: number;
    constructor(x: number, y: number);
}
export declare class Dimension {
    readonly width: number;
    readonly height: number;
    constructor(width: number, height: number);
    static make(size: {
        width?: number;
        height?: number;
    }): Dimension;
    contains(size: Dimension): boolean;
}
export declare class Rectangle {
    readonly position: Point;
    readonly size: Dimension;
    constructor(position: Point, size: Dimension);
    static make(x: number, y: number, x2: number, y2: number): Rectangle;
    get bottomLeft(): Point;
    get topLeft(): Point;
    get topRight(): Point;
    get bottomRight(): Point;
    contains(geometry: Point | Rectangle): boolean;
    overlaps(rect: Rectangle): boolean;
}
