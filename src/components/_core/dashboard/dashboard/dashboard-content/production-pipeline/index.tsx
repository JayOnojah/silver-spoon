import React from "react";
import Empty from "./empty";
import Filled from "./filled";

interface IProps {
  isFilled?: boolean; // Flag to determine filled/empty state
}
const ProductionPipeline = ({ isFilled }: IProps) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-[#E5E7EB]">
      {isFilled ? <Filled /> : <Empty />}
    </div>
  );
};

export default ProductionPipeline;
