# Reflexión del Trabajo: Abstracción de Lógica en React con Custom Hooks

## 🚀 Objetivo de la Abstracción

El objetivo principal de esta refactorización fue mejorar la **mantenibilidad** y reducir la **duplicación de código** en la aplicación CRUD, al separar la lógica de negocio (la comunicación con la API) de la lógica de presentación (los componentes JSX). Esto se logró mediante la implementación de dos capas de **Custom Hooks**: `useFetch` y los hooks específicos para el recurso (`usePosts`, `usePostDetail`).

## 🔑 Análisis de los Custom Hooks

### 1. `useFetch.js`: El Núcleo de la Comunicación API

**Propósito:** `useFetch` actúa como una capa de bajo nivel que encapsula todos los detalles repetitivos del `fetch` nativo:
* Manejo de los tres estados fundamentales de cualquier petición: `loading`, `error`, y `data`.
* Implementación de `try/catch` para la gestión de errores.
* Retorno de una función `executeFetch` que permite ejecutar la petición de forma manual (ideal para operaciones `POST`, `PUT`, `DELETE` que no se ejecutan al cargar el componente).

**Ventajas:** Si en el futuro decidimos cambiar la librería de fetching (de `fetch` nativo a `axios`), solo tendríamos que modificar **un único archivo** (`useFetch.js`), sin tocar el resto de la aplicación.

### 2. `usePosts.js` y `usePostDetail.js`: Lógica de Recurso

**Propósito:** Estos hooks actúan como una capa de **servicios** (Service Layer) específica para el recurso `posts`. Se construyen sobre `useFetch` para exponer una interfaz simple y clara a los componentes.

* **`usePosts`:** Se encarga de la lógica de listado (GET inicial) y las funciones CRUD (`createPost`, `updatePost`, `deletePost`), haciendo que los componentes que usan formularios sean limpios.
* **`usePostDetail`:** Simplifica la obtención de un único registro basándose en un `postId`.

**Ventajas:**
* **Componentes más limpios:** Un componente como `PostDetail.jsx` ya no se preocupa por el `fetch`, los estados ni los errores; solo consume `const { post, loading, error } = usePostDetail(id);`, enfocándose únicamente en renderizar.
* **Reutilización:** Cualquier componente que necesite interactuar con la lista de posts (ej. un componente de formulario, o un botón de eliminación) puede reusar las funciones expuestas por `usePosts`, garantizando que la lógica de la API sea consistente en toda la aplicación.

## ✨ Conclusión

La implementación de esta estructura de hooks ha logrado una abstracción efectiva. Hemos pasado de tener lógica de *data-fetching* esparcida por varios componentes a un modelo centralizado, lo que facilita el mantenimiento, las pruebas y la escalabilidad del código a medida que la aplicación crezca.