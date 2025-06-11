import { dbcode } from "@/redux/userSlice";
import { handleErrorResponse } from "./common";
import store from "@/store/index";
import { AxiosInstance, AxiosInstanceWithoutLoader } from "./http";

export const makeUrl = (url) => {
  if (!url.includes("http")) {
    return process.env.NEXT_PUBLIC_BACKEND_BASE_URL + "/" + url;
  } else {
    return url;
  }
};

export const makeFileURL = function (URL) {
  return URL;
};

export const getAPI = (url, params = {}) => {
  const dbCode = dbcode(store.getState());
  return new Promise(async (resolve, reject) => {
    try {
      const res = await AxiosInstance.get(makeUrl(url), {
        headers: { ...(dbCode && { company: dbCode }) },
        params,
      });
      resolve(res.data);
    } catch (error) {
      resolve(error?.response?.data);
      handleErrorResponse(error);
    }
  });
};

export const postAPI = (url, formData, headerData) => {
  const dbCode = dbcode(store.getState());
  return new Promise(async (resolve, reject) => {
    try {
      const res = await AxiosInstance.post(makeUrl(url), formData, {
        headers: { ...(dbCode && { company: dbCode }), ...headerData },
      });

      resolve(res.data);
    } catch (error) {
      reject(error?.response?.data);
      handleErrorResponse(error);
    }
  });
};

export const postFileAPI = (url, formData) => {
  const dbCode = dbcode(store.getState());
  return new Promise(async (resolve, reject) => {
    try {
      const res = await AxiosInstance.post(makeUrl(url), formData, {
        headers: {
          ...(dbCode && { company: dbCode }),
          "Content-Type": "multipart/form-data",
        },
      });

      resolve(res.data);
    } catch (error) {
      resolve(error?.response?.data);
      handleErrorResponse(error);
    }
  });
};

export const postAPIWL = (url, formData) => {
  const dbCode = dbcode(store.getState());
  return new Promise(async (resolve, reject) => {
    try {
      const res = await AxiosInstanceWithoutLoader.post(
        makeUrl(url),
        formData,
        {
          headers: { ...(dbCode && { company: dbCode }) },
        }
      );

      resolve(res.data);
    } catch (error) {
      resolve(error?.response?.data);
      handleErrorResponse(error);
    }
  });
};
export const putFileAPI = (url, formData) => {
  const dbCode = dbcode(store.getState());
  return new Promise(async (resolve, reject) => {
    try {
      const res = await AxiosInstance.put(makeUrl(url), formData, {
        headers: {
          ...(dbCode && { company: dbCode }),
          "Content-Type": "multipart/form-data",
        },
      });

      resolve(res.data);
    } catch (error) {
      resolve(error?.response?.data);
      handleErrorResponse(error);
    }
  });
};

export const putAPI = (url, formData) => {
  const dbCode = dbcode(store.getState());
  return new Promise(async (resolve, reject) => {
    try {
      const res = await AxiosInstance.put(makeUrl(url), formData, {
        headers: {
          ...(dbCode && { company: dbCode }),
        },
      });

      resolve(res.data);
    } catch (error) {
      resolve(error?.response?.data);
      handleErrorResponse(error);
    }
  });
};

export const deleteAPI = (url, formData) => {
  const dbCode = dbcode(store.getState());
  return new Promise(async (resolve, reject) => {
    try {
      const res = await AxiosInstance.delete(makeUrl(url), {
        headers: { ...(dbCode && { company: dbCode }) },
        formData,
      });

      resolve(res.data);
    } catch (error) {
      resolve(error?.response?.data);
      handleErrorResponse(error);
    }
  });
};
