export type ProductResponse = {
    code: string
    name: string
    brandName: string
    quantity: string
    data: ProductData
    ecoscore: string
    ingredients: string
    nutritionDataPer: string
    imageUrl: string
    images: ProductImages
    novaGroup: number
}

export type ProductImage = {
    fr?: number
    en?: number
}

export type ProductImages = {
    ingredients: ProductImage
    packaging: ProductImage
    front: ProductImage
    nutrition: ProductImage
}

export type ProductData = {
    grade: string
    score: number
    positivePoints: number
    maxPositivePoints: number
    negativePoints: number
    maxNegativePoints: number
    positiveNutrients: string[]
    isCheese: boolean
    isWater: boolean
    isBeverage: boolean
    isRedMeatProduct: boolean
    isFatOilNutsSeeds: boolean
    components: ProductComponents
}

export type ProductComponents = {
    negative: ProductComponent[]
    positive: ProductComponent[]
}

export type ProductComponent = {
    id: string
    value: number
    unit: string
    points: number
    maxPoints: number
}
