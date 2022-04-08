import React from "react";
import { useParams } from "react-router-dom";

const LayerDetailView: React.FC = (): JSX.Element => {
  const params = useParams();
  return <>{`View Layer ID "${params.id}"`}</>;
};

export default LayerDetailView;
