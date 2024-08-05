export interface UserInterface {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updateAt: Date;
}

export interface CreateUser
  extends Omit<UserInterface, "createdAt" | "updateAt" | "id"> {}
export interface EditUser
  extends Omit<UserInterface, "createdAt" | "updateAt" | "id"> {}
