// Single source of truth for order totals. Used by the cart, the checkout page
// and the payment API so the amount shown is always the amount charged.

export const FREE_SHIPPING_THRESHOLD = 999;
export const SHIPPING_FEE = 60;

export function calculateShipping(subtotal: number): number {
    if (subtotal <= 0) return 0;
    return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
}

export function calculateOrderTotal(subtotal: number): { subtotal: number; shippingFee: number; total: number } {
    const shippingFee = calculateShipping(subtotal);
    return { subtotal, shippingFee, total: subtotal + shippingFee };
}
