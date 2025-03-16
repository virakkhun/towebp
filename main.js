import { Previewer } from "./app/previewer.js";
import { DownloadBtn } from "./app/download.js";
import { Quality } from "./app/quality.js";
import { Alert } from "./app/alert.js";
import { Info } from "./app/info.js";
import { toWebPFile } from "./app/utils.js";
import { DragDrop } from "./app/dragdrop.js";
import { Converter } from "./app/converter.js";
import { InputCtrl } from "./app/input.js";

if (!Module) throw new Error("Failed to load wasm module");

const previewer = new Previewer();
const btn = new DownloadBtn();
const info = new Info();
const message = new Alert();
const quality = new Quality();

const converter = new Converter({
  quality: parseFloat(quality.value),
  onFinish: ({ blob, originalFileName }) => {
    const url = URL.createObjectURL(blob);
    previewer.preview(url, toWebPFile(originalFileName));
    btn.enableDownload(url, toWebPFile(originalFileName));
    info.showInfo(blob.size);
  },
  onStart: () => previewer.start(),
  onMessage: (msg) => {
    message.showAlert(msg ?? "Something went wrong...");
    previewer.disable();
  },
});

const dragDrop = new DragDrop();
const inputCtrl = new InputCtrl();

dragDrop.onDragDrop({
  fn: (file) => converter.convert(file),
});
inputCtrl.onChange({
  fn: (file) => converter.convert(file),
});
