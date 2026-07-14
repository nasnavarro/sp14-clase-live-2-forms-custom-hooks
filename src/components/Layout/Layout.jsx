import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import styles from './Layout.module.css';

function Layout() {
  return (
    <div className={styles.shell}>
      <div className={styles.container}>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
