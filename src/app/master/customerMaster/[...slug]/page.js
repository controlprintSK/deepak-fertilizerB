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
  Switch,
  Upload,
} from "antd";
import MainLayout from "@/app/components/MainLayout";
import { redirect, useParams, useRouter } from "next/navigation";
import { PlusOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  displayMessage,
  fetchCompanyList,
  interpolate,
  searchPincode,
} from "@/utils/common";
import {
  deleteAPI,
  getAPI,
  postAPI,
  postFileAPI,
  putAPI,
  putFileAPI,
} from "@/utils/apiRequest";
import { ERROR_MSG_TYPE, SUCCESS_MSG_TYPE } from "@/constants/hardData";
import {
  ADD_CUSTOMER,
  GET_COMMON,
  GET_CUSTOMER_BYCODE,
  UPDATE_CUSTOMER,
} from "@/app/api";
import {
  REGEX_ALPHANUMERIC_WITHOUT_SPACE,
  regex_GSTIN_Number,
  regex_mobile,
  REGEX_NAME,
  REGEX_PINCODE,
} from "@/utils/validation";

export default function CustomerAdd() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState([]);
  const [fileList, setFileList] = useState([]);
  const [customerTypeList, setCustomerTypeList] = useState([]);
  const [customerTypeOption, setCustomerTypeOption] = useState([]);
  const [slug, setSlug] = useState([]);

  const handleBackToList = () => {
    redirect("/master/customerMaster");
  };

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params; // Unwrap the promise
      setSlug(resolvedParams.slug || []); // Ensure slug is always an array
    };

    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (Array.isArray(slug) && slug.length > 0 && slug[0] == "edit") {
      fetchCustomerData(slug[1]);
    }
  }, [slug]);

  const fetchCustomerData = async (_code) => {
    setLoading(true);
    try {
      let res = await getAPI(interpolate(GET_CUSTOMER_BYCODE, [_code]));

      setLoading(false);
      if (res?.status == 200) {
        setEditData(res?.data[0]);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching customer data:", error);
    }
  };

  useEffect(() => {
    if (editData && Object.keys(editData).length) {
      form.setFieldsValue({
        CustomerCode: editData?.CustomerCode,
        CustomerName: editData?.CustomerName,
        Address: editData?.Address,
        City: editData?.City,
        State: editData?.State,
        Country: editData?.Country,
        PinCode: editData?.Pincode,
        GSTIN: editData?.Gstin,
        CustomerType: editData?.CustomerType,
        CustomerLogo: editData?.CustomerLogo,
        ContactNo: editData?.ContactNo,
        Active: editData?.Active,
      });
      if (editData?.CustomerLogo) {
        setFileList([
          {
            uid: "-1",
            name: "existing_image.jpg",
            status: "done",
            url: `${process.env.NEXT_PUBLIC_BACKEND_BASE_IMG_URL}/${editData?.CustomerLogo}`,
          },
        ]);
      }
    }
  }, [editData]);
  console.log(editData, "editDataeditDataeditData", editData?.length);
  const fetchCustomerType = async () => {
    try {
      let res = await getAPI(interpolate(GET_COMMON, ["CUSTOMERTYPE"]));
      if (res?.status == 200) {
        setCustomerTypeList(res?.data);
      } else {
        setCustomerTypeList([]);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchCustomerType();
  }, []);

  useEffect(() => {
    const data = customerTypeList.map((val) => ({
      value: val?.Value,
      label: val?.Value,
    }));
    setCustomerTypeOption(data);
  }, [customerTypeList]);

  const handleCustomerSubmit = async (values) => {
    setLoading(true);
    const formData = new FormData();

    formData.append("CustomerCode", values?.CustomerCode);
    formData.append("CustomerName", values?.CustomerName);
    formData.append("CustomerType", values?.CustomerType);
    formData.append("ContactNo", values?.ContactNo);
    formData.append("Gstin", values?.GSTIN);
    formData.append("Address", values?.Address);
    formData.append("Pincode", values?.PinCode);
    formData.append("Country", values?.Country);
    formData.append("City", values?.City);
    formData.append("State", values?.State);
    formData.append("Active", values?.Active ? "1" : "0");

    if (fileList[0]?.originFileObj) {
      console.log("000000000");
      formData.append("CustomerLogo", fileList[0]?.originFileObj);
    }
    // else if (editData?.CustomerLogo) {
    //   console.log(fileList, "fileListfileList");
    //   console.log("1111111");
    //   try {
    //     const imageUrl = `${fileList?.url}`;
    //     const response = await fetch(imageUrl);
    //     const blob = await response.blob();
    //     const file = new File([blob], "existing_image.jpg", {
    //       type: blob.type,
    //     });
    //     formData.append("CustomerLogo", file);
    //   }
    //   catch (error) {
    //     console.error("Error fetching existing image:", error);
    //   }
    // }

    let res;
    try {
      if (slug && slug.length > 0 && slug[0] == "edit") {
        // res = await putFileAPI(UPDATE_CUSTOMER, formData);
        res = await putFileAPI(
          interpolate(UPDATE_CUSTOMER, [editData?.id]),
          formData
        );
      } else {
        res = await postFileAPI(ADD_CUSTOMER, formData);
      }
      setLoading(false);
      if (res.status === 200) {
        displayMessage(SUCCESS_MSG_TYPE, res?.message);
        setTimeout(() => {
          router.push("/master/customerMaster");
        }, 500);
      } else {
        message.error("Failed to update customer.");
      }
    } catch (error) {
      console.error("Update error:", error);
      message.error("An error occurred while Add/updating the customer.");
    }
  };

  const handlePostalCodeChange = async (e) => {
    const postalCode = e.target.value;
    if (!REGEX_PINCODE.test(postalCode)) {
      form.setFieldsValue({
        City: "",
        State: "",
        Country: "",
      });
      return;
    }
    try {
      const res = searchPincode(postalCode);
      if (res?.length) {
        let locationData = res[0];
        form.setFieldsValue({
          City: locationData.city,
          State: locationData.state,
          Country: "India",
        });
      } else {
        form.setFieldsValue({
          City: "",
          State: "",
          Country: "",
        });
      }
    } catch (error) {
      form.setFieldsValue({
        City: "",
        State: "",
        Country: "",
      });
    }
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const beforeUpload = (file) => {
    if (file?.size > 1048576) {
      message.error(`${file.name} maximum file size should be 1MB.`);
      return Upload.LIST_IGNORE;
    } else {
      // setFileList([...fileList, file]);
      return false;
    }
  };
  const onRemove = (file) => {
    setFileList(fileList.filter((item) => item.uid !== file.uid));
  };

  // ----- upload images -----
  return (
    <MainLayout>
      <div className="page_title_container">
        {/* <div className="component__name">Master</div> */}
        <div>
          <Breadcrumb
            items={[
              {
                title: "Master",
              },
              {
                title: (
                  <div className="cursor_pointer" onClick={handleBackToList}>
                    Customer
                  </div>
                ),
              },
              {
                title:
                  slug && slug.length > 0 && slug[0] == "edit"
                    ? "Update Customer"
                    : "Add Customer",
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
          initialValues={{
            Active: true,
          }}
          onFinish={handleCustomerSubmit}
        >
          <div style={{ width: "736px" }}>
            <Row gutter={[32]}>
              <Col span={12}>
                <Form.Item
                  label="Customer Code"
                  name="CustomerCode"
                  rules={[
                    { required: true, message: "Customer Code is required" },
                    {
                      pattern: REGEX_ALPHANUMERIC_WITHOUT_SPACE,
                      message: "Space and Special characters are not allowed!",
                    },
                    {
                      max: 20,
                      message: "Customer Code cannot exceed 20 characters",
                    },
                  ]}
                >
                  <Input
                    disabled={
                      slug && slug.length > 0 && slug[0] == "edit"
                        ? true
                        : false
                    }
                    style={{ textTransform: "uppercase" }}
                    type="text"
                    size="large"
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Customer Name"
                  name="CustomerName"
                  rules={[
                    { required: true, message: "Customer Name is required" },
                    {
                      pattern: REGEX_NAME,
                      message: "Special Characters are not allowed!",
                    },
                  ]}
                >
                  <Input type="text" size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Contact No."
                  name="ContactNo"
                  rules={[
                    { required: true, message: "Contact No. is required" },
                    {
                      pattern: regex_mobile,
                      message: "Invalid phone number format",
                    },
                    {
                      max: 10,
                      message: "only 10  digits are Allowed!",
                    },
                  ]}
                >
                  <Input maxLength={10} type="text" size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Customer Type"
                  name="CustomerType"
                  rules={[
                    {
                      required: true,
                      message: "Select Customer Type!",
                    },
                  ]}
                >
                  <Select
                    size="large"
                    showSearch
                    options={customerTypeOption}
                    filterOption={(input, option) => {
                      return (
                        option.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      );
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="GSTIN."
                  name="GSTIN"
                  rules={[
                    { required: true, message: "GSTIN. is required" },
                    {
                      pattern: regex_GSTIN_Number,
                      message: "Please enter correct GSTIN Numner!",
                    },
                  ]}
                >
                  <Input type="text" size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Customer Logo" name="CustomerLogo">
                  <div>
                    <Upload
                      listType="picture-card"
                      fileList={fileList}
                      onChange={onChange}
                      onPreview={onPreview}
                      beforeUpload={beforeUpload}
                      onRemove={onRemove}
                    >
                      {fileList.length < 1 && "+ Upload"}
                    </Upload>
                  </div>
                </Form.Item>
              </Col>
            </Row>
            <h3 className="qc_mb_5">Customer Address</h3>
            <Row gutter={[32]}>
              <Col span={24}>
                <Form.Item
                  label="Address"
                  name="Address"
                  rules={[
                    {
                      required: true,
                      message: "Please select your Address!",
                    },
                    {
                      max: 200,
                      message: "Only 200 characters are allowed!",
                    },
                  ]}
                >
                  <Input type="text" size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Pin Code"
                  name="PinCode"
                  rules={[
                    {
                      required: true,
                      message: "Please select your Pin Code!",
                    },
                    {
                      pattern: REGEX_PINCODE,
                      message: "Only 6 digits are allowed!",
                    },
                    {
                      max: 6,
                      message: "Only 6 digits are allowed!",
                    },
                  ]}
                >
                  <Input onChange={handlePostalCodeChange} size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Country"
                  name="Country"
                  rules={[
                    {
                      required: true,
                      message: "Please select your Country!",
                    },
                    {
                      max: 100,
                      message: "Only 100 characters are allowed!",
                    },
                  ]}
                >
                  <Input type="text" size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="State"
                  name="State"
                  rules={[
                    {
                      required: true,
                      message: "Please select your State!",
                    },
                    {
                      max: 100,
                      message: "Only 100 characters are allowed!",
                    },
                  ]}
                >
                  <Input type="text" size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="City"
                  name="City"
                  rules={[
                    {
                      required: true,
                      message: "Please select your City!",
                    },
                    {
                      max: 100,
                      message: "Only 100 characters are allowed!",
                    },
                  ]}
                >
                  <Input type="text" size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Active"
                  name="Active"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Switch
                    disabled={slug && slug.length > 0 && slug[0] == "edit"}
                    checkedChildren="On"
                    unCheckedChildren="Off"
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <div className="qc_mt_5 qc_pt_5">
                  <Space size="large">
                    <Button type="primary" htmlType="submit" size="large">
                      {slug && slug.length > 0 && slug[0] == "edit"
                        ? "Update Customer"
                        : "Add Customer"}
                    </Button>
                    <Button
                      htmlType="button"
                      size="large"
                      onClick={handleBackToList}
                    >
                      Cancel
                    </Button>
                  </Space>
                </div>
              </Col>
            </Row>
          </div>
        </Form>
      </div>
    </MainLayout>
  );
}
