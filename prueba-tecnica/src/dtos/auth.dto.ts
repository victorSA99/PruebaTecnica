export interface LoginUserDTO {
  email: string;
  passwordL: string;
}

export interface LoginResponseDTO {
  token: string;
  user: User;
}

export interface User {
  id: string;
  name: string;
  lastname: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  rol: string;
}
