BIN = emcc
FLAGS = -O3 -s WASM=1 -s ENVIRONMENT=worker -s MODULARIZE=1 -s EXPORTED_FUNCTIONS='["_version", "_to_webp", "_malloc", "_free", "_free_webp_buffer"]' -I libwebp -s ALLOW_MEMORY_GROWTH=1 -s ENVIRONMENT=worker -s EXPORT_ES6=1 -s MODULARIZE=1

SRCS = webp.c \
    libwebp/src/dec/*.c \
    libwebp/src/dsp/*.c \
    libwebp/src/demux/*.c \
    libwebp/src/enc/*.c \
    libwebp/src/mux/*.c \
    libwebp/src/utils/*.c \
    libwebp/sharpyuv/*.c
OUT = webp.js

$(OUT): $(SRCS)
	$(BIN) $(FLAGS) $(SRCS) -o $(OUT)
