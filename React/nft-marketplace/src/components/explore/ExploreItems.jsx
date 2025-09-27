import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
// import AuthorImage from "../../images/author_thumbnail.jpg";
// import nftImage from "../../images/nftImage.jpg";
import { fetchHotCollections } from '../home/HotCollections'
import { OneNewItem, NewItemSkeleton } from '../home/NewItems.jsx'

import '../home/sliderNFT.css'

const INITIAL_COUNT = 8
const STEP_COUNT = 4

const ExploreItems = () => {
  const [collections, setCollections] = useState([])
  const [error, setError] = useState(null)

  const [filterValue, setFilterValue] = useState('')

  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT)
  const itemsToShow = collections.slice(0, visibleCount)

  const hasMoreItems = visibleCount < collections.length

  const handleExploreMore = () => {
    setVisibleCount(prevCount => Math.min(prevCount + STEP_COUNT, collections.length))
  }

  useEffect(() => {
    setCollections([])
    const url = 'https://us-central1-nft-cloud-functions.cloudfunctions.net/explore'
    fetchHotCollections(url)
    .then(setCollections)
    .catch(e => setError(e))
  }, [])

  useEffect(() => {
    setCollections([])
    const url = `https://us-central1-nft-cloud-functions.cloudfunctions.net/explore?filter=${filterValue}`
    fetchHotCollections(url)
    .then(setCollections)
    .catch(e => setError(e))
  }, [filterValue])

  return (
    <>
      <div>
        <select id="filter-items" defaultValue="" value={filterValue}
          onChange={(event) => setFilterValue(event.target.value)}>
          <option value="">Default</option>
          <option value="price_low_to_high">Price, Low to High</option>
          <option value="price_high_to_low">Price, High to Low</option>
          <option value="likes_high_to_low">Most liked</option>
        </select>
      </div>
      {error && <><h3>Load data error!</h3></>}
      {(collections.length >0) ? (
          itemsToShow.map((nft) => {
            return (
              <div
                key={nft.id}
                className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                style={{ display: "block", backgroundSize: "cover" }}
              >
              {OneNewItem(nft)}
              </div>
            )
          })
          )
          :(
            new Array(8).fill(0).map((_, index) => {
              return (
                <div
                  key={index}
                  className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12"
                  style={{ display: "block", backgroundSize: "cover" }}
                >
                  {<NewItemSkeleton />}
                </div>
              )
            })
            )
          }
      { hasMoreItems && (<div className="col-md-12 text-center">
        <Link to="" id="loadmore" className="btn-main lead" onClick={handleExploreMore}>
          Load more
        </Link>
      </div>)}
    </>
  );
};

export default ExploreItems;
