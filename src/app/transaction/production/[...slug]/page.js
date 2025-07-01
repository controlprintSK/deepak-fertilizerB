"use client";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Upload,
} from "antd";
import MainLayout from "@/app/components/MainLayout";
import { redirect, useParams, useRouter } from "next/navigation";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
import moment from "moment";

const { TextArea } = Input;
const { Dragger } = Upload;

export default function ProductionAdd() {
  const router = useRouter();
  const params = useParams();

  const [form] = Form.useForm();
  const [productType, setProductType] = useState(null);
  const [slug, setSlug] = useState([]);

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params; // Unwrap the promise
      setSlug(resolvedParams.slug || []); // Ensure slug is always an array
    };

    unwrapParams();
  }, [params]);

  const handleBackToList = () => {
    redirect("/transaction/production");
  };

  const handleProductionSubmit = async (values) => {
    console.log("values--->>--", values);
  };

  const normFile = (e) => {
    if (Array.isArray(e)) return e;
    return e?.fileList;
  };

  const props = {
    name: "file",
    multiple: true,
    beforeUpload: () => false,
    onChange(info) {
      const { status } = info.file;
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
        <Breadcrumb
          items={[
            { title: "Transaction" },
            {
              title: (
                <div className="cursor_pointer" onClick={handleBackToList}>
                  Production
                </div>
              ),
            },
            { title: "Add Production" },
          ]}
        />
      </div>
      <div className="qc_page_container">
        <Row gutter={[16, 16]}>
          <Col span={14}>
            <Card>
              <Form
                name="productionForm"
                form={form}
                layout="vertical"
                autoComplete="off"
                onFinish={handleProductionSubmit}
              >
                <Row gutter={[32]}>
                  <Col span={12}>
                    <Form.Item
                      label="Plant Name"
                      name="PlantName"
                      rules={[
                        { required: true, message: "Select Plant Name!" },
                      ]}
                    >
                      <Select
                        size="large"
                        placeholder="Select Plant Name"
                        options={[
                          { value: "Plant1", label: "Plant Name 1" },
                          { value: "Plant2", label: "Plant Name 2" },
                        ]}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label="Line No"
                      name="LineNo"
                      rules={[{ required: true, message: "Select Line No!" }]}
                    >
                      <Select
                        size="large"
                        placeholder="Select Line No"
                        options={[
                          { value: "Line1", label: "Line No. 1" },
                          { value: "Line2", label: "Line No. 2" },
                        ]}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label="Product Name"
                      name="ProductName"
                      rules={[
                        { required: true, message: "Product Name is required" },
                      ]}
                    >
                      <Select
                        size="large"
                        placeholder="Select Product"
                        options={[
                          {
                            value: "Product1",
                            label: "Product 1",
                            productType: "IC",
                          },
                          {
                            value: "Product2",
                            label: "Product 2",
                            productType: "NON-IC",
                          },
                        ]}
                        onChange={(value, option) =>
                          setProductType(option.productType)
                        }
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label="Product Code"
                      name="ProductCode"
                      rules={[
                        { required: true, message: "Product Code is required" },
                      ]}
                    >
                      {/* <Input size="large" readOnly /> */}
                      <Input size="large" />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label="Batch No."
                      name="BatchCode"
                      rules={[
                        { required: true, message: "Please enter Batch No." },
                        { max: 20, message: "Maximum 20 characters allowed" },
                        {
                          pattern: /^[a-zA-Z0-9]*$/,
                          message: "Only alphanumeric characters allowed",
                        },
                      ]}
                    >
                      <Input size="large" />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label="Batch Size"
                      name="BatchSize"
                      rules={[
                        { required: true, message: "Please enter Batch Size" },
                        {
                          pattern: /^\d{1,6}$/,
                          message: "Only numbers up to 6 digits allowed",
                        },
                        {
                          validator: (_, value) =>
                            value && parseInt(value) > 0
                              ? Promise.resolve()
                              : Promise.reject("Must be greater than 0"),
                        },
                      ]}
                    >
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
                          message: "Select Manufacturing Date",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            const expiry = getFieldValue("ExpiryDate");
                            const isAfter14Days = moment()
                              .subtract(14, "days")
                              .isBefore(value);
                            if (!value) return Promise.resolve();
                            if (!isAfter14Days)
                              return Promise.reject(
                                "Date must be within the last 14 days"
                              );
                            if (expiry && value.isAfter(expiry))
                              return Promise.reject(
                                "Must be before Expiry Date"
                              );
                            return Promise.resolve();
                          },
                        }),
                      ]}
                    >
                      <DatePicker style={{ width: "100%" }} size="large" />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label="Expiry Date"
                      name="ExpiryDate"
                      rules={[
                        { required: true, message: "Select Expiry Date" },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            const manufacturing =
                              getFieldValue("ManufacturingDate");
                            if (!value) return Promise.resolve();
                            if (manufacturing && value.isBefore(manufacturing))
                              return Promise.reject(
                                "Must be after Manufacturing Date"
                              );
                            if (value.isBefore(moment(), "day"))
                              return Promise.reject("Must be a future date");
                            return Promise.resolve();
                          },
                        }),
                      ]}
                    >
                      <DatePicker style={{ width: "100%" }} size="large" />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label="Remarks"
                      name="Remarks"
                      rules={[
                        { max: 500, message: "Maximum 500 characters allowed" },
                      ]}
                    >
                      <TextArea
                        placeholder="Remarks"
                        autoSize={{ minRows: 3, maxRows: 3 }}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={12}>
                    <Form.Item
                      label="Upload COA File (Mandatory for IC Products)"
                      name="file"
                      valuePropName="fileList"
                      getValueFromEvent={normFile}
                      rules={[
                        {
                          validator: (_, value) => {
                            if (
                              productType === "IC" &&
                              (!value || value.length === 0)
                            ) {
                              return Promise.reject(
                                "File required for IC products"
                              );
                            }
                            return Promise.resolve();
                          },
                        },
                      ]}
                    >
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
                          <Button
                            htmlType="button"
                            size="large"
                            onClick={() => form.resetFields()}
                          >
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
