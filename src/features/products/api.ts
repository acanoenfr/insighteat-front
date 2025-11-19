import { api } from "@/shared/api/http"
import type { ProductResponse } from "./types"

export const getProduct = (code: string) =>
    api.get<ProductResponse>(`/products/${code}`)
