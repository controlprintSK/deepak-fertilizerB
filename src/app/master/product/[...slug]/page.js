"use client";
import {
  Breadcrumb,
  Button,
  Col,
  DatePicker,
  Form,
  Image,
  Input,
  message,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Spin,
  Switch,
  Upload,
} from "antd";
import MainLayout from "@/app/components/MainLayout";
import { useRouter, useParams } from "next/navigation";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { REGEX_ALPHANUMERIC_WITH_SPACE, REGEX_ALPHANUMERIC_WITHOUT_SPACE } from "@/utils/validation";
import { ADD_PRODUCT, GET_COMMON, PRODUCT_LISTBYID } from "@/app/api";
import { getAPI, postFileAPI, putFileAPI } from "@/utils/apiRequest";
import { ERROR_MSG_TYPE, SUCCESS_MSG_TYPE } from "@/constants/hardData";
import { displayMessage, interpolate } from "@/utils/common";
import { useSelector } from "react-redux";

export default function ProductAdd() {
  const [form] = Form.useForm();
  const params = useParams();
  const router = useRouter();
  const { user } = useSelector((state) => state.userInfo);
  const [loading, setLoading] = useState(false);
  const [editProductData, seteditProductData] = useState();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const [productTypeList, setProductTypeList] = useState([]);
  const [productTypeOption, setProductTypeOption] = useState([]);
  const [productUomList, setProductUomList] = useState([]);
  const [productUomOption, setProductUomOption] = useState([]);
  const handleBackToList = () => {
    router.push("/master/product");
  };

  useEffect(() => {
    if (params?.slug[0] == 'edit') {
      getProductByCode();
    }
  }, [JSON.stringify(params)]);

  const getProductByCode = async () => {
    setLoading(true);
    try {
      const res = await getAPI(
        interpolate(PRODUCT_LISTBYID, [params?.slug[1]]),
      );
      setLoading(false);
      if (res?.status == 200) {
        seteditProductData(res?.data);
      } else {
        displayMessage(ERROR_MSG_TYPE, res?.message);
      }
    } catch (error) {
      setLoading(false);
      displayMessage(ERROR_MSG_TYPE, error?.message);
    }
  };
  //convert img url to base64
  const convertImageUrlToBase64 = async (url) => {
    try {
      const response = await fetch(url, {
        mode: 'cors', // use 'no-cors' only if the server blocks it, but it may return an opaque blob
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();

      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = () => resolve(reader.result);
        reader.onerror = (err) => reject(err);

        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error converting image URL to base64:', error);
      throw error;
    }
  };


  useEffect(() => {
    if (editProductData) {
      const {
        ProductCode,
        ProductName,
        ProductType,
        Weight,
        UOM,
        Mrp,
        ProductImage,
        Active,
      } = editProductData;
      form.setFieldsValue({
        ProductCode: ProductCode,
        ProductName: ProductName,
        ProductType: ProductType,
        ProductImageEdit: ProductImage,
        Weight: Number(Weight),
        UOM: UOM,
        Mrp: Number(Mrp),
        Active: Active,
      });

      // (async () => {
      //   const url = `${process.env.NEXT_PUBLIC_BACKEND_BASE_IMG_URL}${ProductImage}`;
      //   try {
      //     const base64 = await convertImageUrlToBase64(url);
      //     setFileList([
      //       {
      //         uid: '-1',
      //         name: ProductName,
      //         status: 'done',
      //         url: base64, // this is how Upload shows image from backend
      //       },
      //     ]);
      //   } catch (e) {
      //     console.error('Failed to convert image:', e);
      //   }
      // })();
      setFileList([
        {
          uid: '-1',
          name: ProductName,
          status: 'done',
          url: ProductImage, // this is how Upload shows image from backend
        },
      ]);
    }
  }, [editProductData]);
  // ----- upload images -----
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => { setFileList(newFileList) };

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button">
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}>
        Upload
      </div>
    </button>
  );
  // ----- upload images -----

  //------ fetch fproduct Type & UOM list -----
  const fetchProductType = async () => {
    try {
      let res = await getAPI(interpolate(GET_COMMON, ['PRODUCTTYPE']));
      if (res?.status == 200) {
        setProductTypeList(res?.data);
      } else {
        setProductTypeList([]);
      }
    } catch (error) { }
  };
  const fetchProductUom = async () => {
    try {
      let res = await getAPI(interpolate(GET_COMMON, ['PRODUCTUOM']));
      if (res?.status == 200) {
        setProductUomList(res?.data);
      } else {
        setProductUomList([]);
      }
    } catch (error) { }
  };

  useEffect(() => {
    fetchProductType();
    fetchProductUom();
  }, []);
  useEffect(() => {
    const data = productTypeList.map((val) => ({
      value: val?.Value,
      label: val?.Value,
    }));
    const uomData = productUomList.map((val) => ({
      value: val?.Value,
      label: val?.Value,
    }));
    setProductUomOption(uomData)
    setProductTypeOption(data);
  }, [productTypeList, productUomList]);

  const handleProductSubmit = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('ProductCode', String(values.ProductCode)?.toUpperCase());
      formData.append('ProductName', values.ProductName);
      formData.append('ProductType', values.ProductType);
      formData.append('Weight', Number(values.Weight));
      formData.append('Mrp', Number(values.Mrp));
      formData.append('UOM', values.UOM);
      formData.append('Active', Number(values.Active));
      formData.append('CompanyCode', user?.CurrentCompany);
      formData.append('Status', 1);

      // if (fileList[0].originFileObj) {
      //   formData.append('ProductImage', values?.ProductImage?.file?.originFileObj);
      // }
      // else if (existingImagePath) {
      //   formData.append('ProductImageEdit', values.ProductImage);
      // }
      const res = editProductData
        ? await putFileAPI(
          interpolate(PRODUCT_LISTBYID, [editProductData?.ProductCode]),
          formData,
        )
        : await postFileAPI(ADD_PRODUCT, formData);
      setLoading(false);
      if (res?.status == 200) {
        editProductData
          ? displayMessage(SUCCESS_MSG_TYPE, res?.message)
          : displayMessage(SUCCESS_MSG_TYPE, res?.message);
        setTimeout(() => {
          router.push('/master/product');
        }, 1000);
      } else {
        displayMessage(ERROR_MSG_TYPE, res?.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error, "errore")
      displayMessage(
        ERROR_MSG_TYPE,
        'An error occurred while adding the product.',
      );
    }
  };





  const getValidImagePath = (images) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const validImage = images.find((img) => {
      const start = new Date(img.StartDate);
      const end = new Date(img.EndDate);
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);
      return today >= start && today <= end;
    });
    return validImage?.path
      ? `${process.env.NEXT_PUBLIC_BACKEND_BASE_IMG_URL
      }/${validImage.path.replace('public/', '')}`
      : '/images/default-image.png';
  };

  return (
    <MainLayout>
      <Spin spinning={loading}>
        <div className="page_title_container">
          <div>
            <Breadcrumb
              items={[
                {
                  title: "Master",
                },
                {
                  title: (
                    <div className="cursor_pointer" onClick={handleBackToList}>
                      Product
                    </div>
                  ),
                },
                {
                  title: editProductData ? "Update Product" : "Add Product",
                },
              ]}
            />
          </div>
        </div>
        <div className="qc_page_container">
          <Form
            name="basic"
            form={form}
            layout="vertical"
            autoComplete="off"
            onFinish={handleProductSubmit}
            initialValues={{ Active: true, CompanyCode: `${user?.CurrentCompany}` }}>
            <div style={{ width: "736px" }}>
              <Row gutter={[32]}>
                <Col span={12}>
                  <Form.Item
                    label="Product Name"
                    name="ProductName"
                    rules={[
                      { required: true, message: "Product Name is required" },
                      {
                        pattern: REGEX_ALPHANUMERIC_WITH_SPACE,
                        message: 'Special characters are not allowed!',
                      },
                      {
                        max: 100,
                        message: 'Max 100 characters are Allowed!',
                      },
                    ]}>
                    <Input name="ProductName" type="text" size="large" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Product Code"
                    name="ProductCode"
                    rules={[
                      { required: true, message: "Product Code is required" },
                      {
                        pattern: REGEX_ALPHANUMERIC_WITHOUT_SPACE,
                        message:
                          'Space and Special characters are not allowed!',
                      },
                      {
                        max: 20,
                        message: "Product Code cannot exceed 20 characters",
                      },
                    ]}>
                    {/*edit mode then read-only */}
                    <Input name="ProductCode" type="text" size="large" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Product Type"
                    name="ProductType"
                    rules={[
                      {
                        required: true,
                        message: "Please select product type!",
                      },
                    ]}>
                    <Select
                      name="ProductType"
                      size="large"
                      placeholder="Please select product type"
                      options={productTypeOption}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Weight"
                    name="Weight"
                    rules={[
                      {
                        required: true,
                        message: "Please select Weight!",
                      },
                      {
                        validator: (_, value) => {
                          if (value === undefined || value === null || value === '') {
                            return Promise.resolve();
                          }

                          const numValue = Number(value);

                          if (isNaN(numValue)) {
                            return Promise.reject('Weight must be a number');
                          }

                          if (String(Math.floor(numValue)).length > 5) {
                            return Promise.reject('Weight cannot exceed 5 characters');
                          }

                          return Promise.resolve();
                        },
                      },
                    ]}>
                    <Input name="Weight" size="large" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="M.R.P."
                    name="Mrp"
                    rules={[
                      {
                        required: true,
                        message: "Please select your M.R.P.!",
                      },
                      {
                        validator: (_, value) => {
                          if (value === undefined || value === null || value === '') {
                            return Promise.resolve();
                          }

                          const numValue = Number(value);

                          if (isNaN(numValue)) {
                            return Promise.reject('Weight must be a number');
                          }

                          if (String(Math.floor(numValue)).length > 10) {
                            return Promise.reject('Weight cannot exceed 10 characters');
                          }

                          return Promise.resolve();
                        },
                      },
                      {
                        pattern: REGEX_ALPHANUMERIC_WITH_SPACE,
                        message: 'Special characters are not allowed!',
                      },
                    ]}>
                    <Input name="mrp" size="large" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="UOM"
                    name="UOM"
                    rules={[
                      {
                        required: true,
                        message: "Please select UOM!",
                      },
                    ]}>
                    <Select
                      size="large"
                      placeholder="Please select UOM"
                      options={productUomOption}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Add Product Image" name="ProductImage">
                    <>
                      <Upload
                        listType="picture-card"
                        name="ProductImage"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                      >
                        {fileList.length >= 1 ? null : uploadButton}
                      </Upload>
                    </>
                  </Form.Item>
                  {previewImage && (
                    <Image
                      wrapperStyle={{ display: "none" }}
                      preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) =>
                          !visible && setPreviewImage(""),
                      }}
                      src={previewImage}
                      alt="product img"
                      crossOrigin="anonymous"
                    />
                  )}
                </Col>
                <Col span={12}>
                  <Form.Item label="Active" name="Active">
                    <Switch defaultChecked checkedChildren="On" unCheckedChildren="Off" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <div className="qc_mt_5 qc_pt_5">
                    <Space size="large">
                      <Button type="primary" htmlType="submit" size="large">
                        Save
                      </Button>
                      <Button htmlType="button" size="large" onClick={handleBackToList}>
                        Cancel
                      </Button>
                    </Space>
                  </div>
                </Col>
              </Row>
            </div>
          </Form>
        </div>
      </Spin>
    </MainLayout>
  );
}
