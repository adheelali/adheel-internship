import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Newitem({ items }) {
  const [secondsText, setSecondsText] = useState();
  const [minutestext, setMinutesText] = useState();
  const [hoursText, setHoursText] = useState();
  let cancelId;
  let timeLeft;

  function StartTime() {
    cancelId = requestAnimationFrame(updateTime);
  }

  function updateTime() {
    timeLeft = items.expiryDate - Date.now();
    let seconds = Math.floor(timeLeft / 1000);
    let minutes = Math.floor(seconds / 60);
    let hours = Math.floor(minutes / 60);

    if (timeLeft < 0) {
      cancelAnimationFrame(cancelId);
      return;
    }

    setSecondsText(seconds % 100);
    setMinutesText(minutes % 60);
    setHoursText(hours % 60);

    cancelId = requestAnimationFrame(updateTime);
  }

  useEffect(() => {
    StartTime();
  }, []);

  return (
    <div className="nft__item">
      <div className="author_list_pp">
        <Link
          to="/author"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Creator: Monica Lucas"
        >
          <img className="lazy" src={items.authorImage} alt="" />
          <i className="fa fa-check"></i>
        </Link>
      </div>
      {items.expiryDate && (
        <div className="de_countdown">
          {timeLeft > 0 ? (
            <span>
              {hoursText}h {minutestext}m {secondsText}s
            </span>
          ) : (
            <span>Expired</span>
          )}
        </div>
      )}

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
          <img src={items.nftImage} className="lazy nft__item_preview" alt="" />
        </Link>
      </div>
      <div className="nft__item_info">
        <Link to="/item-details">
          <h4>{items.title}</h4>
        </Link>
        <div className="nft__item_price">{items.price} ETH</div>
        <div className="nft__item_like">
          <i className="fa fa-heart"></i>
          <span>{items.likes}</span>
        </div>
      </div>
    </div>
  );
}

export default Newitem;
