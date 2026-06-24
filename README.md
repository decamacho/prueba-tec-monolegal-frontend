# Prueba Técnica Monolegal Frontend

Aplicación Single Page Application (SPA) responsiva y moderna construida con **React**, **TypeScript** y **Vite**, encargada de gestionar y visualizar el panel de recordatorios de facturación. 

Desarrollada bajo el paradigma de **Arquitectura Hexagonal (Clean Architecture en Frontend)**, asegurando que la lógica de negocio y consumo de APIs esté completamente aislada de la capa de renderizado (UI).

---

## Características de Diseño y UI

* **Mobile First:** Diseñada para ofrecer una experiencia perfecta en dispositivos móviles, escalando progresivamente a resoluciones de escritorio.
* **Diseño Limpio y Minimalista:** Enfocado en la usabilidad y la legibilidad de la información financiera.
* **Identidad Corporativa:** Uso estricto de variables CSS globales inyectadas en la raíz (`:root`) para mantener los colores de la marca (Primary: `#9ecb24`, Fondos oscuros: `#111111`).
* **Metodología BEM:** Estructuración de las clases CSS siguiendo el estándar *Block Element Modifier* combinado con TailwindCSS para un mantenimiento predecible y encapsulado de los componentes.
* **Procesos Asíncronos Robustos:** Manejo global de estados de carga, *loaders* y captura de excepciones desde un cliente HTTP centralizado para dar feedback instantáneo al usuario sin romper la interfaz.

---

## Arquitectura Hexagonal

El proyecto evita el anti-patrón de acoplar llamadas HTTP directamente dentro de los componentes de React. Está dividido en:

1.  **Capa de Dominio (`/src/domain`):** Contiene las entidades puras de TypeScript (`Client`, `InvoiceSummary`) y los contratos/interfaces (`IInvoiceRepository`). No conoce la existencia de React, DOM o la Fetch API.
2.  **Capa de Infraestructura (`/src/infrastructure`):** Implementa el cliente HTTP genérico (`httpClient.ts`) con tipado estricto y el formateo de `ApiResponse<T>`. Aquí vive la implementación concreta del repositorio `invoiceRepository.ts`.
3.  **Capa de Presentación (`/src/presentation`):** Componentes React, hooks (custom hooks) y estilos. Consume los datos invocando las abstracciones de la capa de infraestructura.

---

## Requisitos Previos

* **Node.js** (v18.0 o superior)
* **Gestor de paquetes:** `pnpm` (Este proyecto utiliza `pnpm` para instalaciones deterministas más eficientes y rápidas).
* *Tener el Backend API de Monolegal corriendo localmente o accesible mediante un túnel público.*

---

## Guía Rápida de Instalación (Quick Start)

Sigue estos pasos para correr el repositorio en tu máquina local. **Nota:** Asegúrate de no borrar ni ignorar el archivo `pnpm-lock.yaml`.

### 1. Clonar el repositorio
Clona la solución completa y ubícate en la carpeta del frontend:
```bash
git clone https://github.com/decamacho/prueba-tec-monolegal-frontend.git
cd prueba-tec-monolegal-frontend