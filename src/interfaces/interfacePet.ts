// src/types/index.ts
export interface ContactInterface {
  id: string;
  whatsapp: string;
  instagram?: string | null;
  tiktok?: string | null;
  facebook?: string | null;
  x?: string | null;
}

export interface PetInterface {
  id: string;
  avatar?: string | null;
  name: string;
  age: number;
  breed: string;
  sex: string;
  tutor: string;
  location: string;
  description: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  contact: ContactInterface[];
  picture: Pictures[];
}

export interface CreatePet {
  id: string;
  name: string;
  age: number;
  breed: string;
  sex: string;
  tutor: string;
  location: string;
  description: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Pictures {
  id: string;
  petId: String;
  photo1?: string | null;
  photo2?: string | null;
  photo3?: string | null;
  photo4?: string | null;
}
export interface PetAvatar {
  id: string;
  avatar: string | null;
  name: string;
  age: number;
  breed: string;
  sex: string;
  tutor: string;
  location: string;
  description: string;
  userId: string;
  createdAt: Date; // ISO Date string
  updatedAt: Date; // ISO Date string
}

export interface UpdatePet extends CreatePet {}
export interface AllPets extends CreatePet {}
export interface DeletePet extends CreatePet {}
