import StatusMessage from "../../components/StatusMessage/StatusMessage"
import styles from "./RegisterPage.module.css"

function RegisterPage() {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <p className={styles.label}>Register</p>
        <h2 className={styles.title}>Crear una cuenta</h2>

        <form className={styles.form}>
          <label className={styles.field}>
            <span>Nombre</span>
            <input type="text" name="name" placeholder="Ada Lovelace" />
          </label>

          <label className={styles.field}>
            <span>Email</span>
            <input type="email" name="email" placeholder="ada@email.com" />
          </label>

          <label className={styles.field}>
            <span>Password</span>
            <input type="password" name="password" placeholder="******" />
          </label>

          <button className={styles.button} type="button">
            Registrarme
          </button>
        </form>
      </section>
    </main>
  )
}

export default RegisterPage
