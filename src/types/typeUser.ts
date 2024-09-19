export interface UserInterface {
  id: string;
  name: string;
  email: string;
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

export interface CreateUser
  extends Omit<UserInterface, "createdAt" | "updateAt" | "id"> {}
export interface EditUser
  extends Omit<UserInterface, "createdAt" | "updateAt" | "id"> {}
export interface getInterface extends Omit<UserInterface, "password"> {}
