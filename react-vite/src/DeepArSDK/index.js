import * as deepar from "deepar";

async function loadDeepAr () {
  const previewElement = document.getElementById("ar-screen");

  let deepAR = null;

  try {
    deepAR = await deepar.initialize({
      licenseKey:"6daf2a9316acad2ec9d67358133c702c4aaccee2716170e43792704dddf7909fabdac8fe911dc529",
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
