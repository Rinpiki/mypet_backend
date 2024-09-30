export interface UserInterface {
  id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
  password: string;
  createdAt: Date;
  updateAt: Date;
}

export interface loginInterface {
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updateAt: Date;
  };
  token: string;
}

export interface ProfileUser {
  user: {
    name: string;
    email: string;
  };
  pets: Pet[];
}

interface Pet {
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
  updateAt: Date;
}

export interface CreateUser
  extends Omit<UserInterface, "createdAt" | "updateAt" | "id"> {}
export interface EditUser
  extends Omit<UserInterface, "createdAt" | "updateAt" | "id"> {}
export interface getInterface extends Omit<UserInterface, "password"> {}
