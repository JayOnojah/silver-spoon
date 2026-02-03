import { toast } from "sonner";
import { client } from "@/src/lib/hono";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ResponseType = InferResponseType<typeof client.api.customers.$post>;
type RequestType = InferRequestType<typeof client.api.customers.$post>["json"];

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.customers.$post({ json });
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer"] });
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
    onError: () => {
      toast.error("Failed to Create Customer");
    },
  });

  return mutation;
};
