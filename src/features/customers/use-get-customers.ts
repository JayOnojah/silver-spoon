import { client } from "@/src/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetCustomers = () => {
  const query = useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const response = await client.api.customers.$get();
      if (!response.ok) {
        throw new Error("Failed to fetch customers");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
