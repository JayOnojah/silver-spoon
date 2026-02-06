import { toast } from "sonner";
import { client } from "@/src/lib/hono";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ResponseType = InferResponseType<
  (typeof client.api.catalogues)[":id"]["$patch"]
>;
type RequestType = InferRequestType<
  (typeof client.api.catalogues)[":id"]["$patch"]
>["json"];

export const useEditCatalogue = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.catalogues[":id"].$patch({
        param: { id },
        json,
      });
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["catalogues"] });
      queryClient.invalidateQueries({ queryKey: ["catalogue", { id }] });
      toast.success("Catalogue updated successfully");
    },
    onError: () => {
      toast.error("Failed to update catalogue");
    },
  });

  return mutation;
};