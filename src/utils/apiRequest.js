import { handleErrorResponse } from './common';
import { AxiosInstance, AxiosInstanceWithoutLoader } from './http';

export const makeUrl = (url) => {
  if (!url.includes('http')) {
    return process.env.NEXT_PUBLIC_BACKEND_BASE_URL + '/' + url;
  } else {
    return url;
  }
};

export const makeFileURL = (URL) => URL;

export const getAPI = async (url, params = {}) => {
  try {
    const res = await AxiosInstance.get(makeUrl(url), {
      headers: {},
      params,
    });
    return res.data;
  } catch (error) {
    handleErrorResponse(error);
    return error?.response?.data;
  }
};

export const postAPI = async (url, formData, headerData) => {
  try {
    const res = await AxiosInstance.post(makeUrl(url), formData, {
      headers: { ...headerData },
    });
    return res.data;
  } catch (error) {
    handleErrorResponse(error);
    throw error?.response?.data;
  }
};

export const postFileAPI = async (url, formData) => {
  try {
    const res = await AxiosInstance.post(makeUrl(url), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (error) {
    handleErrorResponse(error);
    return error?.response?.data;
  }
};

export const postAPIWL = async (url, formData) => {
  try {
    const res = await AxiosInstanceWithoutLoader.post(makeUrl(url), formData, {
      headers: {},
    });
    return res.data;
  } catch (error) {
    handleErrorResponse(error);
    return error?.response?.data;
  }
};

export const putFileAPI = async (url, formData) => {
  try {
    const res = await AxiosInstance.put(makeUrl(url), formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  } catch (error) {
    handleErrorResponse(error);
    return error?.response?.data;
  }
};

export const putAPI = async (url, formData) => {
  try {
    const res = await AxiosInstance.put(makeUrl(url), formData, {
      headers: {},
    });
    return res.data;
  } catch (error) {
    handleErrorResponse(error);
    return error?.response?.data;
  }
};

export const deleteAPI = async (url, formData) => {
  try {
    const res = await AxiosInstance.delete(makeUrl(url), {
      headers: {},
      data: formData, // Fixed: Axios DELETE uses `data`, not `formData`
    });
    return res.data;
  } catch (error) {
    handleErrorResponse(error);
    return error?.response?.data;
  }
};
