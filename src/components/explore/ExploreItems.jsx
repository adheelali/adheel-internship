import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Newitem from "../home/Newitem";
import Skeleton from "../UI/Skeleton";

const ExploreItems = () => {
  const [items, setItems] = useState([]);
  const [slicer, setSlicer] = useState(8);

  async function getExploreItems(filterValue) {
    const { data } = await axios.get(
      `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filterValue || ''}`
    );
    setItems(data);
  }

  function loadMoreItems() {
    setSlicer(slicer + 4);
  }
   
  function selectOptions(value) {
    setItems([])
    getExploreItems(value)
  }

  useEffect(() => {
    getExploreItems();
  }, []);

  return (
    <>
      <div>
        <select onChange={(event) => selectOptions(event.target.value)} id="filter-items" defaultValue="">
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {items.length ? (
        <>
          {items.slice(0, slicer).map((items) => (
            <div
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
              key={items.id}
            >
              <Newitem items={items} />
            </div>
          ))}
        </>
      ) : (
        <>
          {new Array(slicer).fill(0).map((_, index) => (
            <div
              key={index}
              className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
              style={{ display: "block", backgroundSize: "cover" }}
            >
              <Skeleton width="100%" height="465px" borderRadius="10px" />
            </div>
          ))}{" "}
        </>
      )}
      {slicer !== items.length && (
        <div className="col-md-12 text-center">
          <Link
            to=""
            id="loadmore"
            className="btn-main lead"
            onClick={loadMoreItems}
          >
            Load more
          </Link>
        </div>
      )}
    </>
  );
};

export default ExploreItems;