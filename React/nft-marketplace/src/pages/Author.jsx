import React, {useState,useEffect} from "react";
import AuthorBanner from "../images/author_banner.jpg";
import AuthorItems from "../components/author/AuthorItems";
import { Link, useParams } from "react-router-dom";
// import AuthorImage from "../images/author_thumbnail.jpg";
import { fetchHotCollections } from '../components/home/HotCollections.jsx'

import Skeleton from '../components/UI/Skeleton.jsx'

function AuthorHeaderSkeleton() {
  return (
<div className="col-md-12">
      <div className="d_profile de-flex">
        <div className="de-flex-col">
          <div className="profile_avatar">
            <Skeleton width="150px" height="150px" borderRadius="999px" />
            <i className="fa fa-check"></i>
            <div className="profile_name--skeleton">
                <Skeleton width="200px" height="30px" borderRadius="0" />
                <Skeleton width="120px" height="16px" borderRadius="0" />
                <Skeleton width="180px" height="20px" borderRadius="0" />
            </div>
          </div>
        </div>
        <div className="profile_follow de-flex">
          <div className="de-flex-col">
            <div className="profile_follower">
              <Skeleton width="160px" height="32px" borderRadius="0" /> 
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Author = () => {

  const [newAuth, setAuth] = useState(null)
  const [error, setError] = useState(null)
  const {id} =  useParams()

  useEffect(() => {
    setAuth()
    const url = `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${id}`
    fetchHotCollections(url)
    .then(setAuth)
    .catch(e => setError(e))
  }, [id])

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
        {error && <><h3>Load data error!</h3></>}

        { newAuth ? 
        (<section aria-label="section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="d_profile de-flex">
                  <div className="de-flex-col">
                    <div className="profile_avatar">
                      <img src={newAuth.authorImage} alt="" />
                      <i className="fa fa-check"></i>
                      <div className="profile_name">
                        <h4>
                          {newAuth.authorName}
                          <span className="profile_username">@{newAuth.tag}</span>
                          <span id="wallet" className="profile_wallet">
                            {newAuth.address}
                          </span>
                          <button id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div>
                  </div>
                  <div className="profile_follow de-flex">
                    <div className="de-flex-col">
                      <div className="profile_follower">{newAuth.followers} followers</div>
                      <Link to="#" className="btn-main">
                        Follow
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems collections={newAuth.nftCollection} 
                    authImg={newAuth.authorImage} 
                    authId={newAuth.authorId}
                    authName={newAuth.authorName} />
                </div>
              </div>
            </div>
          </div>
        </section>) 
        : (
          <section aria-label="section">
          <div className="container">
            <div className="row">
              <AuthorHeaderSkeleton />

              <div className="col-md-12">
                <div className="de_tab tab_simple">
                  <AuthorItems collections={[]} 
                      authImg={''} 
                      authId={''} />
                </div>
              </div>
            </div>
          </div>
        </section>
        )}
      </div>
    </div>
  );
};

export default Author;
