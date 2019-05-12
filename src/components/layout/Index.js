import Header from "./Header";
import styles from "./Index.css";

const MainLayout = ({ children, history, location }) => {
  return (
    <div className={styles.mainLayout}>
      <Header location={location} />
      <div className={styles.mainContainer}>{children}</div>
    </div>
  );
};

export default MainLayout;
