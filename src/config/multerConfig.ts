import multer from "multer";
import path from "path";
import fs from "fs";

// Função para garantir que uma pasta exista
function ensureDirectoryExists(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true }); // Cria a pasta, incluindo subpastas se necessário
  }
}

// Caminhos das pastas
const avatarPath = path.resolve("src/uploads/avatars");
const imagensPath = path.resolve("src/uploads/imagens");

// Garante que as pastas existam
ensureDirectoryExists(avatarPath);
ensureDirectoryExists(imagensPath);

// Primeira configuração de storage para avatar
export const firstStorage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, avatarPath);
  },
  filename(req, file, callback) {
    const time = new Date().getTime();
    callback(null, `${time}_${file.originalname}`);
  },
});

// Segunda configuração de storage para outras imagens
export const secondStorage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, imagensPath);
  },
  filename(req, file, callback) {
    const time = new Date().getTime();
    callback(null, `${time}_${file.originalname}`);
  },
});

// Inicializando o multer com cada storage
const uploadAvatar = multer({ storage: firstStorage });
const uploadImagens = multer({ storage: secondStorage });

export { uploadAvatar, uploadImagens };
