import { client } from "@/src/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetCatalogues = () => {
  const query = useQuery({
    queryKey: ["catalogues"],
    queryFn: async () => {
      const response = await client.api.catalogues.$get();
      if (!response.ok) {
        throw new Error("Failed to fetch catalogues");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};