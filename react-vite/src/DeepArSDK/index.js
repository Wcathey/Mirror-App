import * as deepar from "deepar";

async function loadDeepAr () {
  const previewElement = document.getElementById("ar-screen");

  let deepAR = null;

  try {
    deepAR = await deepar.initialize({
      licenseKey:"16246bf4acafadf74cb16bf63a8f3ce7c71e4602bbc200f4ebf5863c12f603ebc9e260c61927603b",
      previewElement: previewElement,
      additionalOptions: {
        cameraConfig: {
          disableDefaultCamera: true
        }
      }

    });
  }
  catch (error) {
    console.error(error);
    return;
  }

  return deepAR;
}

export default loadDeepAr;
