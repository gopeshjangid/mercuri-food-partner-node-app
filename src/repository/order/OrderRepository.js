import { Order } from "../../models/order/OrderModel";
import { OrderItem } from "../../models/order/OrderItemModel";

export class OrderRepository {

    async saveOrderItems(orderItems, transaction) {
        return OrderItem.bulkCreate(orderItems, { transaction });
    }

    async saveOrder(order, transaction) {
        return Order.create(order, { transaction });
    }

    async updateOrder(updatedData) {
        return Order.update(updatedData, { where: { id: updatedData.id } });
    }
    async getAllOrders(orderfilter) {
        return Order.findAll({where:{orderType:orderfilter}, order: [
            ['id', 'DESC'],
        ]});
    }
    
    async getorderDetail(orderid) {
        return Order.findOne(orderid);
    }

    async closeOrder(orderid) {
        return Order.update({orderType:"closed"}, orderid);
    }

}
