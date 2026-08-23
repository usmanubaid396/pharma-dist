export interface OrderItemDTO {
  productId: string;
  quantity: number;
}

export interface CreateOrderDTO {
  clientId: string;
  items: OrderItemDTO[];
}
