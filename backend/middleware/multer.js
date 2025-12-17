import multer from "multer";

const storage = multer.memoryStorage();

export const singleUpload = multer({ storage }).single("file");
export const multipleUpload = multer({ storage }).any();
// export const multipleUpload = multer({ storage }).array("file", 5);
