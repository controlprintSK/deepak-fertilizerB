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
import { redirect } from "next/navigation";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

export default function CustomerAdd() {
  const [form] = Form.useForm();

  const handleBackToList = () => {
    redirect("/master/customer");
  };

  const handleCustomerSubmit = async (values) => {
    console.log("---->>--", values);
  };

  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  // ----- upload images -----
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
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
                title: "Add Customer",
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
          onFinish={handleCustomerSubmit}>
          <div style={{ width: "736px" }}>
            <Row gutter={[32]}>
              <Col span={12}>
                <Form.Item
                  label="Customer Code"
                  name="CustomerCode"
                  rules={[
                    { required: true, message: "Customer Code is required" },
                    {
                      max: 100,
                      message: "Customer Code cannot exceed 100 characters",
                    },
                  ]}>
                  <Input type="text" size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Customer Name"
                  name="CustomerName"
                  rules={[
                    { required: true, message: "Customer Name is required" },
                  ]}>
                  <Input type="text" size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Contact No."
                  name="ContactNo"
                  rules={[
                    { required: true, message: "Contact No. is required" },
                  ]}>
                  <Input type="text" size="large" />
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
                  ]}>
                  <Select
                    size="large"
                    placeholder="Select Customer Type"
                    options={[
                      {
                        value: "Distributor",
                        label: "Distributor",
                      },
                      {
                        value: "Stockiest",
                        label: "Stockiest",
                      },
                      {
                        value: "Dealer",
                        label: "Dealer",
                      },
                      {
                        value: "Customer",
                        label: "Customer",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="GSTIN."
                  name="GSTIN"
                  rules={[{ required: true, message: "GSTIN. is required" }]}>
                  <Input type="text" size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Customer Logo" name="CustomerLogo">
                  <>
                    <Upload
                      action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                      listType="picture-card"
                      fileList={fileList}
                      onPreview={handlePreview}
                      onChange={handleChange}>
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
                    alt="Customer Image"
                  />
                )}
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
                  ]}>
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Pin Code"
                  name="Pin Code"
                  rules={[
                    {
                      required: true,
                      message: "Please select your Pin Code!",
                    },
                  ]}>
                  <Input size="large" />
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
                  ]}>
                  <Input size="large" />
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
                  ]}>
                  <Input size="large" />
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
                  ]}>
                  <Input size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Status">
                  <Switch checkedChildren="On" unCheckedChildren="Off" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <div className="qc_mt_5 qc_pt_5">
                  <Space size="large">
                    <Button type="primary" htmlType="submit" size="large">
                      Save
                    </Button>
                    <Button htmlType="button" size="large">
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
