import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactOwlCarousel from "react-owl-carousel";
import Skeleton from "../UI/Skeleton";
import Newitem from "./Newitem";
import AOS from 'aos'
import 'aos/dist/aos.css';

const NewItems = () => {
  const [newItems, setNewItems] = useState([]);

  async function getNewItems() {
    const { data } = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
    );
    setNewItems(data);
  }

  useEffect(() => {
    AOS.init()
    getNewItems();
  }, []);

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2
                data-aos="fade"
                data-aos-duration="1000"
                data-aos-once="true"
                data-aos-anchor-placement="top-bottom"
              >
                New Items
              </h2>
              <div
                data-aos="fade"
                data-aos-duration="1000"
                data-aos-once="true"
                data-aos-anchor-placement="top-bottom"
                className="small-border bg-color-2"
              ></div>
            </div>
          </div>
          {/* className="col-lg-3 col-md-6 col-sm-6 col-xs-12" */}
          {newItems.length ? (
            <ReactOwlCarousel
              data-aos="fade"
              data-aos-duration="1000"
              data-aos-once="true"
              data-aos-anchor-placement="top-bottom"
              nav={true}
              margin={10}
              loop
              responsive={{
                0: {
                  items: 1,
                },
                768: {
                  items: 2,
                },
                1000: {
                  items: 3,
                },
                1200: {
                  items: 4,
                },
              }}
            >
              {newItems.map((items) => (
                <Newitem items={items} key={items.id} />
              ))}
            </ReactOwlCarousel>
          ) : (
            <>
              <ReactOwlCarousel
                data-aos="fade"
                data-aos-duration="1000"
                data-aos-once="true"
                data-aos-anchor-placement="top-bottom"
                nav={true}
                margin={10}
                loop
                responsive={{
                  0: {
                    items: 1,
                  },
                  768: {
                    items: 2,
                  },
                  1000: {
                    items: 3,
                  },
                  1200: {
                    items: 4,
                  },
                }}
              >
                {new Array(7).fill(0).map((_, index) => (
                  <div className="nft__item" key={index}>
                    <div className="author_list_pp">
                      <Link
                        to="/"
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Creator: Monica Lucas"
                      >
                        <Skeleton
                          width="50px"
                          height="50px"
                          borderRadius="50%"
                        />
                        <i className="fa fa-check"></i>
                      </Link>
                    </div>
                    <div
                      style={{
                        transform: "translate(55%, 10px)",
                      }}
                      className=""
                    >
                      {" "}
                      <Skeleton
                        width="120px"
                        height="30px"
                        borderRadius="10px"
                      />
                    </div>

                    <div className="nft__item_wrap">
                      <div className="nft__item_extra">
                        <div className="nft__item_buttons">
                          <button>Buy Now</button>
                          <div className="nft__item_share">
                            <h4>Share</h4>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-facebook fa-lg"></i>
                            </a>
                            <a href="" target="_blank" rel="noreferrer">
                              <i className="fa fa-twitter fa-lg"></i>
                            </a>
                            <a href="">
                              <i className="fa fa-envelope fa-lg"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      <Link to="/item-details">
                        <Skeleton width="100%" height="240px" />
                      </Link>
                    </div>
                    <div className="nft__item_info">
                      <Link to="/item-details">
                        <h4>
                          <Skeleton width="150px" height="20px" />
                        </h4>
                      </Link>
                      <div className="nft__item_price">
                        <Skeleton width="60px" height="15px" />
                      </div>
                      <div className="nft__item_like">
                        <span>
                          <Skeleton width="40px" height="15px" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </ReactOwlCarousel>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
