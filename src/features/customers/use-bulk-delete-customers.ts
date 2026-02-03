import { toast } from "sonner";
import { client } from "@/lib/hono";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ResponseType = InferResponseType<
  (typeof client.api.customers)["bulk-delete"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.customers)["bulk-delete"]["$post"]
>["json"];

export const useBulkDeleteCustomers = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.customers["bulk-delete"]["$post"]({
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Customers Deleted Successfully!");
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
    onError: () => {
      toast.error("Failed to Delete Customers");
    },
  });

  return mutation;
};
