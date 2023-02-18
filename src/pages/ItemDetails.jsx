import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const ItemDetails = () => {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  async function getItemsDetails() {
    setLoading(false);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/itemDetails?nftId=${id}`
    );
    setItems(data);
    setLoading(true);
  }

  useEffect(() => {
    getItemsDetails();
    window.scrollTo(0, 0);

    return () => {
      setItems([]);
    };
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                {loading ? (
                  <img
                    src={items.nftImage}
                    className="img-fluid img-rounded mb-sm-30 nft-image"
                    alt=""
                  />
                ) : (
                  <Skeleton width="100%" height="100%" />
                )}
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  {loading ? (
                    <h2>
                      {items.title} #{items.tag}
                    </h2>
                  ) : (
                    <Skeleton width="300px" height="40px" />
                  )}

                  <div className="item_info_counts">
                    <div className="item_info_views">
                      {loading ? (
                        <>
                          <i className="fa fa-eye"></i>
                          {items.views}
                        </>
                      ) : (
                        <i
                          className="fa fa-eye"
                          style={{
                            visibility: "hidden",
                          }}
                        ></i>
                      )}
                    </div>
                    <div className="item_info_like">
                      {loading && (
                        <>
                          <i className="fa fa-heart"></i>
                          {items.likes}
                        </>
                      )}
                    </div>
                  </div>
                  {loading ? (
                    <p>{items.description}</p>
                  ) : (
                    <Skeleton width="400px" height="60px" />
                  )}
                  <div className="d-flex flex-row">
                    <div className="mr40">
                      <h6>Owner</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${items.ownerId}`}>
                            {loading ? (
                              <>
                                <img
                                  className="lazy"
                                  src={items.ownerImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </>
                            ) : (
                              <Skeleton
                                width="50px"
                                height="50px"
                                borderRadius="50%"
                              />
                            )}
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${items.ownerId}`}>
                            {loading ? (
                              <>{items.ownerName}</>
                            ) : (
                              <Skeleton width="100px" height="20px" />
                            )}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div></div>
                  </div>
                  <div className="de_tab tab_simple">
                    <div className="de_tab_content">
                      <h6>Creator</h6>
                      <div className="item_author">
                        <div className="author_list_pp">
                          <Link to={`/author/${items.creatorId}`}>
                            {loading ? (
                              <>
                                <img
                                  className="lazy"
                                  src={items.creatorImage}
                                  alt=""
                                />
                                <i className="fa fa-check"></i>
                              </>
                            ) : (
                              <Skeleton
                                width="50px"
                                height="50px"
                                borderRadius="50%"
                              />
                            )}
                          </Link>
                        </div>
                        <div className="author_list_info">
                          <Link to={`/author/${items.creatorId}`}>
                            {loading ? (
                              <>{items.creatorName}</>
                            ) : (
                              <Skeleton width="100px" height="20px" />
                            )}
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="spacer-40"></div>
                    <h6>Price</h6>
                    <div className="nft-item-price">
                      {loading ? (
                        <>
                          <img src={EthImage} alt="" />
                          <span>{items.price}</span>
                        </>
                      ) : (
                        <Skeleton width="60px" height="20px" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
