import React, { useEffect, useState } from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "../components/UI/Skeleton";

const Author = () => {
  const { id } = useParams();
  const [author, setAuthor] = useState([]);
  const [follows, setFollows] = useState();
  const [loading, setLoading] = useState(false);

  async function getAuthor() {
    setLoading(false);
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
    );
    setAuthor(data);
    setFollows(data.followers);
    setLoading(true);
  }

  function addFollow() {
    if (follows === author.followers) {
      setFollows(follows + 1);
    } else {
      setFollows(follows - 1);
    }
  }

  useEffect(() => {
    getAuthor();
  }, []);

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>

        <section
          id="profile_banner"
          aria-label="section"
          className="text-light"
          data-bgimage="url(images/author_banner.jpg) top"
          style={{ background: `url(${AuthorBanner}) top` }}
        ></section>

        <section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      {loading ? (
                        <img src={author.authorImage} alt="" />
                      ) : (
                        <Skeleton
                          width="150px"
                          height="150px"
                          borderRadius="50%"
                        />
                      )}
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {loading ? (
                            <span>{author.authorName}</span>
                          ) : (
                            <Skeleton width="200px" height="20px" />
                          )}
                          <span className="profile_username">
                            {loading ? (
                              <span>@{author.tag}</span>
                            ) : (
                              <Skeleton width="150px" height="10px" />
                            )}
                          </span>
                          <span id="wallet" className="profile_wallet">
                            {loading ? (
                              <span>{author.address}</span>
                            ) : (
                              <Skeleton width="200px" height="15px" />
                            )}
                          </span>
                          {loading && (
                            <button id="btn_copy" title="Copy Text">
                              Copy
                            </button>
                          )}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      {loading ? (
                        <>
                          <div className="profile_follower">
                            {follows} followers
                          </div>
                          {follows === author.followers ? (
                            <Link
                              to="#"
                              className="btn-main"
                              onClick={addFollow}
                            >
                              Follow
                            </Link>
                          ) : (
                            <Link
                              to="#"
                              className="btn-main"
                              onClick={addFollow}
                            >
                              Unfollow
                            </Link>
                          )}
                        </>
                      ) : (
                        <Skeleton width="200px" height="50px" />
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  {loading ? (
                    <AuthorItems
                      authorNFT={author.nftCollection}
                      authorImage={author.authorImage}
                    />
                  ) : (
                    <>
                      <div className="de_tab_content">
                        <div className="tab-1">
                          <div className="row">
                            {new Array(8).fill(0).map((_, index) => (
                              <div
                                key={index}
                                className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                                style={{
                                  display: "block",
                                  backgroundSize: "cover",
                                }}
                              >
                                <Skeleton width="100%" height="420px" borderRadius='10px'/>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Author;
