/** @type {import('./app/converter.js').Converter} */
let conv;

/**
 * @param {WorkerOutput} output
 * @returns {WorkerOutput}
 **/
function buildWorkerOutput(output) {
  return output;
}

/** @type {WorkerState} */
const WORKER_STATE = {
  INITIAL_DEP: 0,
  STARTED: 1,
  DONE: 2,
  ERROR: 3,
};

addEventListener("message", async ({ data }) => {
  /** @type {WorkerInput} */
  const input = data;

  if (input.state === WORKER_STATE.INITIAL_DEP) {
    const wasm = await import("./lib/webp.js");
    const webpAPI = await wasm.default();
    const convertModule = await import("./app/converter.js");
    conv = new convertModule.Converter({
      api: webpAPI,
      onFinish: ({ blob, originalFileName }) => {
        const url = URL.createObjectURL(blob);
        postMessage(
          buildWorkerOutput({
            result: { url, size: blob.size, originalFileName },
            state: WORKER_STATE.DONE,
          }),
        );
      },
      onError: (msg) => {
        postMessage(
          buildWorkerOutput({
            result: {
              error: msg,
            },
            state: WORKER_STATE.ERROR,
          }),
        );
      },
    });

    return;
  }

  postMessage(
    buildWorkerOutput({
      result: {},
      state: WORKER_STATE.STARTED,
    }),
  );

  conv.convert(input.file, input.quality);
});
