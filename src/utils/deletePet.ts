import fs from "fs";
import path from "path";
import { PetInterface } from "../interfaces/interfacePet";
import userRepository from "../repositories/userRepository";

export const deletePet = async (id: string, userId: PetInterface[] | null) => {
  const keysToFilter = [
    "avatar",
    "photo1",
    "photo2",
    "photo3",
    "photo4",
    "userId",
  ];

  if (!userId || userId?.length === 0) {
    return await userRepository.delete(id);
  }
  console.log(userId);
  const filteredArray = userId.map((item) =>
    Object.fromEntries(
      Object.entries(item).filter(([key]) => keysToFilter.includes(key))
    )
  );

  const { avatar, photo1, photo2, photo3, photo4 } = filteredArray[0];

  const petPhotos = [avatar, photo1, photo2, photo3, photo4];

  for (const photo of petPhotos) {
    if (!photo) continue;
    const oldImagensPath = path.resolve(`.${photo}`);
    console.log(oldImagensPath);
    if (fs.existsSync(oldImagensPath)) {
      fs.unlink(oldImagensPath, (err) => {
        if (err) console.error("Error when deleting old avatar:", err);
      });
    } else {
      console.log("Old avatar file not found:", oldImagensPath);
    }
  }
  return await userRepository.delete(id);
};
