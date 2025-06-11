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
import { REGEX_ALPHANUMERIC_WITH_SPACE, REGEX_ALPHANUMERIC_WITHOUT_SPACE } from "@/utils/validation";

export default function ProductAdd({ params }) {
  const [form] = Form.useForm();
  console.log('Params:', params)
  const handleBackToList = () => {
    redirect("/master/product");
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
                      max: 100,
                      message: "Product Code cannot exceed 100 characters",
                    },
                  ]}>
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
                    {
                      max: 5,
                      message: "Weight cannot exceed 5 characters"
                    }
                  ]}>
                  <Select
                    size="large"
                    name="Weight"
                    placeholder="Please select Weight"
                    data-testid="Weight"
                    options={[
                      {
                        value: "Wgh",
                        label: "Wgh",
                      },
                      {
                        value: "Wght 2",
                        label: "Wght 2",
                      },
                      {
                        value: "Wght 3",
                        label: "Wght 3",
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
                    {
                      max: 10,
                      message: "M.R.P. cannot exceed 10 characters including two decimal"
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
                      name="ProductImage"
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
                  <Switch defaultChecked checkedChildren="On" unCheckedChildren="Off" />
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
