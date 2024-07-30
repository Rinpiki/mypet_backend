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
  name: string;
  age: number;
  breed: string;
  sex: string;
  tutor: string;
  location: string;
  description: string;
  userId: string;
  contact: ContactInterface[];
}
