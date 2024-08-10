Tener una version de node 20.10.0, la base de datos es remota asi que no debe de haber problema con la conexion, las credenciales de conexion se encuentran en el .env del backend

# Backend
## Instalacion de dependcias

```bash
npm i
```

## Seeders
Para alimnetar la base de datos con usuarios, productos y ordenes debemos de ejecutar el siguiente comando

```bash
npm run db:importar
```

Para eliminar los datos de las tablas ejecutamos el siguiente comando

```bash
npm run db:eliminar
```

## Ejecutar proyecto

```bash
npm run dev
```

El usuario admin tiene la misma interfaz que el usuasrio cliente a diferencia que tiene una opcion para agregar, editar y eliminar productos, la ruta esta protegida con roles y autenticacion JWT

---
# Frontend
El proyecto esta creado con react TS y tailwind todos los datos estan tipados en caso que se requiera saber que informacion se manda en cada componente o en lo servicios

## instalacion de depencias
```bash
npm i
```

## Ejecutar proyecto

```bash
npm run dev
```


## Usuarios

Usuario Cliente: prueba1@hotmail.com
Contraseña: 123456

Usuario Admin: prueba2@hotmail.com
Contraseña: 123456


> [!TIP]
> [Postman Documentacion de endpoints](https://documenter.getpostman.com/view/37508003/2sA3s3Gr3c)



