// ----Login----

// ----Login----
export const LOGIN = "auth/login";
export const AUTHORIZE = "auth/authorize";

export const LOGOUT = "auth/logout";
export const REFRESH_TOKEN = "auth/refresh-tokens";
export const GET_USER_BYCODE = "users/getUserByCode";
export const USER_ROLE = "userMaster/getRoleMaster";
export const CHANGE_PASSWORD = "auth/change-password";

// User Rights
export const GET_ALL_MENU = "userMaster/getAllMenu";
export const ADD_USER_RIGHTS = "userMaster/addUserRights";

// User Group Rights
export const GET_ALL_MENU_GROUP_RIGHT = "userMaster/getAllMenuForUserGroup";
export const UPDATE_GROUP_RIGHT = "userMaster/addRemoveUserGroupsRights";

// User Group
export const ADD_USER_GROUP = "usergroup/add";
export const EDIT_USER_GROUP = "usergroup/update/%s";
export const LIST_USER_GROUP = "usergroup/list";
export const STATUS_USERGROUP = "usergroup/ChangeStatus/%s";

// Audit Logs
export const LIST_AUDIT_LOGS = "auditsTrail/listAllTrails";

// Audit Logs Report
export const EXPORT_AUDITS_LOGS = "auditsTrail/exportAuditsLogs";

// User
export const CREAT_USER = "users/create-user";
export const USER_LIST = "users";
export const USER_LISTLOCALBYID = "users/%s";
export const DELETE_USER = "users/%s";
export const GET_USER_DATA = "users/%s";
export const LOCK_UNLOCK_USER = "users/unlockUser/%s";
export const STATUS_UPDATE = "users/changeActiveUser/%s";

// Company Master
export const LIST_COMPANY = "company/listCompany";
export const UPDATE_COMPANY = "company/updateCompany/%s";
export const LIST_COMPANY_CONTACT = "company/listCompanyContact/%s";
export const GET_COMPANY_BYCODE = "company/listCompanyDetailsById/%s";
export const GET_COMPANY_COMMON = "common/%s";
export const UPDATE_COMPANY_CONTACT = "company/contact/%s";
export const DELETE_COMPANY_CONTACT = "company/contact/%s";
export const STATUS_COMPANYMASTER = "company/changeActiveCompany";
export const ADD_COMPANY_CONTACT = "company/addContact";
export const ADD_COMPANY = "company/addCompany";

// Password Policy
export const LIST_PASSWORD_POLICY = "passwordPolicy/get";
export const UPDATE_PASSWORD_POLICY = "passwordPolicy/update/%s";

// General Setting
export const LIST_GENERAL_SETTING = "generalSettings/get";
export const UPDATE_GENERAL_SETTING = "generalSettings/update/%s";

// Line Master
export const ADD_LINE_MASTER = "lineMaster/add";
export const LIST_LINE_MASTER = "lineMaster/get";
export const LINE_LIST_BY_ID = "lineMaster/getById/%s";
export const LINE_UPDATE_BY_ID = "lineMaster/update/%s";
// Product
export const ADD_PRODUCT = "productmaster/add";
export const LIST_PRODUCT = "productmaster/get";
export const LIST_ALL_PRODUCT = "productmaster/getAllProduct";
export const UPDATE_PRODUCT = "productmaster/update/%s";
export const STATUS_PRODUCTMASTER = "productmaster/ChangeStatus/%s";
export const PRODUCT_LISTBYID = "productmaster/getByProductCode/%s";
export const ALL_PRODUCT_LIST = "productmaster/getAllProduct";

export const GET_COMMON = "common/%s";
