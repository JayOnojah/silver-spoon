import { client } from "@/lib/hono";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ResponseType = InferResponseType<
  (typeof client.api.customers)[":id"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api.customers)[":id"]["$patch"]
>["json"];

export const useEditCustomer = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.customers[":id"]["$patch"]({
        param: { id },
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      queryClient.invalidateQueries({ queryKey: ["customer", { id }] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
  });

  return mutation;
};
