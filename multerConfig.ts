import multer from "multer";
import path from "path";

// Primeira configuração de storage para avatar
export const firstStorage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, path.resolve("uploads/avatar"));
  },
  filename(req, file, callback) {
    const time = new Date().getTime();
    callback(null, `${time}_${file.originalname}`);
  },
});

// Segunda configuração de storage para outras imagens
export const secondStorage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, path.resolve("uploads/pics"));
  },
  filename(req, file, callback) {
    const time = new Date().getTime();
    callback(null, `${time}_${file.originalname}`);
  },
});

// Inicializando o multer com cada storage
const uploadAvatar = multer({ storage: firstStorage });
const uploadPics = multer({ storage: secondStorage });

export { uploadAvatar, uploadPics };
