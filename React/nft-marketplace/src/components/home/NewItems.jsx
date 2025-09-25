import React, {useState,useEffect} from "react";
import { Link } from "react-router-dom";
// import AuthorImage from "../../images/author_thumbnail.jpg";
// import nftImage from "../../images/nftImage.jpg";
import { fetchHotCollections } from './HotCollections'

import Slider from "react-slick"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './sliderNFT.css'

// Define the settings for the carousel
const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768,  settings: { slidesToShow: 2 } },
      { breakpoint: 576,  settings: { slidesToShow: 1 } },
    ],
};

function Countdown({expiryTimestamp}) {
  const [remainTime, setRemainTime] = useState(expiryTimestamp - Date.now())

  useEffect(() => {
    if (remainTime <=0 ) return;

    const interval = setInterval(() => {
      setRemainTime(prevTime => prevTime-1000)
    }, 1000)

    return () => clearInterval(interval)

  }, [remainTime])

  const formatTime = (timeInMs) => {
      if (timeInMs <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

      const days = Math.floor(timeInMs / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeInMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeInMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeInMs % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds };
  }

  const { days, hours, minutes, seconds } = formatTime(remainTime);

  return (
    <div>
      {remainTime > 0 ? (
        <>
          {days>0?`${days}d `:null} {hours>0?`${hours}h `:null} {minutes>0?`${minutes}m `:null} {seconds}s
        </>
      ) : (
        <>
        EXPIRED
        </>
      )}
    </div>
  ); 

}

function NewItemSkeleton() {

  return (
  <div className="nft__item" >
    <div className="author_list_pp">
      <div className="skeleton nft__auth--skeleton"></div>
    </div>
    <div className="nft__item_wrap">
      <div className="skeleton newitem__img--skeleton"></div>
    </div>
    <div className="nft__item_info">
      <div className="skeleton newitem__title--skeleton" />
      <div className="nft__item_price">
        <div className="skeleton newitem__price--skeleton" />
        </div>
      <div className="nft__item_like">
        <div className="skeleton detail-nft__like--skeleton" />
      </div>
    </div>
  </div>)
}

// new Array(4).fill(0).map((_, index) =>()
function OneNewItem(nft) {
  return (
    <div className="nft__item" key={nft.nftId}>
      <div className="author_list_pp">
        <Link
          to={`/author/${nft.authorId}`}
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          title="Creator: Monica Lucas"
        >
          <img className="lazy" src={nft.authorImage} alt="" />
          <i className="fa fa-check"></i>
        </Link>
      </div>
      {nft.expiryDate && 
        <div className="de_countdown"> <Countdown expiryTimestamp={nft.expiryDate} />
        </div>}
      <div className="nft__item_wrap">
        <div className="nft__item_extra">
          <div className="nft__item_buttons">
            <button>Buy Now</button>
            <div className="nft__item_share">
              <h4>Share</h4>
              <a href="https://www.facebook.com/sharer/sharer.php?u=https://gigaland.io" target="_blank" rel="noreferrer">
                <i className="fa fa-facebook fa-lg"></i>
              </a>
              <a href="https://x.com/intent/tweet?url=https://gigaland.io" target="_blank" rel="noreferrer">
                <i className="fa fa-twitter fa-lg"></i>
              </a>
              <a href="mailto:?subject=I%20wanted%20you%20to%20see%20this%20site&body=Check%20out%20this%20site%20https://gigaland.io">
                <i className="fa fa-envelope fa-lg"></i>
              </a>
            </div>
          </div>
        </div>

        <Link to={`/item-details/${nft.nftId}`}>
          <img
            src={nft.nftImage}
            className="lazy nft__item_preview"
            alt=""
          />
        </Link>
      </div>
      <div className="nft__item_info">
        <Link to={`/item-details/${nft.nftId}`}>
          <h4>{nft.title}</h4>
        </Link>
        <div className="nft__item_price">{nft.price} ETH</div>
        <div className="nft__item_like">
          <i className="fa fa-heart"></i>
          <span>{nft.likes}</span>
        </div>
      </div>
    </div>
  )
}

const NewItems = () => {
  const [collections, setCollections] = useState([])
    const [error, setError] = useState(null)
  
      useEffect(() => {
        setCollections([])
        const url = 'https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems'
        fetchHotCollections(url)
        .then(setCollections)
        .catch(e => setError(e))
      }, [])
      console.log("Collection at begin is: ", collections)

  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
              {error && <><h3>Load data error!</h3></>}
            </div>
          </div>
          {(collections.length >0) ? (
            <div className="nft-slider">
              < Slider {...settings}>
              {collections.map((nft) => OneNewItem(nft))}
              </Slider>
            </div>
          )
          :(<div className="nft-slider">
            < Slider {...settings}>
            {(new Array(5).fill(0).map((_, index) => (
               <NewItemSkeleton />
            )))}
            </Slider>
          </div>)}
        </div>
      </div>
    </section>
  );
};

export default NewItems;
