import { Badge } from '@/src/components/ui/badge'
import { Button } from '@/src/components/ui/button'
import { Checkbox } from '@/src/components/ui/checkbox'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/src/components/ui/table'
import { cn } from '@/src/lib/utils'
import Link from 'next/link'

interface Order {
  id: string;
  client: string;
  amount: string;
  paymentStatus: {
    label: string;
    variant: "notPaid" | "overdue" | "paid" | "partial";
  };
  orderStatus: {
    label: string;
    variant: "notStarted" | "inProgress" | "ready" | "fitting";
  };
  createdDate: string;
}

interface OrderTableProps {
  orders: Order[];
  selectedOrders: string[];
  isAllSelected: boolean;
  handleSelectAll: (checked: boolean) => void;
  handleSelectOrder: (orderId: string, checked: boolean) => void;
  getPaymentStatusBadgeClass: (variant: string) => string;
  getOrderStatusBadgeClass: (variant: string) => string;
}

const OrderTable = ({
  orders,
  selectedOrders,
  isAllSelected,
  handleSelectAll,
  handleSelectOrder,
  getPaymentStatusBadgeClass,
  getOrderStatusBadgeClass,
}: OrderTableProps) => {
  return (
    <div>
       <div className="hidden sm:block overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-b border-[#E5E7EB]">
                <TableHead className="w-12">
                  <Checkbox
                    checked={isAllSelected}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Order ID
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Client
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Order Amount
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Payment Status
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Order Status
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Created Date
                </TableHead>
                <TableHead className="font-semibold text-foreground">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order, index) => (
                <TableRow
                  key={order.id}
                  className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB]"
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedOrders.includes(order.id)}
                      onCheckedChange={(checked) =>
                        handleSelectOrder(order.id, checked as boolean)
                      }
                      onClick={(e) => e.stopPropagation()}
                    />
                  </TableCell>
                  <TableCell className="font-medium text-foreground">
                    {order.id.split("-")[0]}
                  </TableCell>
                  <TableCell className="text-[#4B5565]">
                    {order.client}
                  </TableCell>
                  <TableCell className="text-[#4B5565]">
                    {order.amount}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        "border text-xs font-medium px-2 py-0.5",
                        getPaymentStatusBadgeClass(order.paymentStatus.variant),
                      )}
                    >
                      {order.paymentStatus.label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        "border text-xs font-medium px-2 py-0.5",
                        getOrderStatusBadgeClass(order.orderStatus.variant),
                      )}
                    >
                      {order.orderStatus.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-[#4B5565]">
                    {order.createdDate}
                  </TableCell>
                  <TableCell>
                    <Link href={"/dashboard/orders/1"}>
                      <Button
                        variant="ghost"
                        className="border text-[#9AA4B2] hover:text-primary/80 hover:bg-transparent h-auto font-medium text-sm"
                      >
                        View Details
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
    </div>
  )
}

export default OrderTable
