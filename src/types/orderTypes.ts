export type OrderStatus =
    | 'Pending'
    | 'Confirmed'
    | 'Processing'
    | 'Shipped'
    | 'Delivered'
    | 'Cancelled';

export type Order = {
    id: string;
    business_id: string;
    customer_id: string | null;
    order_number: number;
    status: OrderStatus;
    total_amount: number;
    notes: string | null;
    created_at: string;
};

export type OrderItem = {
    id: string;
    order_id: string;
    product_id: string;
    quantity: number;
    unit_price: number;
    subtotal: number;
    created_at: string;
};