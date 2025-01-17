export interface UserInterface {
  id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface loginInterface {
  user: {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
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
}

export interface Pictures {
  id: String;
  petId: String;
  photo1?: String;
  photo2?: String;
  photo3?: String;
  photo4?: String;
}

export interface EmailApiResponse {
  accepted: string[]; // Lista de emails aceitos
  rejected: string[]; // Lista de emails rejeitados
  ehlo: string[]; // Lista de strings representando as capacidades do servidor SMTP
  envelopeTime: number; // Tempo gasto no processamento do envelope (em milissegundos)
  messageTime: number; // Tempo gasto no envio da mensagem (em milissegundos)
  messageSize: number; // Tamanho da mensagem em bytes
  response: string; // Resposta do servidor SMTP após o envio
  envelope: {
    from: string; // Remetente do email
    to: string[]; // Lista de destinatários do email
  };
  messageId: string; // ID único da mensagem gerado pelo servidor
}

export interface ForgotPasswordApiResponse {
  id: string; // Identificador único do usuário
  name: string; // Nome do usuário
  email: string; // Endereço de e-mail do usuário
  password: string; // Senha criptografada do usuário
  isAdmin: boolean; // Indica se o usuário tem privilégios de administrador
  createdAt: Date; // Data e hora de criação do usuário (em formato ISO 8601)
  updatedAt: Date; // Data e hora da última atualização do usuário (em formato ISO 8601)
}

export interface CreateUser
  extends Omit<UserInterface, "createdAt" | "updatedAt" | "id"> {}
export interface EditUser
  extends Omit<UserInterface, "createdAt" | "updatedAt" | "id"> {}
export interface getInterface extends Omit<UserInterface, "password"> {}
