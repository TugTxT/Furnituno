import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  CheckOutlined,
  DownOutlined,
  LeftOutlined,
  RightOutlined,
  StarFilled,
} from "@ant-design/icons";
import Slider from "react-slick";
import Tippy from "@tippyjs/react/headless";
import moment from "moment";

import ProductDetailStyle from "../../styled/ProductDetail";
import productsList from "../../data/Products";
import Rating from "../../component/util/Rating";
import infor from "../../assets/svgIcons/infor.svg";
import truck from "../../assets/svgIcons/truck.svg";
import atlanta from "../../assets/svgIcons/atlanta.svg";
import heart from "../../assets/svgIcons/heart.svg";
import ProductCard from "../../component/util/ProductCard";
import Modal from "../../component/Modal";
import { Wrapper as PopperWrapper } from "../../component/util/Popper/index";
import Sort from "../../component/Filter/Sort";
import Reviews from "../../data/Reviews";
import Review from "../../component/Review";
import Loading from "../../component/Loading";

const ProductDetail = () => {
  const [detailProduct, setDetailProduct] = useState();
  const [colorChoose, setColorChoose] = useState();
  const [sizeChoose, setSizeChoose] = useState();
  const [materialChoose, setMaterialChoose] = useState();
  const [productCard, setProductCard] = useState();
  const [visible, setVisible] = useState(false);
  const [sortReviews, setSortReviews] = useState(false);
  const [writeReview, setWriteReview] = useState(false);
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const params = useParams();

  const reviews_statistic = [
    { rating: 1, percent: 23, quantity: 13 },
    { rating: 2, percent: 12, quantity: 7 },
    { rating: 3, percent: 42, quantity: 25 },
    { rating: 4, percent: 53, quantity: 34 },
    { rating: 5, percent: 84, quantity: 56 },
  ];

  const renderChildren = () => {
    switch (key) {
      case "color":
      case "size":
      case "material":
        return (
          <div className="product-variation">
            <h2>Choose {key}</h2>
            <div className="display-options-variation">
              {key === "color"
                ? detailProduct[key].map((item) => (
                    <div
                      style={
                        colorChoose === item.name
                          ? {
                              borderColor: "#111",
                              justifyContent: "flex-start",
                            }
                          : { justifyContent: "flex-start" }
                      }
                      onClick={() => setColorChoose(item.name)}
                      className="variation-item"
                    >
                      <img alt="" src={item.image} />
                      <span style={{ marginLeft: "20px" }}>{item.name}</span>
                    </div>
                  ))
                : detailProduct[key].map((item) => (
                    <div
                      style={
                        materialChoose === item.name || sizeChoose === item.name
                          ? { borderColor: "#111" }
                          : {}
                      }
                      onClick={() =>
                        key === "size"
                          ? setSizeChoose(item.name)
                          : setMaterialChoose(item.name)
                      }
                      className="variation-item"
                    >
                      <span>{item.name}</span>
                      {item.subPrice > 0 && <span>+ $ {item.subPrice}</span>}
                    </div>
                  ))}
            </div>
          </div>
        );
      default:
        return writeReview ? (
          <Review />
        ) : (
          <div className="product-variation">
            <h2 style={{ marginTop: "4rem", marginBottom: "2.5rem" }}>
              Reviews
            </h2>
            <div className="product-reviews">
              <h1>{detailProduct?.rating}</h1>
              <div>
                <Rating value={detailProduct?.rating} />
                <span className="numOfRev">{detailProduct?.numOfReviews}</span>
              </div>
            </div>
            <button
              onClick={() => setWriteReview(true)}
              className="write-review"
            >
              Vi???t ????nh gi??
            </button>
            <div className="sort-filter-reviews">
              <h3>L???c ????nh gi??</h3>
              <div className="reviews-statistic">
                {reviews_statistic.map((item, index) => (
                  <div key={index} className="reviews-statis-item">
                    <button>
                      <span>{item.rating}</span>
                      <StarFilled />
                    </button>
                    <div className="statis-chart">
                      <div style={{ width: `${item.percent}%` }}></div>
                    </div>
                    <div className="statis-quantity">{item.quantity}</div>
                  </div>
                ))}
              </div>
              <Tippy
                interactive={true}
                visible={sortReviews}
                offset={[20, 10]}
                render={(attrs) => (
                  <div {...attrs}>
                    <PopperWrapper>
                      <Sort
                        type="S???p x???p"
                        value={[
                          "Most recent",
                          "Oldest",
                          "Highest rated",
                          "Lowest rated",
                        ]}
                      />
                    </PopperWrapper>
                  </div>
                )}
              >
                <button
                  onClick={() => setSortReviews(!sortReviews)}
                  className={`${sortReviews ? "active" : ""}`}
                >
                  <span>S???p x???p theo</span>
                  <DownOutlined />
                </button>
              </Tippy>
            </div>
            <div className="display-reviews-list">
              <div className="display-header">M???i nh???t</div>
              <div className="reviews-grid">
                {Reviews.map((item) => (
                  <div key={item.id} className="review-card">
                    <div className="review-card-author">
                      <Rating value={item.rate} />
                      <div className="review-name-time">
                        <span>{item.user_name}</span>
                        <span>-</span>
                        <span>{moment(item.created_date).format("L")}</span>
                      </div>
                    </div>
                    <div className="review-content">{item.comment}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="reviews-pagination">
              <span className="pagination-text">
                Showing {Reviews.length} of 100
              </span>
              <button className="disabled">
                <LeftOutlined />
              </button>
              <button>
                <RightOutlined />
              </button>
            </div>
          </div>
        );
    }
  };

  const handleOpenModal = (keyValue) => {
    setVisible(true);
    setKey(keyValue);
  };

  const addCartSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 2000);
  };

  useEffect(() => {
    if (params) {
      setDetailProduct(
        productsList.find((item) => item.id.toString() === params.id)
      );
    }
  }, [params]);

  useEffect(() => {
    if (detailProduct && detailProduct?.color.length > 0) {
      setColorChoose(detailProduct?.color[0].name);
      setMaterialChoose(detailProduct?.material[0].name);
      setSizeChoose(detailProduct?.size[0].name);
    }
  }, [detailProduct]);

  return (
    <ProductDetailStyle>
      <div className="product-detail-container">
        <div className="gallery-product-image">
          <div className="gallery-body">
            <img alt="" src={detailProduct?.attachment} />
            {detailProduct?.gallery.map((item, index) => (
              <img key={index} alt="" src={item} />
            ))}
          </div>
          <button className="gallery-button">
            <span>Xem th??m h??nh ???nh</span>
          </button>
        </div>
        <div className="product-detail-content">
          <div className="product-detail-information">
            <div className="product-name-desc">
              <h1>
                <span>{detailProduct?.name}</span>
                <span>{detailProduct?.description}</span>
              </h1>
            </div>
            <div className="product-price">
              <span>$</span>
              <span>{Math.floor(detailProduct?.price)}</span>
              <span>
                .
                {detailProduct?.price * 100 -
                  Math.floor(detailProduct?.price) * 100}
              </span>
            </div>
            <button onClick={() => handleOpenModal("????nh gi??")}>
              <Rating value={detailProduct?.rating} />
              <span>({detailProduct?.numOfReviews})</span>
            </button>
          </div>
          <div className="financial-service">
            <a href="/furnituno">
              Ki???m 5% ph???n th?????ng t???i Furnituno b???ng Th??? t??n d???ng Furnituno
              Visa. Chi ti???t
            </a>
          </div>
          <div className="sold-separately">
            <img alt="" src={infor} />
            <span>Kh??ng bao g???m c??c ph??? ki???n.</span>
          </div>
          <div className="picker-product-color">
            <button onClick={() => handleOpenModal("color")}>
              <span>
                <span>Ch???n m??u</span>
                <span>{colorChoose}</span>
              </span>
              <RightOutlined />
            </button>
            <div className="display-option-color">
              {detailProduct?.color.map((item, index) => (
                <img
                  style={
                    colorChoose === item.name ? { borderColor: "black" } : {}
                  }
                  key={index}
                  onClick={() => setColorChoose(item.name)}
                  alt=""
                  src={item.image}
                />
              ))}
            </div>
          </div>
          <div className="picker-product-color">
            <button onClick={() => handleOpenModal("size")}>
              <span>
                <span>Ch???n k??ch th?????c</span>
                <span>{sizeChoose}</span>
              </span>
              <RightOutlined />
            </button>
          </div>
          <div className="picker-product-color">
            <button onClick={() => handleOpenModal("material")}>
              <span>
                <span>Ch???n ch???t li??u</span>
                <span>{materialChoose}</span>
              </span>
              <RightOutlined />
            </button>
          </div>
          <div className="section-container-header">
            <h2>L??m th??? n??o ????? nh???n</h2>
            <a href="/furnituno">Change store</a>
          </div>
          <div className="item-availability-group">
            <div className="availability-item">
              <img alt="" src={truck} />
              <div>
                <div>
                  <strong>V???n chuy???n</strong>
                </div>
                <span>
                  <u>Nh???p zip code c???a b???n ????? giao h??ng</u>
                </span>
              </div>
            </div>
            <div className="availability-item">
              <img alt="" src={atlanta} />
              <div>
                <div>
                  <strong>L???y h??ng</strong>
                  <span></span>
                </div>
                <span>
                  L???y h??ng t???i <u>H?? N???i</u>
                </span>
              </div>
            </div>
            <div className="availability-item">
              <img alt="" src={atlanta} />
              <div>
                <div>
                  <strong>C???a h??ng</strong>
                  <span></span>
                </div>
                <span>
                  C??n h??ng t???i <u>H?? N???i</u>
                </span>
              </div>
            </div>
          </div>
          <div className="product-detail-button">
            <div className="add-to-bag">
              <button onClick={() => addCartSubmit()}>
                <span className="addCart-button">
                  {!loading ? (
                    !success ? (
                      "Th??m v??o gi??? h??ng"
                    ) : (
                      <>
                        <CheckOutlined />
                        Th??nh c??ng
                      </>
                    )
                  ) : (
                    <Loading width="7px" height="7px" background="#fff" />
                  )}
                </span>
              </button>
            </div>
            <button className="add-to-wishlist">
              <span>
                <img alt="" src={heart} />
              </span>
            </button>
          </div>
          <div className="total-affordability">
            <h2>L???i ??ch gia ????nh Furnituno</h2>
            <ul>
              <li>
                <CheckOutlined />
                <span>Giao h??ng chi???t kh???u cho c??c giao d???ch</span>
              </li>
              <li>
                <CheckOutlined />
                <span>Gi???m gi?? 5% t???i c???a h??ng</span>
              </li>
            </ul>
            <a href="/furnituno">T??m hi???u th??m</a>
          </div>
        </div>
      </div>
      <div className="related-product">
        <h2>Xem th??m c??c s???n ph???m</h2>
        <Slider
          ref={(c) => setProductCard(c)}
          infinite={false}
          slidesToShow={4.3}
          slidesToScroll={3}
        >
          {productsList.map((item) => (
            <ProductCard product={item} />
          ))}
        </Slider>
        <div className="btn-arrow">
          <LeftOutlined onClick={() => productCard.slickPrev()} />
          <RightOutlined onClick={() => productCard.slickNext()} />
        </div>
      </div>
      <Modal
        visible={visible}
        setVisible={setVisible}
        children={renderChildren()}
        footer={key === "????nh gi??" && writeReview}
        setWriteReview={setWriteReview}
      />
    </ProductDetailStyle>
  );
};

export default ProductDetail;
