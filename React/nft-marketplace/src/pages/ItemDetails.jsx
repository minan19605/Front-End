import React, { useEffect, useState } from "react";
import EthImage from "../images/ethereum.svg";
import { Link, useParams } from "react-router-dom";
// import AuthorImage from "../images/author_thumbnail.jpg";
// import nftImage from "../images/nftImage.jpg";

import {fetchHotCollections} from '../components/home/HotCollections.jsx'
import '../components/home/sliderNFT.css'

function OneItemSkelton () {
  return (
    <>
      <div className="col-md-6 text-center">
        <div className="skeleton detail-nft-img-skeleton"></div>
      </div>
      <div className="col-md-6">
        <div className="item_info">
          <div className="skeleton detail-nft__title--skeleton" />
          <div className="item_info_counts">
            <div className="item_info_views">
              <div className="skeleton detail-nft__like--skeleton"/>
            </div>
            <div className="item_info_like">
              <div className="skeleton detail-nft__like--skeleton" />
            </div>
          </div>
          <div className="skeleton detail-nft__para--skeleton" />
          <div className="d-flex flex-row">
            <div className="mr40">
              <h6>Owner</h6>
              <div className="item_author">
                <div className="author_list_pp">
                  <div className="skeleton detail-nft__auth-img--skeleton"/>
                </div>
                <div className="author_list_info">
                  <div className="skeleton detail-nft__auth-name--skeleton"/>
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
                  <div className="skeleton detail-nft__auth-img--skeleton"/>
                </div>
                <div className="author_list_info">
                  <div className="skeleton detail-nft__auth-name--skeleton"/>
                </div>
              </div>
            </div>
            <div className="spacer-40"></div>
            <h6>Price</h6>
            <div className="nft-item-price">
              <img src={EthImage} alt="" />
              <div className="skeleton detail-nft__price--skeleton" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function OneItemDetail({nft}) {
  return (
    <>
      <div className="col-md-6 text-center">
        <img
          src={nft.nftImage}
          className="img-fluid img-rounded mb-sm-30 nft-image"
          alt=""
        />
      </div>
      <div className="col-md-6">
        <div className="item_info">
          <h2>{nft.title} #194</h2>
          <div className="item_info_counts">
            <div className="item_info_views">
              <i className="fa fa-eye"></i>
              100
            </div>
            <div className="item_info_like">
              <i className="fa fa-heart"></i>
              74
            </div>
          </div>
          <p>
            doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
            illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo.
          </p>
          <div className="d-flex flex-row">
            <div className="mr40">
              <h6>Owner</h6>
              <div className="item_author">
                <div className="author_list_pp">
                  <Link to="/author">
                    <img className="lazy" src={nft.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="author_list_info">
                  <Link to="/author">Monica Lucas</Link>
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
                  <Link to="/author">
                    <img className="lazy" src={nft.authorImage} alt="" />
                    <i className="fa fa-check"></i>
                  </Link>
                </div>
                <div className="author_list_info">
                  <Link to="/author">Monica Lucas</Link>
                </div>
              </div>
            </div>
            <div className="spacer-40"></div>
            <h6>Price</h6>
            <div className="nft-item-price">
              <img src={EthImage} alt="" />
              <span>1.85</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const ItemDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const {nftId} =  useParams()
  const [collections, setCollections] = useState([])
  const [error, setError] = useState(null)
  
  useEffect(() => {
    fetchHotCollections()
    .then(setCollections)
    .catch(e => setError(e))
  }, [nftId])

  const item = collections?.find(nft => nft.nftId === Number(nftId))
  console.log("item is : ", item)

  return (
    <div id="wrapper">
      <div className="no-bottom no-top" id="content">
        <div id="top"></div>
        {error && <><h3>Load data error!</h3></>}
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              {
                item? <OneItemDetail nft={item} /> : <OneItemSkelton />
              }
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ItemDetails;
