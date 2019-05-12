import { Link } from "dva/router";
import { Menu, Dropdown, Icon, Affix } from "antd";

import styles from "./Index.css";

const UserOption = (
  <Menu>
    <Menu.Item key="menu4">
      <Link to="/">菜单4</Link>
    </Menu.Item>
    <Menu.Item key="menu5">
      <span>菜单5</span>
    </Menu.Item>
  </Menu>
);

const Header = ({ location }) => {
  const PathName = location.pathname.split("/");

  return (
    <Affix>
      <div className={styles.headerWhite}>
        <div className={styles.headerLeft}>
          <div className={styles.logoImage}>
            <Icon type="fullscreen-exit" />
          </div>
          <span className={styles.headerTitle}>Dva Demo</span>
        </div>
        <div>
          <Menu selectedKeys={[PathName[1]]} mode="horizontal">
            <Menu.Item key="home">
              <Link to="/home">
                <Icon className={styles.menuIcon} type="home" />
                主页
              </Link>
            </Menu.Item>
            <Menu.Item key="table">
              <Link to="/table">
                <Icon className={styles.menuIcon} type="table" />
                列表
              </Link>
            </Menu.Item>
            <Menu.Item key="menu3">
              <Link to="">菜单3</Link>
            </Menu.Item>
          </Menu>
        </div>
        <div className={styles.headerRight}>
          <Dropdown overlay={UserOption}>
            <div>
              <Icon className={styles.menuIcon} type="user" />
              <span className={styles.userName}>欢迎您！</span>
              <Icon className={styles.menuIcon} type="down" />
            </div>
          </Dropdown>
        </div>
      </div>
    </Affix>
  );
};

export default Header;
