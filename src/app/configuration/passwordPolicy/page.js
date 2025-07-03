"use client";
import React, { useEffect, useState } from "react";
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
import { LIST_PASSWORD_POLICY, UPDATE_PASSWORD_POLICY } from "@/app/api";
import { useSelector } from "react-redux";
import { displayMessage, interpolate, usePageAccess } from "@/utils/common";
import { ERROR_MSG_TYPE, SUCCESS_MSG_TYPE } from "@/constants/hardData";
import { postAPI, putAPI } from "@/utils/apiRequest";

export default function CompPasswordPolicy() {
  const [form] = Form.useForm();
  const [fieldData, setFieldData] = useState();
  const navBarInfo = useSelector((state) => state?.navBarInfo);
  console.log(navBarInfo, "navBarInfonavBarInfonavBarInfo");

  useEffect(() => {
    passwordPolicyList();
  }, []);

  const passwordPolicyList = async () => {
    const res = await postAPI(LIST_PASSWORD_POLICY);
    const data = res?.data;

    if (res?.status == 200) {
      setFieldData(data);
      form.setFieldsValue({
        PasswordExpiry: data?.PasswordExpiry,
        LastPasswordUsed: data?.LastPasswordUsed,
        MinimumLength: data?.MinimumLength,
        MaximumLength: data?.MaximumLength,
        DisableAfterIncorrectPassword: data?.LoginAttemps,
        PasswordReminder: data?.PasswordReminder,
        MandatoryChangePassword: data?.RequiresPasswordReset === 1,
        Lowercase: data?.Lowercase === 1,
        Uppercase: data?.Uppercase === 1,
        Numbers: data.Numbers === 1,
        SpecialCharacters: data.SpecialCharacters === 1,
      });
    }
  };

  const handleOnSubmit = async (values) => {
    try {
      const updateData = {
        PasswordExpiry: values?.PasswordExpiry,
        LastPasswordUsed: values?.LastPasswordUsed,
        MinimumLength: values?.MinimumLength,
        MaximumLength: values?.MaximumLength,
        LoginAttemps: values?.DisableAfterIncorrectPassword,
        PasswordReminder: values?.PasswordReminder,
        RequiresPasswordReset: values?.MandatoryChangePassword ? 1 : 0,
        Lowercase: values?.Lowercase ? 1 : 0,
        Uppercase: values?.Uppercase ? 1 : 0,
        Numbers: values?.Numbers ? 1 : 0,
        SpecialCharacters: values?.SpecialCharacters ? 1 : 0,
      };
      const res = await putAPI(
        interpolate(UPDATE_PASSWORD_POLICY, [fieldData?.id]),
        updateData
      );
      if (res?.status === 200) {
        displayMessage(SUCCESS_MSG_TYPE, res?.message);
        passwordPolicyList();
      } else {
        displayMessage(ERROR_MSG_TYPE, res?.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <MainLayout>
      <div className="page_title_container">
        <div className="component__name">Configuration</div>
        <div>
          <Breadcrumb
            items={[
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
          onFinish={handleOnSubmit}
          // disabled={usePageAccess(30, [3]) ? false : true}
        >
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
                  {
                    validator: (_, value) => {
                      if (!value || (value >= 1 && value <= 999)) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Value must be between 30 and 999")
                      );
                    },
                  },
                ]}
              >
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
                  {
                    validator: (_, value) => {
                      if (!value || (value >= 1 && value <= 10)) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Value must be between 1 and 10")
                      );
                    },
                  },
                ]}
              >
                <Input
                  type="number"
                  size="large"
                  maxLength={1}
                  min={1}
                  max={5}
                  onKeyPress={(e) => {
                    const charCode = e.which || e.keyCode;
                    if (charCode < 48 || charCode > 53) {
                      e.preventDefault();
                    }
                  }}
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
                  {
                    validator: (_, value) => {
                      const numericValue = Number(value);
                      if (!value || (numericValue >= 6 && numericValue <= 20)) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Value must be between 6 and 20")
                      );
                    },
                  },
                ]}
              >
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
                dependencies={["MinimumLength"]}
                rules={[
                  { required: true, message: "Maximum length is required" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      const minLength = Number(getFieldValue("MinimumLength"));
                      const maxLength = Number(value);

                      if (!value || (maxLength >= 8 && maxLength <= 20)) {
                        if (!minLength || maxLength >= minLength) {
                          return Promise.resolve();
                        } else {
                          return Promise.reject(
                            new Error(
                              "Maximum length must not be less than Minimum length"
                            )
                          );
                        }
                      }
                      return Promise.reject(
                        new Error("Value must be between 8 and 20")
                      );
                    },
                  }),
                ]}
              >
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
                  {
                    validator: (_, value) => {
                      if (!value || (value >= 0 && value <= 10)) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Value must be between 0 and 10")
                      );
                    },
                  },
                ]}
              >
                <Input
                  type="number"
                  size="large"
                  maxLength={1}
                  min={0}
                  max={9}
                  onKeyPress={(e) => {
                    const charCode = e.which || e.keyCode;
                    if (charCode < 48 || charCode > 57) {
                      e.preventDefault();
                    }
                  }}
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
                  {
                    validator: (_, value) => {
                      if (!value || (value >= 1 && value <= 99)) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Value must be between 1 and 99")
                      );
                    },
                  },
                ]}
              >
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
                name="MandatoryChangePassword"
              >
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
                name="Lowercase"
              >
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
                name="Uppercase"
              >
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
                name="Numbers"
              >
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
                name="SpecialCharacters"
              >
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
