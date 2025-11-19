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

export type ProductImages = {
    ingredients: Map<string, number>
    packaging: Map<string, number>
    front: Map<string, number>
    nutrition: Map<string, number>
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
    negative: ProductComponent
    positive: ProductComponent
}

export type ProductComponent = {
    id: string
    value: number
    unit: string
    points: number
    maxPoints: number
}
