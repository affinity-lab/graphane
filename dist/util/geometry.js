"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rectangle = exports.Dimension = exports.Point = void 0;
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    ;
}
exports.Point = Point;
class Dimension {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    ;
    static make(size) {
        return new Dimension(typeof size.width === "number" ? size.width : 0, typeof size.height === "number" ? size.height : 0);
    }
    ;
    contains(size) { return this.width >= size.width && this.height >= size.height; }
    ;
}
exports.Dimension = Dimension;
class Rectangle {
    constructor(position, size) {
        this.position = position;
        this.size = size;
    }
    ;
    static make(x, y, x2, y2) {
        return new Rectangle(new Point(Math.min(x, x2), Math.min(y, y2)), new Dimension(Math.abs(x - x2), Math.abs(y - y2)));
    }
    ;
    get bottomLeft() { return this.position; }
    ;
    get topLeft() { return new Point(this.position.x, this.position.y + this.size.height); }
    ;
    get topRight() { return new Point(this.position.x + this.size.width, this.position.y + this.size.height); }
    ;
    get bottomRight() { return new Point(this.position.x + this.size.width, this.position.y); }
    ;
    contains(geometry) {
        if (geometry instanceof Point)
            return geometry.x >= this.bottomLeft.x && geometry.x <= this.bottomRight.x && geometry.y >= this.bottomLeft.y && geometry.y <= this.topLeft.y;
        return this.contains(geometry.bottomLeft) && this.contains(geometry.topLeft) && this.contains(geometry.bottomRight) && this.contains(geometry.topRight);
    }
    ;
    overlaps(rect) {
        return (this.contains(rect.bottomLeft) ||
            this.contains(rect.topLeft) ||
            this.contains(rect.bottomRight) ||
            this.contains(rect.topRight) ||
            rect.contains(this.bottomLeft) ||
            rect.contains(this.topLeft) ||
            rect.contains(this.bottomRight) ||
            rect.contains(this.topRight));
    }
    ;
}
exports.Rectangle = Rectangle;
