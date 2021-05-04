export interface User {
    email: string
    password: string
}

export interface Category {
    name: string
    imageSrc?: string
    user?: User
    _id: string
}

export interface Position {
    name: string
    cost: number
    user?: string
    category: string
    _id?: string
    quantity?: number
}

export interface Order {
    date?: Date
    order?: number
    user?: string
    list: OrderListElement[]
    _id?: string
}

export interface OrderListElement {
    name: string
    cost: number
    quantity: number
    _id?: string
}

export interface Filter {
    start?: Date
    end?: Date
    order?: number
}

export interface Overview {
    revenue: OverviewItem
    orders: OverviewItem
}

export interface OverviewItem {
    percent: number
    compare: number
    yesterday: number
    isHigher: boolean
}

export interface Analytics {
    averageSum: number
    chart: ChartItem[]
}

export interface ChartItem {
    revenue: number
    label: string
    order: number
}