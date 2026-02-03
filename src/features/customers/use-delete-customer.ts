import { toast } from "sonner";
import { client } from "@/src/lib/hono";
import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ResponseType = InferResponseType<
  (typeof client.api.customers)[":id"]["$delete"]
>;

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseType, Error, string>({
    mutationFn: async (id: string) => {
      const response = await client.api.customers[":id"].$delete({
        param: { id },
      });
      if (!response.ok) {
        throw new Error("Failed to delete customer");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
    onError: () => {
      toast.error("Failed to delete customer");
    },
  });
};
