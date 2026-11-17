# TillDash+ · sitio web (SEO)

Sitio público para Google, hecho con Astro (páginas estáticas). Muestra los módulos y los planes con precios en la moneda de cada país. Es la versión de TillDash+ del sitio de QuontUp360.

## Páginas

- `/` inicio: módulos, planes de Colombia, selector de país y preguntas frecuentes (JSON-LD de organización, software y FAQ).
- `/precios`: lista de países con el precio desde.
- `/precios/colombia`, `/precios/panama`, `/precios/peru`… una página por país, con sus planes, la tabla comparativa, precios en su moneda (JSON-LD `AggregateOffer` con `priceCurrency`) y enlaces `hreflang` entre países.
- `/modulos`, `/404`, `/robots.txt` y `sitemap-index.xml`.

## Datos

Al compilar se leen los planes de la API (`GET /publico/catalogo`). Lo que se cambie en la plataforma (`/plataforma` de la app) aparece en el sitio en el siguiente despliegue. Si la API no responde se usa `src/lib/fallback.json` (los planes iniciales de la migración de planes).

## Variables

| Variable | Para qué |
| --- | --- |
| `SITE_URL` | Dominio público (canónicas y sitemap). |
| `API_URL` | URL del backend de TillDash+. |
| `PUBLIC_APP_URL` | URL de la app (botón Ingresar). |
| `PUBLIC_WHATSAPP` | Número de WhatsApp comercial con indicativo, sin +. |
| `PUBLIC_CONTACT_EMAIL` | Correo comercial (si no hay WhatsApp). |

## Uso

```
npm install
npm run dev
npm run build   # genera dist/
```

En Vercel: comando `npm run build`, carpeta `dist`. Para que el sitio tome cambios de precios se puede programar un nuevo despliegue (deploy hook) cada vez que se editen los planes.

Banderas: [flag-icons](https://github.com/lipis/flag-icons) (MIT).
