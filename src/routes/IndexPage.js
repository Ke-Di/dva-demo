import React from "react";
import { connect } from "dva";
import styles from "./IndexPage.css";

const IndexPage = ({ count, dispatch }) => {
  return (
    <div className={styles.normal}>
      <div className={styles.record}>Highest Record: {count.record}</div>
      <div className={styles.current}>{count.current}</div>
      <div>
        <button
          className={styles.button}
          onClick={() => {
            dispatch({ type: "count/add", payload: "some props" });
          }}
        >
          +
        </button>
      </div>
      {count.current === 4 ? null : (
        <h1 className={styles.title}>Yay! Welcome to dva!</h1>
      )}
      {count.current === 2 ? null : <div className={styles.welcome} />}
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

const mapStateToProps = state => {
  return { count: state.count };
};

export default connect(mapStateToProps)(IndexPage);
