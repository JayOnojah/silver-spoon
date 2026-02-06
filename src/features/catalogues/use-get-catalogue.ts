import { client } from "@/src/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetCatalogue = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["catalogue", { id }],
    queryFn: async () => {
      const response = await client.api.catalogues[":id"].$get({
        param: { id },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch catalogue");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};