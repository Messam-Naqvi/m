const CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

// Uploads a PDF straight from the browser using Cloudinary's unsigned upload
// flow — no backend needed, same trade-off Firebase Storage would have given
// us, but Cloudinary's free tier (25GB storage + bandwidth/month) doesn't
// require a paid plan. The upload preset must be configured as "Unsigned" in
// the Cloudinary console; that's what makes a client-side API key unnecessary
// (there is no secret here to protect).
export function uploadPdf(file, onProgress) {
  return new Promise((resolve, reject) => {
    if (!CLOUD_NAME || !UPLOAD_PRESET) {
      reject(new Error("Cloudinary isn't configured (missing REACT_APP_CLOUDINARY_* env vars)."));
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/raw/upload`);

    xhr.upload.onprogress = (e) => {
      if (onProgress && e.lengthComputable) onProgress((e.loaded / e.total) * 100);
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        const data = JSON.parse(xhr.responseText);
        resolve({
          url: data.secure_url,
          fileName: file.name,
          fileSizeBytes: file.size,
          contentType: file.type,
        });
      } else {
        reject(new Error("Upload failed."));
      }
    };
    xhr.onerror = () => reject(new Error("Upload failed."));
    xhr.send(formData);
  });
}
