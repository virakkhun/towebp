import { supportedTypes } from "./utils.js";

/**
 * @typedef {Object} ConvertConfig
 * @property {Object} api
 * @property {(data: {blob: Blob, originalFileName: string}) => void} onFinish
 * @property {(msg: string) => void} onError
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
   * @param {number} quality
   */
  convert(file, quality) {
    if (!supportedTypes(file.type)) {
      this.#config.onError("File type not supported...");
      return;
    }

    const reader = new FileReader();

    reader.addEventListener("load", (e) => {
      const arrayBuffer = e.target.result;
      const buf = new Uint8Array(arrayBuffer);

      const inputPtr = this.#config.api._malloc(buf.byteLength);
      const outputSizePtr = this.#config.api._malloc(4);

      this.#config.api.HEAP8.set(buf, inputPtr);

      const resultPtr = this.#config.api._to_webp(
        inputPtr,
        buf.byteLength,
        quality,
        outputSizePtr,
      );
      const outputSize = this.#config.api.HEAP32[outputSizePtr / 4];

      if (resultPtr && outputSize > 0) {
        const resultView = new Uint8Array(
          this.#config.api.HEAP8.buffer,
          resultPtr,
          outputSize,
        );
        const result = new Uint8Array(resultView);

        this.#config.api._free_webp_buffer(resultPtr);
        const blob = new Blob([result], { type: "image/webp" });

        this.#config.onFinish({
          blob,
          originalFileName: file.name,
        });
      } else {
        this.#config.onError("Something went wrong...");
      }

      this.#config.api._free(outputSizePtr);
      this.#config.api._free(inputPtr);
    });

    reader.readAsArrayBuffer(file);
  }
}
