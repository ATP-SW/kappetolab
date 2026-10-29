# Kappeto Lab

Landing con Vite y JavaScript: catálogo, consultas por Instagram y calculadora de impresión 3D de tres campos.

## Levantar con Docker

Requiere Docker con Compose. No necesitás Node instalado en tu equipo.

```sh
git clone https://github.com/ATP-SW/kappetolab.git
cd kappetolab
docker compose up -d --build
```

Abrir http://localhost:8080.

```sh
docker compose logs -f web  # Ver logs
docker compose down         # Detener
```

Para otro puerto:

```sh
PORT=3000 docker compose up -d --build
```

Después de actualizar el código, ejecutar nuevamente `docker compose up -d --build`.

El Dockerfile compila con Node 24 y sirve los archivos resultantes con Nginx. Incluye una comprobación de salud en `/health`.

## Desarrollo local con Vite

Requiere Node.js 22.12 o superior (recomendado Node 24).

```sh
npm ci
npm run dev
```

Abrir la URL que muestre Vite (por defecto http://localhost:5173). Los cambios se actualizan durante el desarrollo.

```sh
npm run build    # Genera dist/
npm run preview  # Revisa el build localmente
```

## Estructura

- `index.html`: contenido de la landing.
- `src/style.css`: estilos.
- `src/main.js`: catálogo y preparación de consultas.
- `src/calculator.js`: cálculo del precio de la tanda completa.
- `Dockerfile`, `compose.yaml`, `docker/nginx.conf`: ejecución con Docker.

La calculadora pide precio por kilo, peso total en gramos y horas (1.5 = una hora y media). Sus valores internos son Gs. 3.000/h, 10% de material extra, 40% de margen sobre venta y redondeo hacia arriba a Gs. 1.000. Se ajustan en `src/calculator.js`; están ocultos en la interfaz, pero son accesibles en el código del navegador.

Las ilustraciones del catálogo son referencias. El sitio usa fuentes de Google y abre Instagram para enviar las consultas.

## Publicar sin Docker

Compilar con `npm ci && npm run build` y publicar `dist/` en un hosting estático. En Vercel, seleccionar Vite con comando `npm run build` y directorio de salida `dist`.
