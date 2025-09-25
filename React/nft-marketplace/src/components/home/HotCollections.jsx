import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

// import AuthorImage from "../../images/author_thumbnail.jpg";
// import nftImage from "../../images/nftImage.jpg";
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

function OneNFTSkeleton() {
  return (
    <div className="nft_coll">
        <div className="nft_wrap">
          <div className="skeleton nft__img--skeleton"></div>
        </div>
        <div className="nft_coll_pp">
          <div className="skeleton nft__auth--skeleton"></div>
          <i className="fa fa-check"></i>
        </div>
        <div className="nft_coll_info">
          <div className="skeleton nft__title--skeleton"></div>
          <div className="skeleton nft__code--skeleton"></div>
        </div>
      </div>
  )
}

function oneNFT(nft) {
  return (
    // <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={nft.nftId}>
      <div className="nft_coll" key={nft.nftId}>
        <div className="nft_wrap">
          <Link to={`/item-details/${nft.nftId}`}>
            <img src={nft.nftImage} className="lazy img-fluid" alt="" />
          </Link>
        </div>
        <div className="nft_coll_pp">
          <Link to={`/author/${nft.authorId}`}>
            <img className="lazy pp-coll" src={nft.authorImage} alt="" />
          </Link>
          <i className="fa fa-check"></i>
        </div>
        <div className="nft_coll_info">
          <Link to="/explore">
            <h4>{nft.title}</h4>
          </Link>
          <span>ERC-{nft.code}</span>
        </div>
      </div>
    // </div>
  )
}

export async function fetchHotCollections(url) {
    const response = await fetch(url)
    if( !response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    return await response.json()
}

const HotCollections = () => {
  const [collections, setCollections] = useState([])
  const [error, setError] = useState(null)

    useEffect(() => {
      setCollections([])
      const url = 'https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections'
      fetchHotCollections(url)
      .then(setCollections)
      .catch(e => setError(e))
    }, [])
    console.log("Collection at begin is: ", collections)

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              {error && <><h3>Load data error!</h3></>}
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          {(collections.length >0) ? (
            <div className="nft-slider">
              < Slider {...settings}>
              {collections.map((nft) => oneNFT(nft))}
              </Slider>
            </div>
          )
          :(<div className="nft-slider">
            < Slider {...settings}>
            {(new Array(5).fill(0).map((_, index) => (
               <OneNFTSkeleton />
            )))}
            </Slider>
          </div>)}
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
