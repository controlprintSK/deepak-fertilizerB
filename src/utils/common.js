import { message } from "antd";
import {
  ERROR_MESSAGE_400,
  ERROR_MESSAGE_404,
  ERROR_MESSAGE_500,
  ERROR_MSG_TYPE,
  INFO_MSG_TYPE,
  SUCCESS_MSG_TYPE,
  WARNING_MSG_TYPE,
} from "@/constants/hardData";
import pincodeData from "@/constants/pincode.json";
import jwt from "jsonwebtoken";
import { getAPI, postAPI } from "./apiRequest";
import { LIST_COMPANY, USER_ROLE } from "@/app/api";
import { allPageRights } from "@/redux/rightSlice";
import store from "@/store/index";

export default function Myfunc() {}

export const interpolate = function (theString, argumentArray) {
  const regex = /%s/;
  const _r = function (p, c) {
    return p.replace(regex, c);
  };
  return argumentArray.reduce(_r, theString);
};

export const displayMessage = function (type, msg) {
  if (type === SUCCESS_MSG_TYPE)
    message.success({
      content: msg,
      duration: 5,
      style: {
        marginTop: "10vh",
      },
    });
  else if (type === INFO_MSG_TYPE)
    message.info({
      content: msg,
      style: {
        marginTop: "10vh",
      },
    });
  else if (type === WARNING_MSG_TYPE)
    message.warning({
      content: msg,
      style: {
        marginTop: "10vh",
      },
    });
  else if (type === ERROR_MSG_TYPE)
    message.error({
      content: msg,
      style: {
        marginTop: "10vh",
      },
    });
};

export const handleErrorResponse = function (error) {
  const { response } = error;
  if (response) {
    const { status } = response;
    if (status === 400) {
      if (response.data.message) {
        message.error(response.data.message);
      } else {
        message.error(ERROR_MESSAGE_400);
      }
    } else if (status === 404) {
      if (response.data.message) {
        message.error(response.data.message);
      } else {
        message.error(ERROR_MESSAGE_404);
      }
    } else if (status === 500) {
      message.error(ERROR_MESSAGE_500);
    }
  } else {
    // message.error(ERROR_INTERNET_CONNECTIVITY);
  }
};

export const stringCapitalize = (stringValue) => {
  if (stringValue) {
    return stringValue.charAt(0).toUpperCase() + stringValue.slice(1);
  } else {
    return " ";
  }
};

export const searchPincode = (pincode) => {
  function isNumeric(num) {
    return !isNaN(num);
  }

  if (isNumeric(pincode)) {
    if (typeof pincode === "string") {
      return pincodeData.filter(function (e) {
        return e.pincode === pincode;
      });
    } else if (typeof pincode === "number") {
      return pincodeData.filter(function (e) {
        return e.pincode == pincode;
      });
    }
  } else {
    var regex = RegExp(pincode, "i");
    return pincodeData.filter(function (e) {
      return e.office.match(regex);
    });
  }
};

// -----------------

export const usePageAccess = (pageId, rightIds) => {
  const userRights = allPageRights(store.getState());
  const pageRights =
    userRights.find((page) => page.PageId === pageId)?.Rights || [];

  const allElementsExist = rightIds.some((element) =>
    pageRights.includes(element)
  );
  return allElementsExist;
};

export const getRoleNameByID = (_roleList, _roleId) => {
  let roleName = _roleList?.reduce((acc, role) => {
    return role.RoleId == _roleId ? role.RoleName : acc;
  }, null);
  return roleName;
};

export const createRightMaster = (token) => {
  var decoded = jwt.decode(token);

  console.log("decoded :>> ", decoded);
  // let userModules = decoded?.userModules;
  // let rights = [];

  // for (const item of userModules) {
  //   for (const val of item?.pages) {
  //     rights.push({
  //       PageId: val?.PageId,
  //       PageUrl: val?.PageUrl,
  //       Rights: val?.Rights,
  //     });
  //   }
  // }

  // return { userModules, rights };
};
export const fetchCompanyList = async () => {
  try {
    let res = await postAPI(LIST_COMPANY);

    if (String(res?.status).includes("200")) {
      return res?.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log("error :>> ", error);
  }
};

export const fetchUserRoleList = async () => {
  try {
    let res = await getAPI(USER_ROLE);

    if (String(res?.status).includes("20")) {
      return res?.data;
    } else {
      return [];
    }
  } catch (error) {
    console.log("error :>> ", error);
  }
};

// export const checkDiffInObjecs = (obj1, obj2) => {
//   let res = '';
//   for (const [key, value] of Object.entries(obj1)) {
//     if (value != obj2[key]) {
//       res += `<div><span style='font-weight:600;'>${key}:&nbsp;</span> <span style='text-decoration: line-through;margin-right:5px;opacity:0.7;'>${value}</span> <span>${obj2[key]}</span></div>`;
//     }
//   }

//   return res;
// };

export const checkDiffInObjecs = (obj1, obj2) => {
  let res = "";

  for (const [key, value] of Object.entries(obj1)) {
    if (Array.isArray(value) && Array.isArray(obj2[key])) {
      // Compare arrays
      if (
        value.length !== obj2[key].length ||
        !value.every((val, index) => val === obj2[key][index])
      ) {
        res += `<div><span style='font-weight:600;'>${key}:&nbsp;</span> <span style='text-decoration: line-through;margin-right:5px;opacity:0.7;'>${value}</span> <span>${obj2[key]}</span></div>`;
      }
    } else if (value !== obj2[key]) {
      // Compare primitive values
      res += `<div><span style='font-weight:600;'>${key}:&nbsp;</span> <span style='text-decoration: line-through;margin-right:5px;opacity:0.7;'>${value}</span> <span>${obj2[key]}</span></div>`;
    }
  }

  return res;
};
