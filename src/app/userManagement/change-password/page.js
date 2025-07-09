"use client";
import { CHANGE_PASSWORD, LIST_PASSWORD_POLICY, LOGOUT } from "@/app/api";
import MainLayout from "@/app/components/MainLayout";
import { ERROR_MSG_TYPE, SUCCESS_MSG_TYPE } from "@/constants/hardData";
import { userClear } from "@/redux/userSlice";
import { postAPI } from "@/utils/apiRequest";
import { displayMessage } from "@/utils/common";
import {
  Breadcrumb,
  Button,
  Col,
  Form,
  Input,
  Result,
  Row,
  Space,
  Spin,
} from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function ChangePassword() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const router = useRouter();
  const [dataLoading, setDataLoading] = useState(false);
  const { user } = useSelector((state) => state.userInfo);
  const [passwordPolicy, setPasswordPolicy] = useState({});
  const [dynamicRegex, setDynamicRegex] = useState(null);
  const [passwordChanged, setPasswordChanged] = useState("no");
  const navBarInfo = useSelector((state) => state?.navBarInfo);

  const handleBackToUserList = () => {
    dispatch(selectNavReducer("PAGE_41"));
  };

  const validatePassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("NewPassword") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("The confirm passwords do not match!"));
    },
  });

  const handleOnSubmit = async (values) => {
    setDataLoading(true);
    const payload = {
      UserId: user?.id,
      OldPassword: values?.OldPassword,
      NewPassword: values?.NewPassword,
    };
    try {
      const res = await postAPI(CHANGE_PASSWORD, payload);
      if (String(res?.status).includes("20")) {
        displayMessage(
          SUCCESS_MSG_TYPE,
          res?.message || "Password changed successfully!"
        );
        form.resetFields();
        //   localStorage.setItem("passwordchanged", "yes");
        setPasswordChanged("yes");
        logoutFunction();
      } else {
        displayMessage(
          ERROR_MSG_TYPE,
          res?.message || "An error occurred while changing the password."
        );
      }
    } catch (error) {
      displayMessage(
        ERROR_MSG_TYPE,
        error?.message || "Unexpected error occurred."
      );
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    let passChange = localStorage.getItem("passwordchanged");
    setPasswordChanged(passChange);
  }, []);

  //   const logoutFunction = async () => {
  //     // if (productionData && Object.keys(productionData)?.length) {
  //     //   Swal.fire({
  //     //     icon: "warning",
  //     //     title: "Production is Running",
  //     //     text: "Please stop production and remove data from queue.",
  //     //   });
  //     //   return;
  //     // }

  //     setDataLoading(true);
  //     try {
  //       let item = {
  //         userId: user?.id,
  //       };
  //       const res = await postAPI(LOGOUT, item);
  //       if (String(res?.status).includes('20')) {
  //         displayMessage(SUCCESS_MSG_TYPE, res?.message);
  //         dispatch(userClear());
  //         //   dispatch(clearPrinterInfo());
  //         //   dispatch(clearNavReducer());
  //         setDataLoading(false);
  //         setTimeout(() => {
  //           router.push('/');
  //         }, 1000);
  //       } else {
  //         displayMessage(ERROR_MSG_TYPE, res?.message);
  //       }
  //     } catch (error) {
  //       setDataLoading(false);
  //       displayMessage(ERROR_MSG_TYPE, error?.message);
  //     }
  //   };
  const logoutFunction = async () => {
    setDataLoading(true);
    try {
      let item = {
        userId: user?.id,
      };
      const res = await postAPI(LOGOUT, item);
      if (res?.status == 200) {
        displayMessage(SUCCESS_MSG_TYPE, res?.message);
        // message.success({
        //   content: res?.message,
        //   duration: 5,
        //   style: {
        //     marginTop: '10vh',
        //   },
        // });
        dispatch(userClear());
        setDataLoading(false);
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } else {
        displayMessage(ERROR_MSG_TYPE, res?.message);
      }
    } catch (error) {
      setDataLoading(false);
      displayMessage(ERROR_MSG_TYPE, error?.message);
    }
  };

  useEffect(() => {
    async function fetchPasswordPolicy() {
      try {
        const response = await postAPI(LIST_PASSWORD_POLICY);
        setPasswordPolicy(response?.data);

        // Construct the dynamic regex
        const {
          MinimumLength,
          MaximumLength,
          Lowercase,
          Uppercase,
          Numbers,
          SpecialCharacters,
        } = response?.data;

        let regexString = "^";

        if (Lowercase) regexString += "(?=.*[a-z])"; // At least one lowercase letter
        if (Uppercase) regexString += "(?=.*[A-Z])"; // At least one uppercase letter
        if (Numbers) regexString += "(?=.*[0-9])"; // At least one digit
        if (SpecialCharacters) regexString += '(?=.*[!@#$%^&*(),.?":{}|<>])'; // At least one special character

        regexString += `.{${MinimumLength},${MaximumLength}}$`; // Minimum and maximum length

        setDynamicRegex(new RegExp(regexString));
      } catch (error) {
        console.error("Error fetching password policy:", error);
      }
    }
    fetchPasswordPolicy();
  }, []);

  return (
    <>
      <MainLayout>
        <div className="page_title_container">
          <div className="component__name">User Management</div>
          <Breadcrumb
            items={[
              {
                title: <div>Users</div>,
              },
              {
                title: "Change Password",
              },
            ]}
          />
        </div>
        <div className="qc_page_container">
          {/* {passwordChanged && passwordChanged == 'yes' ? (
            <Result
              status="success"
              title="Password Changed!"
              subTitle="You have successfully completed your password change"
              extra={[
                <Button type="primary" size="large" onClick={logoutFunction}>
                  Login with your new password
                </Button>,
              ]}
            />
          ) : ( */}
          <Spin spinning={dataLoading}>
            <Form
              style={{ width: "736px" }}
              name="basic"
              form={form}
              layout="vertical"
              autoComplete="off"
              onFinish={handleOnSubmit}
            >
              <Row gutter={[32]}>
                <Col span={12}>
                  <Form.Item
                    label="Old Password"
                    name="OldPassword"
                    rules={[
                      {
                        required: true,
                        message: "Please enter old password!",
                      },
                      { max: 20, message: "Only 20 characters are allowed!" },
                      {
                        min: 6,
                        message: "Atleast 6 characters are Required!",
                      },
                    ]}
                  >
                    <Input.Password size="large" />
                  </Form.Item>
                  <Form.Item
                    label="New Password"
                    name="NewPassword"
                    rules={[
                      {
                        required: true,
                        message: "Please enter new password!",
                      },
                      {
                        max: passwordPolicy?.MaximumLength,
                        message: `Password can have a maximum of ${passwordPolicy?.MaximumLength} characters`,
                      },
                      {
                        pattern: dynamicRegex,
                        message: `Password must have ${
                          passwordPolicy?.MinimumLength
                        }-${passwordPolicy?.MaximumLength} characters${
                          passwordPolicy?.Lowercase
                            ? ", at least one lowercase letter"
                            : ""
                        }${
                          passwordPolicy?.Uppercase
                            ? ", at least one uppercase letter"
                            : ""
                        }${
                          passwordPolicy?.Numbers ? ", at least one number" : ""
                        }${
                          passwordPolicy?.SpecialCharacters
                            ? ", and at least one special character"
                            : ""
                        }.`,
                      },
                    ]}
                  >
                    <Input.Password
                      maxLength={passwordPolicy?.MaximumLength}
                      minLength={passwordPolicy?.MinimumLength}
                      size="large"
                      autoComplete="new-password"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Confirm Password"
                    name="ConfirmPassword"
                    dependencies={["NewPassword"]}
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your password!",
                      },
                      {
                        max: 100,
                        message: "Only 100 characters are allowed!",
                      },
                      validatePassword,
                    ]}
                  >
                    <Input.Password size="large" />
                  </Form.Item>
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
                </Col>
              </Row>
            </Form>
          </Spin>
          {/* // )} */}
        </div>
      </MainLayout>
    </>
  );
}
