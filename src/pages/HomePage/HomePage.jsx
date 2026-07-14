import { useEffect, useState } from "react"
import { getMovies } from "../../api/movies"
import MovieGrid from "../../components/MovieGrid/MovieGrid"
import StatusMessage from "../../components/StatusMessage/StatusMessage"
import styles from "./HomePage.module.css"

function HomePage() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function loadMovies() {
      try {
        setLoading(true)
        setError("")
        const data = await getMovies()
        setMovies(data)
      } catch (fetchError) {
        setError("No se pudo cargar el catalogo.")
      } finally {
        setLoading(false)
      }
    }

    loadMovies()
  }, [])

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <p className={styles.eyebrow}>Live 2</p>
        <h2 className={styles.title}>
          Custom hooks y formularios sobre datos reales
        </h2>
        <p className={styles.copy}>
          El listado ya funciona, pero la logica de fetch se esta repitiendo y
          toca refactorizar.
        </p>
      </section>

      {loading && (
        <StatusMessage
          title="Cargando peliculas"
          description="Consultando el backend..."
        />
      )}

      {error && (
        <StatusMessage
          title="Error al cargar"
          description={error}
          variant="error"
        />
      )}

      {!loading && !error && <MovieGrid movies={movies} />}
    </main>
  )
}

export default HomePage
