import { toast } from "sonner";
import { client } from "@/src/lib/hono";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ResponseType = InferResponseType<typeof client.api.businesses.$post>;
type RequestType = InferRequestType<typeof client.api.businesses.$post>["json"];

export const useCreateBusiness = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.businesses.$post({ json });
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Business created successfully!");
      queryClient.invalidateQueries({ queryKey: ["business"] });
      queryClient.invalidateQueries({ queryKey: ["businesses"] });
      queryClient.invalidateQueries({ queryKey: ["summary"] });
    },
    onError: () => {
      toast.error("Failed to Create Business");
    },
  });

  return mutation;
};
