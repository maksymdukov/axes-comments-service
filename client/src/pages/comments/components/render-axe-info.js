import React from "react";
import AxeTitle from "pages/axe/components/axe-title";

const renderAxeInfo = (comment) => {
  return (
    <div>
      <AxeTitle axe={comment.axe} titleProps={{ variant: "subtitle2" }} />
    </div>
  );
};

export default renderAxeInfo;
