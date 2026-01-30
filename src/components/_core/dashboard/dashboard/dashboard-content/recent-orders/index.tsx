"use client";

import RecentOrdersTable from "./recent-orders-table";
import Empty from "./empty";

interface IProps {
  isFilled?: boolean; // Flag to determine filled/empty state
}
const RecentOrders = ({ isFilled }: IProps) => {
  return isFilled ? <RecentOrdersTable /> : <Empty />;
};

export default RecentOrders;
