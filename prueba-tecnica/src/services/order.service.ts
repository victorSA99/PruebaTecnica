import axiosRequest from "@/utils/axios.request";
import { OrderResponseDTO } from "../dtos/order.dto";
import { OrderItemResponseDto } from "@/dtos/order.dto";

export const createOrder = async (orderData: {
  userId: string;
  status: string;
  items: { productId: string; quantity: number; price: string }[];
}) => {
  const response = await axiosRequest.post("/order/createorder", orderData);
  return response;
};

export async function getOrderByUser(
  userId: string
): Promise<OrderResponseDTO[]> {
  return (
    await axiosRequest.get<OrderResponseDTO[]>(
      `/order/getorderbyuser/${userId}`
    )
  ).data;
}
export async function getOrderByItems(
  order: string
): Promise<OrderItemResponseDto[]> {
  return (
    await axiosRequest.get<OrderItemResponseDto[]>(
      `/order/getorderitem/${order}`
    )
  ).data;
}
