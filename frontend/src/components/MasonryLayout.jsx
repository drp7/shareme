import React from "react";
import Masonry from "react-masonry-css";
import Pin from "./Pin";

const breakpointColumnsObj = {
  default: 4,
  3000: 6,
  2500: 5,
  2000: 4,
  1200: 3,
  800: 2,
  400: 1,
};

const MasonryLayout = ({ pins }) => (
  <Masonry
    className="flex animate-slide-fwd"
    breakpointCols={breakpointColumnsObj}
  >
    {pins?.map((pin) => (
      <Pin key={pin._id} pin={pin} className="w-max" />
    ))}
  </Masonry>
);

export default MasonryLayout;
