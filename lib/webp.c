#include "emsdk/upstream/emscripten/system/include/emscripten/em_macros.h"
#include "libwebp/src/webp/encode.h"
#include "libwebp/src/webp/types.h"
#include <stdatomic.h>

#define STB_IMAGE_IMPLEMENTATION
#include "stb_image.h"

#include <stddef.h>
#include <stdint.h>
#include <stdio.h>
#include <stdlib.h>
#include <wctype.h>

EMSCRIPTEN_KEEPALIVE
int version() { return WebPGetEncoderVersion(); }

EMSCRIPTEN_KEEPALIVE
unsigned char *to_webp(const unsigned char *buffer, int buffer_size,
                       float quality, size_t *out_size) {

  int width, height, channels;
  unsigned char *image_data =
      stbi_load_from_memory(buffer, buffer_size, &width, &height, &channels, 0);

  if (image_data == NULL) {
    fprintf(stderr, "Error loading image from memory.\n");
    stbi_image_free(image_data);
    *out_size = 0;
    return NULL;
  }

  unsigned char *output_buffer = NULL;
  size_t webp_size = 0;

  if (channels == 3) {
    webp_size = WebPEncodeRGB(image_data, width, height, width * 3, quality,
                              &output_buffer);
    stbi_image_free(image_data);
    *out_size = webp_size;
    return output_buffer;
  }

  if (channels == 4) {
    webp_size = WebPEncodeRGBA(image_data, width, height, width * 4, quality,
                               &output_buffer);
    stbi_image_free(image_data);
    *out_size = webp_size;
    return output_buffer;
  }

  if (channels != 3 || channels != 4) {
    printf("Channel not supported");
    stbi_image_free(image_data);
    return NULL;
  }

  stbi_image_free(image_data);
  return NULL;
}

EMSCRIPTEN_KEEPALIVE
void free_webp_buffer(unsigned char *buf) { WebPFree(buf); }
