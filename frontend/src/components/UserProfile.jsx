import React from "react";
import { useParams } from "react-router-dom";

export default function UserProfile() {
  const { userId } = useParams();
  return <div className="bg-red-600">Profile{userId}</div>;
}
