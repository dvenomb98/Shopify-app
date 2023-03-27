export enum URLS {
    CATEGORY = "/kategorie",
    PRODUCTS = "/produkty",
    CHECKOUT = "/checkout",
    SUCCESS = "/checkout/?success=true",
    CANCELED = "/checkout/?canceled=true"
}

export enum FormStatus {
    UNSENT = "unsent",
    ERROR = "error",
    SUCCESS = "success"
}

export enum API {
    CREATE_CHECKOUT = "/api/create-checkout-session"
}
