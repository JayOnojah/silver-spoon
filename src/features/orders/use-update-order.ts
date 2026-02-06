import { toast } from "sonner";
import { client } from "@/src/lib/hono";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ResponseType = InferResponseType<
  (typeof client.api.orders)[":id"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api.orders)[":id"]["$patch"]
>["json"];

export const useUpdateOrder = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.orders[":id"].$patch({
        param: { id },
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order", { id }] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
      toast.success("Order updated successfully");
    },
    onError: () => {
      toast.error("Failed to update order");
    },
  });

  return mutation;
};
