import CustomerInfo from "./customer-info";
import ImportantDates from "./important-dates";
import Measurement from "./measurement";
import OrderDetailsHeader from "./order-details-header";
import Orders from "./orders";

const OrderDetailsContent = () => {
  return (
    <div>
      <OrderDetailsHeader />
      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        {/* Left Column - Main Content */}
        <div className="flex-1 space-y-6">
          <Orders />
          <Measurement />
        </div>
        {/* Right Column - Sidebar */}
        <div className="w-full lg:w-80 space-y-6">
          <CustomerInfo />
          <ImportantDates />
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsContent;
