import axiosRequest from "@/utils/axios.request";
import { LoginUserDTO, LoginResponseDTO } from "../dtos/auth.dto";

export async function login(
  credentials: Partial<LoginUserDTO>
): Promise<LoginResponseDTO> {
  return (await axiosRequest.post<LoginResponseDTO>("/login", credentials))
    .data;
}
