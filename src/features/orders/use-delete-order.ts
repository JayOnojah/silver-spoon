import { toast } from "sonner";
import { client } from "@/src/lib/hono";
import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ResponseType = InferResponseType<
  (typeof client.api.orders)[":id"]["$delete"]
>;

export const useDeleteOrder = (id?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error>({
    mutationFn: async () => {
      const response = await client.api.orders[":id"].$delete({
        param: { id },
      });
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["order", { id }] });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
      toast.success("Order deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete order");
    },
  });

  return mutation;
};
