import { Quality } from "./app/quality.js";
import { buildWorkerInput, formatFileSize, toWebPFile } from "./app/utils.js";
import { DragDrop } from "./app/dragdrop.js";
import { InputCtrl } from "./app/input.js";
import { WebPResult } from "./app/webp-result.js";
import { WORKER_STATE } from "./app/const.js";
import { Feedback } from "./app/feedback.js";
import { FileCtrl } from "./app/file-ctrl.js";
import { SupportedInputBadge } from "./app/supported-input-badge.js";
import { ProgressBar } from "./app/progress-bar.js";

new SupportedInputBadge();
const worker = new Worker("./worker.js");
const feedback = new Feedback();
const quality = new Quality();
const result = new WebPResult();
const dragDrop = new DragDrop();
const inputCtrl = new InputCtrl();
const fileCtrl = new FileCtrl();
const progress = new ProgressBar();

/** @type {{fn: (files: FileList) => void}} */
const SetupFiles = {
  fn: (files) => {
    fileCtrl.setFiles(files, (file) => {
      progress.start(fileCtrl.total);
      feedback.show("converting...");
      worker.postMessage(
        buildWorkerInput({
          file,
          quality: quality.value,
        }),
      );
    });
  },
};

dragDrop.onDragDrop(SetupFiles);
inputCtrl.onChange(SetupFiles);

worker.postMessage(
  buildWorkerInput({
    state: WORKER_STATE.INITIAL_DEP,
  }),
);
worker.onmessage = ({ data }) => {
  /** @type {WorkerOutput} */
  const out = data;

  if (out.state === WORKER_STATE.DONE) {
    const {
      result: { url, size, originalFileName },
    } = out;
    result.new(url, formatFileSize(size), toWebPFile(originalFileName));
    fileCtrl.incrementCompleted();
  }

  const nextAble = [WORKER_STATE.DONE, WORKER_STATE.ERROR].includes(out.state);
  if (fileCtrl.maxIndex !== fileCtrl.index && nextAble) {
    fileCtrl.next((file) => {
      progress.update(fileCtrl.completed);
      worker.postMessage(
        buildWorkerInput({
          file,
          quality: quality.value,
        }),
      );
    });
  }

  if (out.state === WORKER_STATE.ERROR) {
    result.feedbackOnError(
      fileCtrl.files[fileCtrl.index].name,
      out.result.error,
    );
    fileCtrl.incrementCompleted();
    progress.update(fileCtrl.completed);
  }

  if (fileCtrl.total === fileCtrl.completed && nextAble) {
    feedback.show("success...");
    feedback.hide();
  }
};
