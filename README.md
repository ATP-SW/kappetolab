# Kappeto Lab

Sitio estático de Kappeto Lab con catálogo, consultas por Instagram y calculadora de precios de impresión 3D.

## Ejecutar localmente

Desde esta carpeta:

```sh
python3 -m http.server 8080
```

Abrir http://localhost:8080.

## Archivos

- `index.html`: página, estilos e interacción del catálogo y consultas.
- `calculator.js`: calculadora de precio de la tanda completa.

La calculadora pide precio del filamento por kilo, peso total en gramos y horas de impresión (por ejemplo 1.5 para una hora y media). Los parámetros internos iniciales son Gs. 3.000/h, 10% de material extra, 40% de margen sobre la venta y redondeo hacia arriba a Gs. 1.000. Se pueden ajustar en `calculator.js`.

Los parámetros están ocultos en la interfaz, pero el código JavaScript es accesible desde el navegador. Las ilustraciones del catálogo son referencias.

## Publicación

El sitio no requiere instalación de dependencias ni compilación. Servir la carpeta raíz con un hosting estático. Para importarlo en Vercel, usar el preset Other, sin comando de build, y la carpeta raíz como directorio de salida. El despliegue se configura por separado.
