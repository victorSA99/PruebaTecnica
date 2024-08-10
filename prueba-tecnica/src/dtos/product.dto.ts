export interface CreateProductDTO {
  name: string;
  amount: string;
  price: string;
  description: string;
  picture: string;
}

export interface ProductResponseDTO {
  id: string;
  name: string;
  amount: string;
  price: string;
  description: string;
  picture: string;
  createdAt: Date;
  updatedAt: Date;
}
