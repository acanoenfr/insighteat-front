import { useQuery } from "@tanstack/react-query";

import { getProduct } from "../api";
import type { ProductResponse } from "../types";

export function useProduct(code: string) {
    return useQuery<ProductResponse, Error>({
        queryKey: ['code', code],
        queryFn: () => getProduct(code),
        enabled: !!code
    })
}
