import { Button } from "@/src/components/ui/button";
import { IconPlus, IconTrash } from "@tabler/icons-react";

const Orders = () => {
  const orderItems = [
    {
      id: 1,
      name: "Wedding Dress - Custom Design",
      description: "White silk with lace detailing",
      quantity: 2,
      unitPrice: "₦120,000",
      total: "₦240,000",
    },
    {
      id: 2,
      name: "Wedding Dress - Custom Design",
      description: "White silk with lace detailing",
      quantity: 1,
      unitPrice: "₦120,000",
      total: "₦120,000",
    },
  ];
  return (
    <div className="bg-white rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-foreground">Order Item</h2>
        <Button
          variant={"ghost"}
          className=" hover:bg-[#EF4444]/90 hover:text-white text-primary rounded-xl h-10 px-4"
        >
          <IconPlus className="size-4" />
          Add Item
        </Button>
      </div>

      <div className="space-y-4 mb-6">
        {orderItems.map((item) => (
          <div
            key={item.id}
            className="border border-[#E5E7EB] rounded-lg p-4 flex items-start justify-between"
          >
            <div className="flex-1">
              <h3 className="text-sm font-bold text-foreground mb-1">
                {item.name}
              </h3>
              <p className="text-sm text-[#6B7280] mb-2">{item.description}</p>
              <div className="flex gap-10 lg:gap-20 text-sm text-[#4B5565]">
                <div className="space-y-1">
                  <div>Quantity</div>
                  <div className="font-bold text-[#121926]">
                    {item.quantity}
                  </div>
                </div>
                <div className="space-y-1">
                  <div>Unit Price</div>
                  <div className="font-bold text-[#121926]">
                    {item.unitPrice}
                  </div>
                </div>
                <div className="space-y-1">
                  <div>Total </div>
                  <div className="font-bold text-[#121926]">{item.total}</div>
                </div>
              </div>
            </div>
            <button className="text-[#9AA4B2] hover:text-[#EF4444] transition-colors">
              <IconTrash className="size-5" />
            </button>
          </div>
        ))}
      </div>

      <div className="border-t border-[#E5E7EB] pt-4 space-y-2">
        <div className="flex justify-between text-sm border-b pb-4 border[#CDD5DF]">
          <span className="text-[#9AA4B2]">Subtotal</span>
          <span className="text-[#121926] font-bold">₦155,000</span>
        </div>
        <div className="flex justify-between text-[#121926] text-lg font-bold">
          <span>Total</span>
          <span>₦155,000</span>
        </div>
      </div>
    </div>
  );
};

export default Orders;
