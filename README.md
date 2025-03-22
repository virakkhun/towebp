# ToWebP | Convert Image to WebP

Locally convert image to WebP using wasm.
wasm was build from c lib, and trasnform to wasm.

## Dependencies

- [stb](https://github.com/nothings/stb/blob/master/stb_image.h)
  for load image from memory
- [libwebp](https://github.com/webmproject/libwebp) for encoding and decoding
- [emscripten](https://emscripten.org/docs/getting_started/index.html)
  for transforming to wasm

## API

```js
Module._to_webp(
  buffer: Uint8Array,
  bufferLength: number,
  quality: number,
  outputSize: Uint8Array
)
```

## Website Theme

[catppuccin](https://catppuccin.com/palette/)
