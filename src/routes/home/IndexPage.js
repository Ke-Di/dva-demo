import { connect } from "dva";
import { Button } from "antd";
import styles from "./IndexPage.css";

const IndexPage = ({ count, dispatch }) => {
  const { record, current } = count;

  const AddCount = () => {
    dispatch({ type: "count/add", payload: "some props" });
  };

  return (
    <div className={styles.normal}>
      <div className={styles.record}>Highest Record: {record}</div>
      <div className={styles.current}>{current}</div>
      <div>
        <Button className={styles.button} onClick={AddCount}>
          +
        </Button>
      </div>
      {current === 9 ? null : (
        <h1 className={styles.title}>Yay! Welcome to dva!</h1>
      )}
      {current === 7 ? null : <div className={styles.welcome} />}
      <ul className={styles.list}>
        <li>
          To get started, edit <code>src/index.js</code> and save to reload.
        </li>
        <li>
          <a href="https://github.com/dvajs/dva-docs/blob/master/v1/en-us/getting-started.md">
            Getting Started
          </a>
        </li>
      </ul>
    </div>
  );
};

IndexPage.propTypes = {};

const mapStateToProps = ({ count }) => ({ count });

export default connect(mapStateToProps)(IndexPage);
