export const baseUrl = "http://192.168.1.24:8000/api/"
export const ApiEndpoints = {
    CATEGORYS: "categorys/",
    PRODUCT_MENUS: "product-menus/",
    ORDERS: "order/",
    PENDING: "orders?order_status=1/",  
    COMPLETED:"orders?order_status=2/",
}