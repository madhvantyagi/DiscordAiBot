import { createWorker } from "tesseract.js";
const imageTotext = async (imagePath) => {
  const imageProcess = await createWorker("eng");
  const {
    data: { text },
  } = await imageProcess.recognize(imagePath);
  // return text;
  console.log(text);
  await imageProcess.terminate();
};
// imageTotext("Test.png");
export { imageTotext };
