import StatusMessage from "../../components/StatusMessage/StatusMessage"
import styles from "./LoginPage.module.css"

function LoginPage() {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <p className={styles.label}>Login</p>
        <h2 className={styles.title}>Acceder a la aplicacion</h2>

        <form className={styles.form}>
          <label className={styles.field}>
            <span>Email</span>
            <input type="email" name="email" placeholder="tu@email.com" />
          </label>

          <label className={styles.field}>
            <span>Password</span>
            <input type="password" name="password" placeholder="******" />
          </label>

          <button className={styles.button} type="button">
            Entrar
          </button>
        </form>
      </section>
    </main>
  )
}

export default LoginPage
