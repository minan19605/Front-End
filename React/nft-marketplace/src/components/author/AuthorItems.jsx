import React from "react";
// import { Link } from "react-router-dom";
// import AuthorImage from "../../images/author_thumbnail.jpg";
// import nftImage from "../../images/nftImage.jpg";
import { OneNewItem, NewItemSkeleton } from '../home/NewItems.jsx'

const AuthorItems = ({collections, authImg, authId, authName}) => {
  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {(collections.length > 0) ? collections.map((inputNFT) => {
            const nft = {
              ...inputNFT,
              authorImage: authImg,
              authorId: authId,
              authorName: authName
            };
            return (<div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={nft.id}>
              {OneNewItem(nft)}
            </div>)
          }) : ((new Array(8).fill(0).map((_, index) => (
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                <NewItemSkeleton />
                </div>
            ))))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;
