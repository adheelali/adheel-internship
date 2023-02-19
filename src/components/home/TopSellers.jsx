import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../UI/Skeleton";
import AOS from "aos";
import 'aos/dist/aos.css';

const TopSellers = () => {
  const [topSellers, setTopSellers] = useState([]);

  async function getTopsellers() {
    const { data } = await axios.get(
      " https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers"
    );
    setTopSellers(data);
  }

  useEffect(() => {
    AOS.init();
    getTopsellers();
  }, []);

  return (
    <section id="section-popular" className="pb-5">
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
                Top Sellers
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
          <div className="col-md-12">
            <ol className="author_list">
              {topSellers.length ? (
                <>
                  {topSellers.map((author) => (
                    <li
                      data-aos="fade"
                      data-aos-duration="1000"
                      data-aos-once="true"
                      data-aos-anchor-placement="top-bottom"
                      key={author.id}
                    >
                      <div className="author_list_pp">
                        <Link to={`/author/${author.authorId}`}>
                          <img
                            className="lazy pp-author"
                            src={author.authorImage}
                            alt=""
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to="/author">{author.authorName}</Link>
                        <span>{author.price} ETH</span>
                      </div>
                    </li>
                  ))}
                </>
              ) : (
                <>
                  {new Array(12).fill(0).map((_, index) => (
                    <li
                      data-aos="fade"
                      data-aos-duration="1000"
                      data-aos-once="true"
                      data-aos-anchor-placement="top-bottom"
                      key={index}
                    >
                      <div className="author_list_pp">
                        <Link to="/author">
                          <Skeleton
                            width="50px"
                            height="50px"
                            borderRadius="50%"
                          />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>
                      <div className="author_list_info">
                        <Link to="/author">
                          <Skeleton width="100px" height="15px" />
                        </Link>
                        <span>
                          <Skeleton width="40px" height="15px" />
                        </span>
                      </div>
                    </li>
                  ))}
                </>
              )}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
