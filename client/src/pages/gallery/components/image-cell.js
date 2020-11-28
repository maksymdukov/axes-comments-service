import React from "react";

const ImageCell = ({ value }) => {
  return (
    <img
      src={value}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
      }}
    />
  );
};

export default ImageCell;
