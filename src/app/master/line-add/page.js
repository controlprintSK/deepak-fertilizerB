"use client";
import { Breadcrumb, Button, Col, Form, Input, Row, Space, Switch } from "antd";
import MainLayout from "@/app/components/MainLayout";
import { redirect } from "next/navigation";

export default function LineAdd() {
  const [form] = Form.useForm();

  const handleBackToList = () => {
    redirect("/master/line");
  };

  const handleLineSubmit = async (values) => {
    console.log("---->>--", values);
  };

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
                    Line
                  </div>
                ),
              },
              {
                title: "Add Line",
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
          onFinish={handleLineSubmit}>
          <div style={{ width: "736px" }}>
            <Row gutter={[32]}>
              <Col span={12}>
                <Form.Item
                  label="Line Code"
                  name="LineCode"
                  rules={[
                    { required: true, message: "Line Code is required" },
                    {
                      max: 20,
                      message: "Line Code cannot exceed 20 characters",
                    },
                  ]}>
                  <Input type="text" size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Line Name"
                  name="LineName"
                  rules={[
                    { required: true, message: "Line Name is required" },
                    {
                      max: 100,
                      message: "Line Name cannot exceed 100 characters",
                    },
                  ]}>
                  <Input type="text" size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Plant Name"
                  name="PlantName"
                  rules={[
                    {
                      required: true,
                      message: "Please select your Plant Name!",
                    },
                  ]}>
                  <Input size="large" />
                </Form.Item>
              </Col>
            </Row>
          </div>
          <div style={{ width: "736px" }}>
            <Row gutter={[32]}>
              <Col span={12}>
                <Form.Item label="Status" name="Status">
                  <Switch checkedChildren="On" unCheckedChildren="Off" />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={[32]}>
              <Col span={24}>
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
              </Col>
            </Row>
          </div>
        </Form>
      </div>
    </MainLayout>
  );
}
