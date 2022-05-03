import { AdyenService } from "../../external/payment/index";
import { OrderRepository } from "../../repository/order/OrderRepository";
import { executeTransaction } from '../../core/utility/Transaction';

export class OrderService {

    static adyenService;
    static orderRepo;
    constructor() {
        this.adyenService = new AdyenService();
        this.orderRepo = new OrderRepository();
    }

    async saveOrders({ orderItems = [], order }) {
        const transaction = await executeTransaction()
        try {
            let savedOrder = await this.orderRepo.saveOrder(order, transaction);
            orderItems = orderItems.map(o => { return { ...o, orderId: savedOrder.id } });
            await this.orderRepo.saveOrderItems(orderItems, transaction);
            await transaction.commit();
            return savedOrder;
        }
        catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async makePayment({ paymentReq, order, orderItems }) {
        const savedOrder = await this.saveOrders({ orderItems, order })
        const paymentRes = await this.adyenService.makePayment(paymentReq);
        await this.updateOrderAfterPayment(savedOrder, paymentRes);
        return paymentRes;
    }

    async updateOrderAfterPayment(order, paymentRes) {
        order.updatedAt = new Date(); //move to trigger
        order.paymentReference = paymentRes.pspReference;
        order.paymentStatus = paymentRes.resultCode;
        return await this.orderRepo.updateOrder(order.dataValues);
    }

    async paymentMethods(paymentReq) {
        const paymentRes = await this.adyenService.getPaymentMethods(paymentReq);
        return paymentRes;
    }

    async allOrders(orderfilter) {
        const orderlist = await this.orderRepo.getAllOrders(orderfilter.filter ); //order by desc
        return orderlist;
    }
    
    async orderDetail(orderid) {
        const orderDetail = await this.orderRepo.getorderDetail({where:{id:orderid}}  );
        return orderDetail;
    }

    async closeOrder(orderid) {
        const closedOrder = await this.orderRepo.closeOrder({where:{id:orderid}}  )==1?"Order Closed":"";
        return closedOrder;
    }

}
