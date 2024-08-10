import axiosRequest from "@/utils/axios.request";
import { ProductResponseDTO, CreateProductDTO } from "../dtos/product.dto";

export const createProduct = async (
  createProduct: CreateProductDTO
): Promise<ProductResponseDTO> => {
  return (
    await axiosRequest.post<ProductResponseDTO>(
      "/products/createproduct",
      createProduct
    )
  ).data;
};

export const updateProduct = async (
  id: string,
  updateProduct: CreateProductDTO
) => {
  const response = await axiosRequest.patch<ProductResponseDTO>(
    `/products/editproduct/${id}`,
    updateProduct
  );
  return response;
};

export async function getProducts(): Promise<ProductResponseDTO[]> {
  return (await axiosRequest.get<ProductResponseDTO[]>("/products/getproducts"))
    .data;
}

export async function getProductById(
  productId: string
): Promise<ProductResponseDTO> {
  return (
    await axiosRequest.get<ProductResponseDTO>(
      `/products/getproductbyid/${productId}`
    )
  ).data;
}
export async function deleteProduct(
  productId: string
): Promise<ProductResponseDTO> {
  return (
    await axiosRequest.delete<any>(`/products/deleteproduct/${productId}`)
  ).data;
}
