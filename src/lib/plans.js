// Planes y precios por país: se leen de la API al compilar (GET /publico/catalogo),
// así el sitio muestra lo mismo que la plataforma. Si la API no responde se usa fallback.json.
import fallback from './fallback.json'

const API = (process.env.API_URL || 'https://till-dash-backend.onrender.com').replace(/\/$/, '')
let cache = null

export const getCatalog = async () => {
  if (cache) return cache
  try {
    const res = await fetch(`${API}/publico/catalogo`, { signal: AbortSignal.timeout(60000) })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    cache = await res.json()
  } catch (e) {
    console.warn(`[planes] No se pudieron leer de ${API} (${e.message}); se usan los datos de respaldo.`)
    cache = fallback
  }
  return cache
}

// Rutas amigables por país: /precios/colombia, /precios/panama…
export const SLUGS = { CO: 'colombia', PA: 'panama', VE: 'venezuela', EC: 'ecuador', PE: 'peru', BO: 'bolivia', BR: 'brasil', PY: 'paraguay', CL: 'chile', AR: 'argentina', UY: 'uruguay' }
export const slugOf = (code) => SLUGS[code] || code.toLowerCase()

const NO_CENTS = new Set(['COP', 'CLP', 'PYG', 'ARS'])
export const money = (value, country) => {
  const n = Number(value) || 0
  const dec = NO_CENTS.has(country.currency) || Number.isInteger(n) ? 0 : 2
  try {
    return new Intl.NumberFormat(country.locale, { style: 'currency', currency: country.currency, currencyDisplay: 'narrowSymbol', minimumFractionDigits: dec, maximumFractionDigits: dec }).format(n)
  } catch { return `${country.currency} ${n}` }
}
export const limitText = (v) => (v === null || v === undefined ? 'Ilimitado' : Number(v).toLocaleString('es-CO'))
export const GROUPS = { operacion: 'Operación', catalogo: 'Catálogo', clientes: 'Clientes', control: 'Control', marca: 'Marca' }
export const LIMIT_ROWS = [['sites', 'Sucursales'], ['admins', 'Administradores'], ['employees', 'Empleados'], ['tables', 'Mesas'], ['products', 'Productos']]
