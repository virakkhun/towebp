/**
 * @param {string} name
 * @returns {string}
 */
export function toWebPFile(name) {
  return [name.replace(/\.\w+$/g, ""), "webp"].join(".");
}

/**
 * @param {number} bytes
 * @returns {string}
 */
export function formatFileSize(bytes) {
  if (bytes < 1024) {
    return `${bytes} bytes`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  }

  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * @param {string} type
 * @returns {boolean}
 */
export function supportedTypes(type) {
  return ["image/jpeg", "image/jpg", "image/png"].includes(type);
}
