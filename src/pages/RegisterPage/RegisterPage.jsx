import { useState } from "react"
import { useNavigate } from "react-router-dom"
import StatusMessage from "../../components/StatusMessage/StatusMessage"
import styles from "./RegisterPage.module.css"
import { registerUser } from "../../api/auth"

function RegisterPage() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError("")

    if (!formData.name || !formData.email || !formData.password) {
      setError("Completa todos los campos antes de continuar")
      return
    }

    try {
      setIsSubmitting(true)
      await registerUser(formData)
      navigate("/login")
    } catch (submitError) {
      setError("No se pudo completar el registro")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <p className={styles.label}>Register</p>
        <h2 className={styles.title}>Crear una cuenta</h2>

        {error && (
          <StatusMessage
            title="Error en el formulario"
            description={error}
            variant="error"
          />
        )}

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className={styles.field}>
            <span>Nombre</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Ada Lovelace"
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </label>

          <label className={styles.field}>
            <span>Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="ada@email.com"
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </label>

          <label className={styles.field}>
            <span>Password</span>
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="******"
              onChange={handleChange}
              disabled={isSubmitting}
            />
          </label>

          <button className={styles.button} type="submit">
            {isSubmitting ? "Cargando..." : "Registrarme"}
          </button>
        </form>
      </section>
    </main>
  )
}

export default RegisterPage
