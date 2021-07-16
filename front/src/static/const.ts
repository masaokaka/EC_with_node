import { createRandomId } from "../utils/functions";

export const TAX = 0.1;

export const SIZE_M_STATUS = 0;
export const SIZE_L_STATUS = 1;
export const SIZE_NONE_STATUS = 9;
export const SIZE_M_PRICE = 200;
export const SIZE_L_PRICE = 300;

export const ORDER_STATUS_CART = 0;
export const ORDER_STATUS_UNPAID = 1;
export const ORDER_STATUS_PAID = 2;
export const ORDER_STATUS_UNDELIVERED = 3;
export const ORDER_STATUS_DELIVERED = 4;
export const ORDER_STATUS_CANCELLED = 9;

let string = createRandomId();
export const ORDER_COMP_TOKEN = string;
