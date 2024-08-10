export interface OrderCreateDTO {
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface OrderResponseDTO {
  id: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface OrderItemResponseDto {
  productId: string;
  quantity: number;
  price: string;
  product: {
    id: string;
    name: string;
    price: string;
    picture: string;
  };
}
