import { toast } from "sonner";
import { client } from "@/src/lib/hono";
import { InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type ResponseType = InferResponseType<
  (typeof client.api.catalogues)[":id"]["$delete"]
>;

export const useDeleteCatalogue = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseType, Error, string>({
    mutationFn: async (id: string) => {
      const response = await client.api.catalogues[":id"].$delete({
        param: { id },
      });
      if (!response.ok) {
        throw new Error("Failed to delete catalogue");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["catalogues"] });
      toast.success("Catalogue deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete catalogue");
    },
  });
};