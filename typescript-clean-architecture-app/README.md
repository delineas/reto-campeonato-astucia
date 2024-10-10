# TypeScript Clean Architecture

Este proyecto implementa una aplicación en TypeScript utilizando la arquitectura limpia (Clean Architecture).

WIP: Solo es un scaffold

## Estructura del proyecto

El proyecto tiene la siguiente estructura de archivos:

```
typescript-clean-architecture-app
├── src
│   ├── domain
│   │   ├── entities
│   │   │   ├── Product.ts
│   │   │   └── PriceLog.ts
│   │   └── repositories
│   │       ├── ProductRepository.ts
│   │       └── PriceLogRepository.ts
│   ├── application
│   │   └── usecases
│   │       ├── SelectProductUseCase.ts
│   │       ├── MonitorPriceUseCase.ts
│   │       ├── PersistPriceChangeUseCase.ts
│   │       └── SendNotificationUseCase.ts
│   ├── infrastructure
│   │   ├── services
│   │   │   └── AmazonScraperService.ts
│   │   └── repositories
│   │       ├── ProductRepositoryImpl.ts
│   │       └── PriceLogRepositoryImpl.ts
│   ├── interfaces
│   │   ├── controllers
│   │   │   ├── ProductController.ts
│   │   │   ├── PriceMonitorController.ts
│   │   │   └── PriceHistoryController.ts
│   │   └── gateways
│   │       ├── PriceMonitorService.ts
│   │       └── NotificationService.ts
│   ├── config
│   │   └── expressServer.ts
│   └── utils
│       └── utils.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Descripción del proyecto

El proyecto sigue los principios de la arquitectura limpia para separar las responsabilidades y facilitar el mantenimiento y la escalabilidad. A continuación se muestra una descripción de cada capa del proyecto:

- **Domain**: Contiene las entidades de dominio, como `Product` y `PriceLog`, que representan los conceptos fundamentales del negocio.

- **Application**: Contiene los casos de uso de la aplicación, como `SelectProductUseCase` y `MonitorPriceUseCase`, que implementan la lógica de negocio y coordinan las operaciones entre las entidades y los repositorios.

- **Infrastructure**: Contiene las implementaciones concretas de los servicios y repositorios definidos en las capas superiores. Por ejemplo, `AmazonScraperService` implementa la lógica para obtener el precio de un producto desde Amazon.

- **Interfaces**: Contiene los controladores de la interfaz de usuario, como `ProductController` y `PriceMonitorController`, que manejan las solicitudes HTTP y coordinan la ejecución de los casos de uso correspondientes.

- **Config**: Contiene la configuración del servidor Express en `expressServer.ts`, que define las rutas y los controladores para las solicitudes relacionadas con los productos y el monitoreo de precios.

- **Utils**: Contiene funciones de utilidad, como `generateId`, que generan identificadores únicos para los objetos.

## Configuración del proyecto

El archivo `package.json` contiene las dependencias y los scripts del proyecto. Puedes instalar las dependencias ejecutando el siguiente comando:

```
npm install
```

El archivo `tsconfig.json` especifica las opciones del compilador de TypeScript y los archivos a incluir en la compilación.

## Ejecución del proyecto

Puedes ejecutar el proyecto utilizando el siguiente comando:

```
npm start
```

Esto iniciará el servidor Express en el puerto 3000. Puedes acceder a la aplicación a través de `http://localhost:3000`.

## Documentación adicional

Para obtener más información sobre la arquitectura limpia y cómo se implementa en este proyecto, consulta la documentación en los archivos fuente y los comentarios del código.

```

Este es el contenido del archivo `README.md` para el proyecto TypeScript Clean Architecture.