"use client";
import React from "react";
import {
  Breadcrumb,
  Button,
  Col,
  Divider,
  Form,
  Input,
  Row,
  Space,
  Switch,
} from "antd";
import MainLayout from "@/app/components/MainLayout";

export default function PasswordPolicy() {
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
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
                title: "Password Policy",
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
            span: 18,
          }}
          wrapperCol={{
            span: 6,
          }}
          autoComplete="off"
          onFinish={handleSubmit}>
          <Row gutter={[32]} align="middle">
            <Col span={12}>
              <Form.Item
                label={
                  <div>
                    <h2>Password expiry</h2>
                    <div className="sub_title">
                      Specify the expiry duration of the password after which a
                      new password must be set
                    </div>
                  </div>
                }
                name="PasswordExpiry"
                rules={[
                  { required: true, message: "Password expiry is required" },
                ]}>
                <Input type="number" size="large" maxLength={3} suffix="Days" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={
                  <div>
                    <h2>Last password used</h2>
                    <div className="sub_title">
                      Specify the number of old passwords that can be used
                    </div>
                  </div>
                }
                name="LastPasswordUsed"
                rules={[
                  { required: true, message: "Last Password Used is required" },
                ]}>
                <Input
                  type="number"
                  size="large"
                  maxLength={1}
                  min={1}
                  max={5}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label={
                  <div>
                    <h2>Minimum length</h2>
                    <div className="sub_title">
                      Specify the minimum length of password
                    </div>
                  </div>
                }
                name="MinimumLength"
                rules={[
                  { required: true, message: "Minimum Length is required" },
                ]}>
                <Input type="number" size="large" maxLength={2} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={
                  <div>
                    <h2>Maximum length</h2>
                    <div className="sub_title">
                      Specify the maximum length of the password
                    </div>
                  </div>
                }
                name="MaximumLength"
                rules={[
                  { required: true, message: "Maximum length is required" },
                ]}>
                <Input type="number" size="large" maxLength={2} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label={
                  <div>
                    <h2>Disable after incorrect password</h2>
                    <div className="sub_title">
                      Specify the number of incorrect attempts after which the
                      account will be disabled
                    </div>
                  </div>
                }
                name="DisableAfterIncorrectPassword"
                rules={[
                  {
                    required: true,
                    message: "Disable after incorrect password is required",
                  },
                ]}>
                <Input
                  type="number"
                  size="large"
                  maxLength={1}
                  min={0}
                  max={9}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={
                  <div>
                    <h2>Password Reminder</h2>
                    <div className="sub_title">
                      Specify the number of days after which a password change
                      reminder will show
                    </div>
                  </div>
                }
                name="PasswordReminder"
                rules={[
                  {
                    required: true,
                    message: "Password Reminder is required",
                  },
                ]}>
                <Input type="number" size="large" maxLength={2} suffix="Days" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={
                  <div>
                    <h2>Mandatory change password after first login</h2>
                    <div className="sub_title">
                      Decide if a password change is required upon first login
                    </div>
                  </div>
                }
                name="MandatoryChangePassword">
                <Switch checkedChildren="On" unCheckedChildren="Off" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Divider />
            </Col>
            <Col span={24}>
              <h2 className="qc_mb_5">Password Complexity</h2>
            </Col>
            <Col span={12}>
              <Form.Item
                label={
                  <div>
                    <h2>Lowercase</h2>
                    <div className="sub_title">
                      Specify if the password must compulsory contain lowercase
                      characters
                    </div>
                  </div>
                }
                name="Lowercase">
                <Switch checkedChildren="On" unCheckedChildren="Off" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={
                  <div>
                    <h2>Uppercase</h2>
                    <div className="sub_title">
                      Specify if the password must compulsory contain uppercase
                      characters
                    </div>
                  </div>
                }
                name="Uppercase">
                <Switch checkedChildren="On" unCheckedChildren="Off" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={
                  <div>
                    <h2>Numbers</h2>
                    <div className="sub_title">
                      Specify if the password must compulsory contain numbers
                    </div>
                  </div>
                }
                name="Numbers">
                <Switch checkedChildren="On" unCheckedChildren="Off" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label={
                  <div>
                    <h2>Special Characters</h2>
                    <div className="sub_title">
                      Specify if the password must compulsory contain special
                      characters
                    </div>
                  </div>
                }
                name="SpecialCharacters">
                <Switch checkedChildren="On" unCheckedChildren="Off" />
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
