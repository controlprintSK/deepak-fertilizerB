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

export default function ProductAdd() {
  const [form] = Form.useForm();

  const handleBackToList = () => {
    redirect("/master/products");
  };

  const handleProductSubmit = async (values) => {
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
                    Product
                  </div>
                ),
              },
              {
                title: "Add Product",
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
          onFinish={handleProductSubmit}>
          <div style={{ width: "736px" }}>
            <Row gutter={[32]}>
              <Col span={12}>
                <Form.Item
                  label="Product Name"
                  name="ProductName"
                  rules={[
                    { required: true, message: "Product Name is required" },
                  ]}>
                  <Input type="text" size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Product Code"
                  name="ProductCode"
                  rules={[
                    { required: true, message: "Product Code is required" },
                    {
                      max: 100,
                      message: "Product Code cannot exceed 100 characters",
                    },
                  ]}>
                  <Input type="text" size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Product Type"
                  name="productType"
                  rules={[
                    {
                      required: true,
                      message: "Please select product type!",
                    },
                  ]}>
                  <Select
                    size="large"
                    placeholder="Please product type"
                    options={[
                      {
                        value: "MAL",
                        label: "MAL",
                      },
                      {
                        value: "IC",
                        label: "IC",
                      },
                      {
                        value: "Explosives",
                        label: "Explosives",
                      },
                    ]}
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
                  ]}>
                  <Select
                    size="large"
                    placeholder="Please select Weight"
                    options={[
                      {
                        value: "Weight 1",
                        label: "Weight 1",
                      },
                      {
                        value: "Weight 2",
                        label: "Weight 2",
                      },
                      {
                        value: "Weight 3",
                        label: "Weight 3",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="M.R.P."
                  name="mrp"
                  rules={[
                    {
                      required: true,
                      message: "Please select your M.R.P.!",
                    },
                  ]}>
                  <Input size="large" />
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
                    options={[
                      {
                        value: "UOM 1",
                        label: "UOM 1",
                      },
                      {
                        value: "UOM 2",
                        label: "UOM 2",
                      },
                      {
                        value: "UOM 3",
                        label: "UOM 3",
                      },
                    ]}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Add Product Image" name="ProductImage">
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
                    alt="product img"
                  />
                )}
              </Col>
              <Col span={12}>
                <Form.Item label="Active">
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
