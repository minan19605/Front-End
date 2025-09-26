import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
// import AuthorImage from "../../images/author_thumbnail.jpg";
import { fetchHotCollections } from './HotCollections'
import './sliderNFT.css'

function TopSellersSkeleton({idx}) {
  return (
    <>
    <li key = {idx}>
        <div className="author_list_pp">
            <div className="lazy pp-author">
              <div className="skeleton top__auth--skeleton"></div>
            </div>
            <i className="fa fa-check"></i>

        </div>
        <div className="author_list_info">
          <div className="skeleton top__auth-name--skeleton"></div>
          <div className="skeleton top__price--skeleton" />
        </div>
      </li>
    </>
  )
}

const TopSellers = () => {
  const [collections, setCollections] = useState([])
  const [error, setError] = useState(null)
    
  useEffect(() => {
    setCollections([])
    const url = 'https://us-central1-nft-cloud-functions.cloudfunctions.net/topSellers'
    fetchHotCollections(url)
    .then(setCollections)
    .catch(e => setError(e))
  }, [])
  console.log("Collection at begin is: ", collections)

  if(collections.length > 0) {
    collections.sort((a,b) => Number(a.id) - Number(b.id))
  }

  return (
    <section id="section-popular" className="pb-5">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Top Sellers</h2>
              <div className="small-border bg-color-2"></div>
              {error && <><h3>Load data error!</h3></>}
            </div>
          </div>
          <div className="col-md-12">
            <ol className="author_list">
              {(collections.length > 0) ? collections.map(item => (
                  <>
                <li key={item.id}>
                  <div className="author_list_pp">
                    <Link to={`/author/${item.authorId}`}>
                      <img
                        className="lazy pp-author"
                        src={item.authorImage}
                        alt=""
                      />
                      <i className="fa fa-check"></i>
                    </Link>
                  </div>
                  <div className="author_list_info">
                    <Link to={`/author/${item.authorId}`}>{item.authorName}</Link>
                    <span>{item.price} ETH</span>
                  </div>
                </li>
                </>)
              ) : 
              (<>
              {(new Array(12).fill(0).map((_, index) => (
               <TopSellersSkeleton idx={index} />
            )))}
              </>)}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopSellers;
