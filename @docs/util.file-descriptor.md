# FileDescriptor

A class that represents a file and provides various information and operations on it.

## Constructor

- `file`: The path of the file.

## Properties

- `file`: The real path of the file. Read-only.
- `stat`: The file system statistics of the file. Read-only. Materialized after the first access. Returns a promise that resolves to a `fs.Stats` object or null if the file does not exist or an error occurs.
- `isImage`: A boolean value indicating if the file is an image. Read-only. Materialized after the first access. Based on the MIME type of the file.
- `image`: The image metadata and statistics of the file. Read-only. Materialized after the first access. Returns a promise that resolves to an `Img` object or null if the file is not an image or an error occurs.
- `mimeType`: The MIME type of the file. Read-only. Materialized after the first access. Returns a string or false if the MIME type cannot be determined.
- `size`: The size of the file in bytes. Returns a promise that resolves to a number or zero if the file does not exist or an error occurs.
- `exists`: A boolean value indicating if the file exists. Returns a promise that resolves to a boolean value.
- `name`: The name of the file, including the extension. Read-only.
- `parsedPath`: The parsed path object of the file. Read-only. Materialized after the first access.

## Types

- `Img`: An object that contains image metadata and statistics.

    - `meta`: A `sharp.Metadata` object that contains image metadata such as format, width, height, etc.
    - `stats`: A `sharp.Stats` object that contains image statistics such as min, max, mean, etc.
