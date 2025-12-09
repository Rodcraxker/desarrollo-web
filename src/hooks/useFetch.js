import { useState, useEffect, useCallback } from 'react';

/**
 * Hook personalizado para encapsular la lógica de fetching de datos.
 *
 * @param {string} url - URL de la API.
 * @param {object} options - Opciones para la función fetch (method, headers, body).
 * @returns {object} { data, loading, error, executeFetch }
 */
const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Función memoizada para ejecutar la petición
  const executeFetch = useCallback(async (customUrl = url, customOptions = options) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(customUrl, {
        ...customOptions,
        headers: {
          'Content-Type': 'application/json',
          ...customOptions.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      // Si la respuesta es No Content (204), retornamos un objeto vacío
      const result = (response.status === 204) ? {} : await response.json();
      
      setData(result);
      return result;

    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.message || "Ocurrió un error desconocido");
      return null;
    } finally {
      setLoading(false);
    }
  }, [url, options.method, JSON.stringify(options.headers)]);

  // Efecto para ejecutar el GET inicial al montar el componente (si no se especifica método)
  useEffect(() => {
    if (url && !options.method) {
      executeFetch();
    }
  }, [url, executeFetch, options.method]);

  return { data, loading, error, executeFetch };
};

export default useFetch;