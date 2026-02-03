import { toast } from "sonner";
import { client } from "@/src/lib/hono";
import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ResponseType = InferResponseType<
  (typeof client.api.orders)[":id"]["$delete"]
>;

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseType, Error, string>({
    mutationFn: async (id: string) => {
      const response = await client.api.orders[":id"].$delete({
        param: { id },
      });
      if (!response.ok) {
        throw new Error("Failed to delete order");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
      toast.success("Order deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete order");
    },
  });
};
