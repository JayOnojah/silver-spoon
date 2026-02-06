import { toast } from "sonner";
import { client } from "@/src/lib/hono";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ResponseType = InferResponseType<typeof client.api.catalogues.$post>;
type RequestType = InferRequestType<typeof client.api.catalogues.$post>["json"];

export const useCreateCatalogue = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.catalogues.$post({ json });
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["catalogues"] });
      toast.success("Catalogue created successfully");
    },
    onError: () => {
      toast.error("Failed to create catalogue");
    },
  });

  return mutation;
};
