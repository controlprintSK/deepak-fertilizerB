"use client";
import React from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Tabs,
  Upload,
} from "antd";
import MainLayout from "@/app/components/MainLayout";
import { redirect } from "next/navigation";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
const { TextArea } = Input;
const { Dragger } = Upload;

export default function ProductionAdd() {
  const [form] = Form.useForm();

  const handleBackToList = () => {
    redirect("/transaction/production");
  };

  const handleProductionSubmit = async (values) => {
    console.log("values--->>--", values);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const props = {
    name: "file",
    multiple: true,
    beforeUpload: () => false,
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <MainLayout>
      <div className="page_title_container">
        {/* <div className="component__name">Transaction</div> */}
        <div>
          <Breadcrumb
            items={[
              {
                title: "Transaction",
              },
              {
                title: (
                  <div className="cursor_pointer" onClick={handleBackToList}>
                    Production
                  </div>
                ),
              },
              {
                title: "Add Production",
              },
            ]}
          />
        </div>
      </div>
      <div className="qc_page_container">
        <Row gutter={[16, 16]}>
          <Col span={14}>
            <Card>
              <Form
                name="basic"
                form={form}
                layout="vertical"
                autoComplete="off"
                onFinish={handleProductionSubmit}>
                <Row gutter={[32]}>
                  <Col span={12}>
                    <Form.Item
                      label="Plant Name."
                      name="PlantName"
                      rules={[
                        {
                          required: true,
                          message: "Select Plant Name!",
                        },
                      ]}>
                      <Select
                        size="large"
                        placeholder="Select Plant Name"
                        options={[
                          {
                            value: "Plant Name 1",
                            label: "Plant Name 1",
                          },
                          {
                            value: "Plant Name 2",
                            label: "Plant Name 2",
                          },
                          {
                            value: "Plant Name 3",
                            label: "Plant Name 3",
                          },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Line No."
                      name="LineNo"
                      rules={[
                        {
                          required: true,
                          message: "Select Line No.!",
                        },
                      ]}>
                      <Select
                        size="large"
                        placeholder="Select Line No."
                        options={[
                          {
                            value: "Line No. 1",
                            label: "Line No. 1",
                          },
                          {
                            value: "Line No. 2",
                            label: "Line No. 2",
                          },
                          {
                            value: "Line No. 3",
                            label: "Line No. 3",
                          },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Product Name"
                      name="Product Name"
                      rules={[
                        {
                          required: true,
                          message: "Product Name is required",
                        },
                      ]}>
                      <Input type="text" size="large" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Product Code"
                      name="Product Code"
                      rules={[
                        {
                          required: true,
                          message: "Product Code is required",
                        },
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
                      label="Batch Code"
                      name="Batch Code"
                      rules={[
                        {
                          required: true,
                          message: "Please select your Batch Code!",
                        },
                      ]}>
                      <Input size="large" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Batch Size"
                      name="Batch Size"
                      rules={[
                        {
                          required: true,
                          message: "Please select your Batch Size!",
                        },
                      ]}>
                      <Input size="large" />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label="Manufacturing Date"
                      name="ManufacturingDate"
                      rules={[
                        {
                          required: true,
                          message: "Please select your Manufacturing Date!",
                        },
                      ]}>
                      <DatePicker style={{ width: "100%" }} size="large" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Expiry Date"
                      name="ExpiryDate"
                      rules={[
                        {
                          required: true,
                          message: "Please select your Expiry Date!",
                        },
                      ]}>
                      <DatePicker style={{ width: "100%" }} size="large" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Remark" name="Remark">
                      <TextArea
                        placeholder="Remark"
                        autoSize={{ minRows: 3, maxRows: 3 }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Upload COA File (Mandatory only for IC products)"
                      name="file"
                      valuePropName="fileList"
                      getValueFromEvent={normFile}>
                      <Dragger {...props}>
                        <Space>
                          <p className="ant-upload-drag-icon">
                            <UploadOutlined />
                          </p>
                          <div>
                            <p className="ant-upload-text">
                              Select your file or drag and drop
                            </p>
                            <p className="ant-upload-hint">Only PDF accepted</p>
                          </div>
                        </Space>
                      </Dragger>
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <div className="qc_mt_5">
                      <Form.Item>
                        <Space size="large">
                          <Button type="primary" htmlType="submit" size="large">
                            Save
                          </Button>
                          <Button htmlType="button" size="large">
                            Cancel
                          </Button>
                        </Space>
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
}
