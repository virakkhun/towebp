# ToWebP | Convert Image to WebP

Locally convert image to WebP.

## Dependencies

- [libwebp](https://github.com/webmproject/libwebp) for encoding and decoding
- [emscripten](https://emscripten.org/docs/getting_started/index.html)
  for transforming to wasm

## API

- `Module._to_webp(
    buffer: Unit8Array,
    bufferLength: number,
    quality: number,
    outputSize: Unit8Array
)`
