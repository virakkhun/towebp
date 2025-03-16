import { supportedTypes } from "./utils.js";

const wasmAPI = {
  toWebp: Module._to_webp,
  freeWebPBuffer: Module._free_webp_buffer,
};

/**
 * @typedef {Object} ConvertConfig
 * @property {number} quality
 * @property {() => void} onStart
 * @property {(data: {blob: Blob, originalFileName: string}) => void} onFinish
 * @property {() => void} onMessage
 */

export class Converter {
  /** @type {ConvertConfig}  */
  #config = {};

  /** @param {ConvertConfig} config  */
  constructor(config) {
    this.#config = config;
  }

  /**
   * @param {File} file
   */
  convert(file) {
    if (!supportedTypes(file.type)) {
      this.#config.onMessage("File type not supported...");
      return;
    }

    const reader = new FileReader();

    this.#config.onStart();

    reader.addEventListener("load", (e) => {
      const arrayBuffer = e.target.result;
      const buf = new Uint8Array(arrayBuffer);

      const inputPtr = Module._malloc(buf.byteLength);
      const outputSizePtr = Module._malloc(4);

      Module.HEAP8.set(buf, inputPtr);

      const resultPtr = wasmAPI.toWebp(
        inputPtr,
        buf.byteLength,
        this.#config.quality,
        outputSizePtr,
      );
      const outputSize = Module.HEAP32[outputSizePtr / 4];

      if (resultPtr && outputSize > 0) {
        const resultView = new Uint8Array(
          Module.HEAP8.buffer,
          resultPtr,
          outputSize,
        );
        const result = new Uint8Array(resultView);

        Module._free_webp_buffer(resultPtr);
        const blob = new Blob([result], { type: "image/webp" });

        this.#config.onFinish({
          blob,
          originalFileName: file.name,
        });
      } else {
        this.#config.onMessage();
      }

      Module._free(inputPtr);
    });

    reader.readAsArrayBuffer(file);
  }
}
