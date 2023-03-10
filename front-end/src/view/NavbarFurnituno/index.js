import React, { useState } from "react";
import NavbarFurnitunoStyle from "../../styled/NavbarFurnituno";
import truck from "../../assets/svgIcons/truck.svg";
import shopping_bag from "../../assets/svgIcons/shopping_bag.svg";
import heart from "../../assets/svgIcons/heart.svg";
import zip_code from "../../assets/svgIcons/zip-code.svg";
import atlanta from "../../assets/svgIcons/atlanta.svg";
import logo from "../../assets/images/logo.png";

import {
  CameraOutlined,
  CloseOutlined,
  GlobalOutlined,
  MenuOutlined,
  RightOutlined,
  SearchOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const NavbarFurnituno = () => {
  const [appear, setAppear] = useState(false);

  const [navbar, setNavbar] = useState("");

  const [sliderBar, setSliderBar] = useState(false);

  const [y, setY] = useState(window.scrollY);

  const appearNavbar = (e) => {
    if (window.scrollY > 500) {
      const window = e.currentTarget;
      if (y > window.scrollY) {
        setNavbar("active");
      } else if (y < window.scrollY) {
        if (navbar) {
          setNavbar("hide");
        }
      }
      setY(window.scrollY);
    } else {
      setNavbar("");
    }
  };

  window.addEventListener("scroll", (e) => appearNavbar(e));

  return (
    <NavbarFurnitunoStyle>
      <div className="menu-hambuger-container">
        <div className="menu-hambuger-inner">
          <div className="menu-hambuger">
            <span>
              <MenuOutlined onClick={() => setAppear(true)} />
            </span>
            <span>Menu</span>
          </div>
        </div>
      </div>

      <header
        className={`${
          window.scrollY > 500
            ? navbar === "active"
              ? "active"
              : navbar === "hide"
              ? "hide"
              : ""
            : ""
        }`}
      >
        <div className="header-container">
          <div className="header-container-inner">
            <div className="header-container-main">
              <div className="header-logo">
                <a href="/furnituno">
                  <img alt="" src={logo} />
                </a>
              </div>
              <div className="header-search">
                <div className="search-field">
                  <span style={{ left: "30px" }}>
                    <SearchOutlined />
                  </span>
                  <input placeholder="B???n ??ang c???n t??m g???" />
                  <span style={{ right: "40px" }}>
                    <CameraOutlined />
                  </span>
                </div>
              </div>
              <ul className="header-icons">
                <li onClick={() => setSliderBar(true)}>
                  <span>
                    <UserOutlined />
                  </span>
                  <span>????ng nh???p ho???c ????ng k??</span>
                </li>
                <li>
                  <span>
                    <img alt="" src={truck} />
                  </span>
                </li>
                <li>
                  <a href="/furnituno/wish-list">
                    <span>
                      <img alt="" src={heart} />
                    </span>
                  </a>
                </li>
                <li>
                  <a href="/furnituno/cart">
                    <span>
                      <img alt="" src={shopping_bag} />
                      <span>0</span>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <div className="navbar">
        <nav>
          <ul className="nav-list">
            <li>
              <a href="/furnituno/all-products">S???n ph???m</a>
            </li>
            <li>
              <a href="/">V???t d???ng trong nh??</a>
            </li>
            <li>
              <a href="/">Ph??ng</a>
            </li>
            <li>
              <a href="/">Thi???t k???</a>
            </li>
            <li>
              <a href="/">Giao d???ch</a>
            </li>
          </ul>
          <div className="navigation-container">
            <div className="nav-item">
              <img alt="" src={atlanta} />
              <span>Vi???t Nam</span>
            </div>
            <div className="nav-item">
              <img alt="" src={zip_code} />
              <span>Nh???p m?? ZIP </span>
            </div>
          </div>
        </nav>
      </div>

      <div
        onClick={() => {
          setAppear(false);
          setSliderBar(false);
        }}
        className={`sidebar-layer ${appear || sliderBar ? "appear" : ""}`}
      ></div>
      <aside className={`${appear ? "appear" : ""}`}>
        <div className="sidebar-top">
          <span>
            <CloseOutlined onClick={() => setAppear(false)} />
          </span>
          <div className="sidebar-logo">
            <a href="/furnituno">
              <img
                style={{ width: "170px", height: "80px" }}
                alt=""
                src={logo}
              />
            </a>
          </div>
        </div>
        <div className="sidebar-body">
          <nav>
            <ul>
              {[
                "S???n ph???m",
                "V???t d???ng trong nh??",
                "Ph??ng",
                "Thi???t k???",
                "Giao d???ch",
              ].map((item, index) => (
                <li key={index}>
                  <a href={`/furnituno/${item}`}>{item}</a>
                </li>
              ))}
            </ul>
            <ul>
              {["Th??ng tin m???i", "?? t?????ng", "Qu?? t???ng", "C???ng ?????ng"].map(
                (item, index) => (
                  <li key={index}>
                    <a href={`/furnituno/${item}`}>{item}</a>
                  </li>
                )
              )}
            </ul>
            <ul>
              <li>
                <Link to={"/acount-infor"}>H??? s??</Link>
              </li>
              {[
                // "H??? s??",
                "????n h??ng",
                "V??? tr?? c???a h??ng",
                "D???ch v??? kh??ch h??ng",
              ].map((item, index) => (
                <li key={index}>
                  <a href={`/furnituno/${item}`}>{item}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="side-button">
          <a href="/furnituno">
            <GlobalOutlined />
            <span>Qu???c gia</span>
          </a>
        </div>
      </aside>

      <div
        style={{
          transform: `${sliderBar ? "translate(0px)" : "translate(480px)"}`,
        }}
        className="function-slider"
      >
        <section className="slider-header">
          <CloseOutlined onClick={() => setSliderBar(false)} />
          <div className="header-content">
            <h2>Hola</h2>
            <a href="/login">
              <span>????ng nh???p</span>
            </a>
          </div>
          <div className="header-link">
            <a href="/register">
              <span>T???o t??i kho???n Furnituno</span>
              <RightOutlined />
            </a>
          </div>
        </section>
        <section className="slider-body">
          <ul>
            {[
              "Thi???t k??? c???a t??i",
              "L???ch s??? mua h??ng",
              "Danh s??ch mua s???m",
              "K??? ho???ch",
              "Theo d??i ????n h??ng",
            ].map((item, index) => (
              <li key={index}>
                <a href={`/ikea/${item}`}>{item}</a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </NavbarFurnitunoStyle>
  );
};

export default NavbarFurnituno;
