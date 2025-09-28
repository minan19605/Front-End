import React from "react";

const Skeleton = ({ width, height, borderRadius='0' }) => {
  return (
    <div
      className="skeleton-box"
      style={{
        width,
        height,
        borderRadius,
        margin: '8px 0',
      }}
    ></div>
  );
};

export default Skeleton;
