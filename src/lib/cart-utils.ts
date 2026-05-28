export function getCartItemKey(item: { id: string; size?: string; cartItemId?: string }): string {
    return item.cartItemId || `${item.id}::${item.size || "default"}`;
}
