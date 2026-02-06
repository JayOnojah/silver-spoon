import { client } from "@/src/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetBusiness = (id?: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["businesses", { id }],
    queryFn: async () => {
      const response = await client.api.businesses[":id"].$get({
        param: { id },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch business data");
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
