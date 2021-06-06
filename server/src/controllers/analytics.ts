import { IOrder } from './../models/Order';
import { Request, Response } from "express"
import moment from "moment"
import Order from "../models/Order"
import errorHandler from "../utils/ErrorHandler"


export const overview = async (req: Request, res: Response) => {
    try {
        const allOrders = await Order.find().sort({ date: 1 })
        const ordersMap = getOrdersMap(allOrders)
        const yesterday = moment().add(-1, 'd').format('DD.MM.YYYY')
        const yesterdayOrders = ordersMap[yesterday] || []

        // The number of orders yesrterday
        const yesterdayOrdersNumber = yesterdayOrders.length
        // The number of Orders
        const totalOrdersNumber = allOrders.length
        // The number of days at all
        const daysNumber = Object.keys(ordersMap).length
        // The number of orders per day
        const ordersPerDay = Math.round(totalOrdersNumber / daysNumber)
        // The percentage of orders for yesterday compared to the average
        const ordersPercent = Math.round(((yesterdayOrdersNumber / ordersPerDay) - 1) * 100)
        // Total revenue
        const totalRevenue = calcMoney(allOrders)
        // The revenue per day
        const revenuePerDay = totalRevenue / daysNumber
        // The revenue for yesterday
        const yesterdayRevenue = calcMoney(yesterdayOrders)
        // The percentage of revenue
        const revenuePercent = Math.round(((yesterdayRevenue / revenuePerDay) - 1) * 100)
        // Сomparison of revenue
        const comparedRevenue = Math.round(yesterdayRevenue - revenuePerDay)
        // Comparison of the number of Orders
        const comparedNumber = Math.round(yesterdayOrders - ordersPerDay)

        res.status(200).json({
            revenue: {
                percent: Math.abs(revenuePercent),
                compare: Math.abs(comparedRevenue),
                yesterday: yesterdayRevenue,
                isHigher: revenuePercent > 0
            },
            orders: {
                percent: Math.abs(ordersPercent),
                compare: Math.abs(comparedNumber),
                yesterday: yesterdayOrdersNumber,
                isHigher: ordersPercent > 0
            }
        })

    }
    catch (err) {
        errorHandler(err, res)
    }
}

export const analytics = async (req: Request, res: Response) => {
    try {
        const allOrders = await Order.find().sort({ date: 1 })
        const ordersMap = getOrdersMap(allOrders)

        const days = Object.keys(ordersMap).length
        const averageSum = Math.round(calcMoney(allOrders) / days)

        const chart = Object.keys(ordersMap).map(label => {
            // label === 03.05.2021
            const revenue = calcMoney(ordersMap[label])
            const order = ordersMap[label].length

            return { label, order, revenue }
        })

        res.status(200).json({ averageSum, chart })
    }
    catch (err) {
        errorHandler(err, res)
    }
}


function getOrdersMap(orders: IOrder[]) {
    const daysOrders: any = {}

    orders.forEach(order => {
        const date = moment(order.date).format('DD.MM.YYYY')

        if (date === moment().format('DD.MM.YYYY')) return
        if (!daysOrders[date]) {
            daysOrders[date] = []
        }

        daysOrders[date].push(order)
    })

    return daysOrders
}

function calcMoney(orders: IOrder[]) {
    return orders.reduce((acc, order) => {
        const orderPrice = caclOrderPrice(order)
        acc += orderPrice
        return acc
    }, 0)
}

function caclOrderPrice(order: IOrder) {
    return order.list.reduce((acc, item) => {
        acc += item.cost
        return acc
    }, 0)
}