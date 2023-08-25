# Point

A class that represents a point in a two-dimensional coordinate system.

## Constructor

- `x`: The x-coordinate of the point.
- `y`: The y-coordinate of the point.

## Properties

- `x`: The x-coordinate of the point. Read-only.
- `y`: The y-coordinate of the point. Read-only.

# Dimension

A class that represents a dimension in a two-dimensional space.

## Constructor

- `width`: The width of the dimension.
- `height`: The height of the dimension.

## Static Methods

- `make(size)`: Creates a new dimension from an object that has optional width and height properties. If the properties are missing or not numbers, they are set to zero.

  - `size`: An object that may have width and height properties.
  - Returns: A new dimension instance.

## Methods

- `contains(size)`: Checks if this dimension contains another dimension.

  - `size`: A dimension to check.
  - Returns: A boolean value indicating if this dimension contains the other dimension.

## Properties

- `width`: The width of the dimension. Read-only.
- `height`: The height of the dimension. Read-only.

# Rectangle

A class that represents a rectangle in a two-dimensional coordinate system.

## Constructor

- `position`: The position of the bottom-left corner of the rectangle.
- `size`: The size of the rectangle.

## Static Methods

- `make(x, y, x2, y2)`: Creates a new rectangle from four coordinates.

  - `x`: The x-coordinate of the first point.
  - `y`: The y-coordinate of the first point.
  - `x2`: The x-coordinate of the second point.
  - `y2`: The y-coordinate of the second point.
  - Returns: A new rectangle instance.

## Methods

- `contains(geometry)`: Checks if this rectangle contains a point or another rectangle.

  - `geometry`: A point or a rectangle to check.
  - Returns: A boolean value indicating if this rectangle contains the geometry.

- `overlaps(rect)`: Checks if this rectangle overlaps with another rectangle.

  - `rect`: A rectangle to check.
  - Returns: A boolean value indicating if this rectangle overlaps with the other rectangle.

## Properties

- `position`: The position of the bottom-left corner of the rectangle. Read-only.
- `size`: The size of the rectangle. Read-only.
- `bottomLeft`: The bottom-left corner of the rectangle. Read-only.
- `topLeft`: The top-left corner of the rectangle. Read-only.
- `topRight`: The top-right corner of the rectangle. Read-only.
- `bottomRight`: The bottom-right corner of the rectangle. Read-only.
```