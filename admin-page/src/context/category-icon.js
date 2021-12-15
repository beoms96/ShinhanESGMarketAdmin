import { storage } from "../firebase";

export function uploadCIcon(file, setFile, setUrl) {
  const ref = storage.ref(`/category/${file.name}`);
  const upload = ref.put(file);
  upload.on("state_changed", console.log, console.error, () => {
    ref.getDownloadURL().then((url) => {
      setFile(null);
      setUrl(url);
      return true;
    });
  });
}
