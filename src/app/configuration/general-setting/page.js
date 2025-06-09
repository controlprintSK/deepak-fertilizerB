"use client";
import React from "react";
import {
  Breadcrumb,
  Button,
  Col,
  ColorPicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Switch,
} from "antd";
import MainLayout from "@/app/components/MainLayout";

export default function GeneralSetting() {
  const [form] = Form.useForm();

  const handleOnSubmit = async (values) => {
    console.log("values--->>--", values);
  };

  return (
    <MainLayout>
      <div className="page_title_container">
        {/* <div className="component__name">Configuration</div> */}
        <div>
          <Breadcrumb
            items={[
              {
                title: "Configuration",
              },
              {
                title: "General Setting",
              },
            ]}
          />
        </div>
      </div>
      <div className="qc_page_container">
        <Form
          className="password_policy_form"
          style={{ maxWidth: "1000px" }}
          name="basic"
          form={form}
          labelCol={{
            span: 12,
          }}
          wrapperCol={{
            span: 12,
          }}
          autoComplete="off"
          onFinish={handleOnSubmit}>
          <Row gutter={[64]} align="middle">
            <Col span={12}>
              <Form.Item
                label={
                  <div>
                    <h2>Date Format</h2>
                    <div className="sub_title">Specify Mfg/Exp date format</div>
                  </div>
                }
                name="DateFormat"
                rules={[
                  { required: true, message: "Date Format is required" },
                ]}>
                <Select
                  placeholder="MM-YYYY"
                  size="large"
                  style={{
                    width: "100%",
                  }}
                  options={[
                    {
                      value: "DD-MM-YYYY",
                      label: "DD-MM-YYYY",
                    },
                    {
                      value: "MM-YYYY",
                      label: "MM-YYYY",
                    },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label={
                  <div>
                    <h2>Application Date Format</h2>
                    <div className="sub_title">
                      Specify the app date format{" "}
                    </div>
                  </div>
                }
                name="ApplicationDateFormat"
                rules={[
                  {
                    required: true,
                    message: "Application Date Format is required",
                  },
                ]}>
                <Select
                  placeholder="DD-MM-YYYY"
                  size="large"
                  style={{
                    width: "100%",
                  }}
                  options={[
                    {
                      value: "DD-MM-YYYY",
                      label: "DD-MM-YYYY",
                    },
                    {
                      value: "MM-YYYY",
                      label: "MM-YYYY",
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={
                  <div>
                    <h2>Application Timestamp</h2>
                    <div className="sub_title">Specify the time format</div>
                  </div>
                }
                name="ApplicationTimestamp"
                rules={[
                  {
                    required: true,
                    message: "Application Timestamp is required",
                  },
                ]}>
                <Select
                  placeholder="HH:MM:SS(AM/PM)"
                  size="large"
                  style={{
                    width: "100%",
                  }}
                  options={[
                    {
                      value: "HH:MM:SS(AM/PM)",
                      label: "HH:MM:SS(AM/PM)",
                    },
                    {
                      value: "HH:MM:SS",
                      label: "HH:MM:SS",
                    },
                  ]}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label={
                  <div>
                    <h2>Auto Lock (No Activity)</h2>
                    <div className="sub_title">
                      Specify the Application Lock time
                    </div>
                  </div>
                }
                name="NoActivityAutoLock"
                rules={[
                  {
                    required: true,
                    message: "Please enter minutes!",
                  },
                ]}>
                <Input type="number" size="large" maxLength={2} suffix="Mins" />
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
      </div>
    </MainLayout>
  );
}
