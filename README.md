# Sprint 14 · Live 2 — Custom Hooks, Formularios Controlados y Navegación

> **Objetivo de la Clase**
> Reutilizar lógica con custom hooks, construir formularios controlados, gestionar correctamente `onSubmit` y `preventDefault`, y usar `useRef` y `useNavigate` en una SPA real.

---

## Estructura de archivos

```bash
src/
├── hooks/                # NUEVA CARPETA: Centraliza la lógica de datos
│   ├── useMovies.js      # Extrae la lógica de HomePage
│   ├── useMovie.js       # Extrae la lógica de MovieDetailPage
│   └── useReviews.js     # Extrae la lógica de las reseñas
├── components/
│   └── ReviewList/       # Usará useReviews
└── pages/
    ├── HomePage/
    ├── MovieDetailPage/
    ├── LoginPage/        #  Formulario controlado + useRef + useNavigate
    └── RegisterPage/     #  Formulario controlado reutilizando patrones

```

---

## Bloque 1 · Custom Hooks (Reutilización de Lógica)

### ¿Por qué los necesitamos?

Un custom hook (hook personalizado) es una función de JavaScript en React cuyo nombre comienza con la palabra `use` y que permite extraer y reutilizar lógica de estado entre diferentes componentes. Esto evita la repetición de código y mantiene tus componentes limpios y enfocados únicamente en la interfaz visual.

Si revisamos `HomePage.jsx`, `MovieDetailPage.jsx` y `ReviewList.jsx`, los tres repiten idéntica estructura: tres `useState` (`data`, `loading`, `error`) y un `useEffect` con un bloque `try/catch/finally`.

> ⚠️ **Regla de oro:** Los componentes deben encargarse de pintar la UI. La lógica de peticiones e internet debe vivir fuera. Los Custom Hooks reutilizan **lógica**, no interfaz; devuelven datos puros, no JSX.

```txt
Componente (Solo UI) <── [Datos, Loading, Error] ── Custom Hook (Peticiones)

```

### Ejemplo de la Transformación (`src/hooks/useMovies.js`)

Encapsulamos todo el estado de carga y obtención de datos en una función pura cuyo nombre **debe** empezar estrictamente con la palabra `use`:

```javascript
import { useState, useEffect } from "react"
import { getMovies } from "../api/movies"

export function useMovies() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const data = await getMovies()
        setMovies(data)
      } catch (err) {
        setError("No se pudo cargar el catálogo.")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return { movies, loading, error } // Devolvemos un objeto con los estados limpios
}
```

### El resultado en tu página (`HomePage.jsx`)

Tu componente pasa de tener 25 líneas confusas a una sola declaración limpia:

```jsx
function HomePage() {
  const { movies, loading, error } = useMovies()

  return (
    <main>
      {loading && <p>Cargando catálogo...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && <MovieGrid movies={movies} />}
    </main>
  )
}
```

---

## Bloque 2 y 3 · Formularios Controlados y Eventos

En las aplicaciones tradicionales, el DOM guarda lo que escribe el usuario. En React, aplicamos el patrón de **Inputs Controlados**: el estado de React es la **única fuente de verdad**. Cada letra pulsada actualiza el estado, y el input simplemente muestra ese estado.

### El secreto del `handleChange` Genérico

No crees una función por cada cuadro de texto (`handleEmailChange`, `handlePasswordChange`...). Usa los corchetes mágicos de JavaScript para actualizar propiedades dinámicamente según el atributo `name` del HTML:

```javascript
function handleChange(event) {
  const { name, value } = event.target // Extrae qué input cambió y qué escribió

  setFormData((prev) => ({
    ...prev, // Copia los campos que ya estaban escritos
    [name]: value, // [name] evalúa dinámicamente si es 'email', 'password', etc.
  }))
}
```

### `onSubmit` vs `onClick` e Importancia de `preventDefault`

- **Nunca** uses un `onClick` en el botón de enviar. El estándar de la web exige colocar el evento `onSubmit` directamente en la etiqueta `<form>` y configurar el botón como `type="submit"`. Esto permite que los usuarios envíen el formulario simplemente pulsando la tecla **Enter**.

- **`event.preventDefault()`** es la primera línea obligatoria de tu envío. Si la olvidas, el navegador intentará recargar la página por defecto, destruyendo por completo todos los estados de React y rompiendo la SPA.

```jsx
<form onSubmit={handleSubmit}>
  <input name="email" value={formData.email} onChange={handleChange} />
  <button type="submit">Entrar</button>
</form>
```

---

## Bloque 4 · Superpoderes del DOM: `useRef` y `useNavigate`

### `useRef` para Enfoque Automático

Cuando guardas datos en un `useState`, el componente se vuelve a pintar entero (re-render). Si solo necesitas apuntar a un elemento real del DOM del navegador sin redibujar nada, usa un **Ref**. Lo usaremos hoy para poner el foco del teclado de forma automática en el primer input al cargar la página:

```javascript
const emailInputRef = useRef(null)

useEffect(() => {
  emailInputRef.current?.focus() // Pone el cursor parpadeando aquí directamente
}, [])

// En tu JSX:
<input ref={emailInputRef} name="email" type="email" />
```

### `useNavigate` para Envíos Exitosos

Una vez que el backend responde que el usuario o la contraseña son correctos, no queremos que hagan clic en un enlace tradicional. Queremos redirigirlos por código.

```javascript
const navigate = useNavigate()

const handleSubmit = async (e) => {
  e.preventDefault()
  await loginUser(formData)
  navigate("/") //  Redirección automática a la página principal
}
```

---

## Tabla de Resolución de Errores Comunes

| Síntoma / Error                                                          | Causa Probable                                                                                 | Solución                                                                                         |
| ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **Escribo en el cuadro de texto pero no aparece ninguna letra.**         | Vinculaste el `value={formData.x}` pero olvidaste asignar el método `onChange={handleChange}`. | Añade la propiedad `onChange` llamando a tu función manejadora.                                  |
| **El formulario solo actualiza el último campo y borra los anteriores.** | Te olvidaste de aplicar el _spread operator_ `...prev` dentro del setter del estado.           | Asegúrate de retornar `({ ...prev, [name]: value })` para conservar la memoria del formulario.   |
| **Al pulsar Enter o el botón, la pantalla parpadea en blanco.**          | Te has saltado la invocación de `event.preventDefault()` en la función de envío.               | Añádelo estrictamente al inicio de tu función `handleSubmit(event)`.                             |
| **`React Hook "useMovies" cannot be called inside a callback...`**       | Intentaste llamar a un Custom Hook dentro de un `if`, un bucle `for` o una función secundaria. | Los hooks se declaran **siempre** en la raíz superior del componente, antes de cualquier lógica. |

---

## Prompt para Consultas de Estudiantes con IA

Si quieres validar la arquitectura de tus componentes, pásale este prompt analítico a tu modelo de IA:

```txt
Estoy refactorizando mi aplicación React para extraer la lógica asíncrona hacia Custom Hooks y controlar los campos mediante formularios controlados.
Analiza el fragmento de código que te adjunto abajo y verifica si rompe alguna de las reglas de los hooks o si el evento de envío pone en riesgo la persistencia del estado en la SPA. Explícame el concepto teórico antes de sugerir cualquier corrección.

[PEGA TU COMPONENTE AQUÍ]

```

---
