// pages/Login/Login.tsx
import React, { useState } from "react";
import { useAuth } from "../../components/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const passwordRegex =
  /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

const formSchema = z.object({
  email: z.string().email({ message: "Correo Inválido" }),
  passwordL: z.string({
    message:
      "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número o un carácter especial",
  }),
});

type FormValues = z.infer<typeof formSchema>;

const Login: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    setError(null);
    try {
      await login(data.email, data.passwordL);
      navigate("/home");
    } catch (error) {
      setError("Error al iniciar sesión. Verifica tus credenciales.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-6">
        <h2 className="text-3xl font-bold text-center">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-[400px]">
          <div className="space-y-3">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <Input
              type="email"
              id="email"
              {...register("email")}
              placeholder="Ingrese su email"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
          <div className="space-y-3">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña:
            </label>
            <Input
              type="password"
              id="password"
              {...register("passwordL")}
              placeholder="Ingrese su contraseña"
              className="w-full p-3 border border-gray-300 rounded-md"
            />
            {errors.passwordL && (
              <p className="text-red-500 text-sm">{errors.passwordL.message}</p>
            )}
          </div>
          {error && <Alert className="mt-4">{error}</Alert>}
          <Button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-md"
          >
            Iniciar Sesión
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
