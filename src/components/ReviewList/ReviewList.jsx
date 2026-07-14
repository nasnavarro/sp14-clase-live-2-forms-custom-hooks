import styles from "./ReviewList.module.css"

function ReviewList({ movieId }) {
  return (
    <section className={styles.section}>
      <h3 className={styles.title}>Reviews</h3>
      <div className={styles.list}>Aquí aparecerán las reviews</div>
    </section>
  )
}

export default ReviewList
