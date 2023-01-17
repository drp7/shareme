import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
import { feedQuery, searchQuery } from "../utils/data";

export default function Feed() {
  const { categoryId } = useParams();
  const [loading, setLoading] = useState(false);
  const [pins, setPins] = useState(null);
  console.log(pins, "pins");

  useEffect(() => {
    setLoading(true);
    if (categoryId) {
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);

  if (loading) {
    return <Spinner message="we are adding new ideas to your feed!" />;
  }

  return <div className="">{pins && <MasonryLayout pins={pins} />} </div>;
}
