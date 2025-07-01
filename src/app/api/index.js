// ----Login----

// ----Login----
export const LOGIN = "auth/login";
export const AUTHORIZE = "auth/authorize";
export const USER_ROLE = "userMaster/getRoleMaster";
export const LOGOUT = "auth/logout";
export const REFRESH_TOKEN = "auth/refresh-tokens";
export const CHANGE_PASSWORD = "auth/change-password";

// User Rights

// User Group Rights

// User Group

// Audit Logs

// Audit Logs Report

// User

// Company Master
export const ADD_COMPANY = "company/addCompany";
export const ADD_COMPANY_CONTACT = "company/addContact";
export const UPDATE_COMPANY = "company/updateCompany";
export const LIST_COMPANY = "company/listCompany";
export const LIST_ALL_COMPANY = "company/listCompany";
export const LIST_COMPANY_CONTACT = "company/listCompanyContact/%s";
export const GET_COMPANY_BYCODE = "company/listByCode/%s";
export const DELETE_COMPANY = "company/%s";
export const DELETE_COMPANY_CONTACT = "company/contact/%s";
export const UPDATE_COMPANY_CONTACT = "company/contact/%s";
export const GET_COMPANY_COMMON = "common/%s";
export const STATUS_COMPANYMASTER = "company/changeActiveCompany";
export const STATUS_UPDATE = "users/changeActiveUser/%s";
export const GET_COMMON = "common/%s";
export const LIST_LINE_MASTER = "lineManager/listLineManager";

// Password Policy

// General Setting

// Line Master
export const LIST_LINE = "line/listLine";
export const ADD_LINE = "line/addLine";
export const LINE_LISTBYID = "line/listLineById/%s";
export const LINE_UPDATEBYID = "line/updateLine";
export const ALL_LINE_LIST = "line/listLineDropdown";
// Product Master
export const PRODUCT_LIST = "product/listProducts";
export const ADD_PRODUCT = "product";
export const PRODUCT_LISTBYID = "product/%s";
export const ALL_PRODUCT_LIST = "product/listProductDropdown";

// Customer
export const LIST_CUSTOMER = "customerMaster/listCustomer";
export const ADD_CUSTOMER = "customerMaster/addCustomer";
export const UPDATE_CUSTOMER = "customerMaster/updateCustomer/%s";
export const ALL_CUSTOMER_LIST = "customerMaster/listAllCustomer";
export const GET_CUSTOMER_BYCODE = "customerMaster/listCustomerById/%s";

