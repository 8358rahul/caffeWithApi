export const baseUrl = "http://192.168.1.13:8000/api/"

export const ApiEndpoints = {
    CATEGORYS: "categorys/",
    PRODUCT_MENUS: "product-menus/",
    ORDERS: "orders/",
    PENDING: "orders?order_status=1/",
    COMPLETED:"orders?order_status=2/",
    UPDATE:"order/",
}