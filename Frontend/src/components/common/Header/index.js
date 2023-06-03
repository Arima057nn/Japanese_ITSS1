import classNames from "classnames/bind";
import styles from "./Header.module.scss";

const cx = classNames.bind(styles);

function Header() {
  return (
    <>
      <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
      </head>
      <div className={cx("wrapper")}>
        <nav>
          <h1 className={cx("logo_vlearn")}>VLEARN</h1>
          <i className={cx("fa fa-bell")}></i>
          <a href="/home" className={cx("header_img")}>
            <img src="https://d1hjkbq40fs2x4.cloudfront.net/2017-08-21/files/landscape-photography_1645.jpg"
              alt="avatar" className={cx("header_avatar")}/>
          </a>
          <span className={cx("header-chevron-down")}><i className={cx("fa fa-chevron-down")}></i></span>
        </nav>
      </div>
    </>
  );
}
export default Header;
