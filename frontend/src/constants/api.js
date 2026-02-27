export const BASE_URL = "http://localhost:8080";

export const UsersEndpoit = {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    GET_PROFILE: "/api/users/perfil",
    UPDATE_PROFILE: "/api/users/perfil",
    UPDATE_PASSWORD: "/api/users/senha",
    CAMPOS_REAIS: "/api/users/reais",
    DELETE_ACCOUNT: "/api/users/conta",
};

export const ProductsEndpoint = {
    GET_ALL: "/products",
    GET_PAGED: "/products/paged",
    GET_BY_ID: "/products/:id",
    GET_BY_CATEGORY: "/products/category/:category",
    CREATE: "/products",
    UPDATE: "/products/:id",
    DELETE: "/products/:id",
};

export const CheckoutEndpoint = {
  CHECKOUT: "/api/checkout",
};

export const AddressEndpoint = {
  CREATE: "/api/address",
  FIND_ADDRESSES: "/api/address/has",
};
