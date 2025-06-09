import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "@/styles/login.module.scss";
import { Form, Input, Button, Spin, Select, Divider, Row } from "antd";
import { redirect, useRouter } from "next/navigation";
import {
  setCompanyList,
  setCurrentCompany,
  setUserRoleList,
} from "@/redux/utilitiesSlice";
import {
  setAccessToken,
  setRefreshToken,
  userSuccess,
} from "@/redux/userSlice";
import { rightSuccess } from "@/redux/rightSlice";
import {
  createRightMaster,
  displayMessage,
  fetchCompanyList,
  fetchUserRoleList,
} from "../../../utils/common";
import { LOGIN } from "@/app/api";
import jwt from "jsonwebtoken";
import { postAPI } from "@/utils/apiRequest";
import { ERROR_MSG_TYPE, SUCCESS_MSG_TYPE } from "@/constants/hardData";
import { getSession, signIn } from "next-auth/react";
import { GoogleOutlined } from "@ant-design/icons";

export default function LoginForm({ setForgotPasswordForm }) {
  const [dataLoading, setDataLoading] = useState(false);
  const [userType, setUserType] = useState("1");

  const router = useRouter();
  const dispatch = useDispatch();

  // const { data: session } = getSession();

  const fetchInitialData = async () => {
    try {
      const _companyList = await fetchCompanyList();
      dispatch(setCompanyList(_companyList));
      const _roleList = await fetchUserRoleList();
      dispatch(setUserRoleList(_roleList));
      return;
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  const onFinishLogin = async (values) => {
    setDataLoading(true);
    try {
      let finalForgotPasswordData =
        userType == "1"
          ? {
              CompanyCode: String(values?.CompanyCode).toUpperCase(),
              UserName: String(values?.userName).toLowerCase(),
              Password: values?.password,
            }
          : {
              UserName: String(values?.userName).toLowerCase(),
              Password: values?.password,
            };

      // let url = userType == '1' ? LOGINWITHCOMPANY : LOGIN;
      let res = await postAPI(LOGIN, finalForgotPasswordData, {
        company: values?.CompanyCode
          ? String(values?.CompanyCode).toUpperCase()
          : "",
      });
      if (res?.status == 200) {
        displayMessage(SUCCESS_MSG_TYPE, res?.message);

        var decoded = jwt.decode(res?.data?.access?.token);
        let pageRight = decoded?.pageRights;

        dispatch(
          userSuccess({
            user: res?.data?.user,
          })
        );

        dispatch(
          setAccessToken({
            accessToken: res?.data?.access?.token,
          })
        );

        dispatch(
          setRefreshToken({
            refreshToken: res?.data?.refresh?.token,
          })
        );

        dispatch(
          rightSuccess({
            userModules: res?.data?.userModules,
            pageRight: pageRight,
          })
        );
        if (res?.data?.user?.CurrentCompany) {
          dispatch(setCurrentCompany(res?.data?.user?.CurrentCompany));
        }

        fetchInitialData();

        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        displayMessage(ERROR_MSG_TYPE, res?.message);
      }
      setDataLoading(false);
    } catch (error) {
      setDataLoading(false);
      displayMessage(ERROR_MSG_TYPE, error?.message);
    }
  };

  const onFinishLoginFailed = (errorInfo) => {
    console.log("on Finish login failed error info: --->>--", errorInfo);
  };
  // on click forgot password
  const onClickForgotPassword = () => {
    setDataLoading(true);
    setForgotPasswordForm(true);
    setDataLoading(false);
  };

  // const handleOnSubmit = async (values) => {
  //   console.log("values--->>--", values);
  //   redirect("/dashboard");
  // };

  return (
    <>
      <h1 className="qc_mb_3">Login</h1>
      <Spin spinning={dataLoading}>
        {/* <Form
          name="basic"
          layout={'vertical'}
          autoComplete="off"
          onFinish={handleOnSubmit}
        >
          <Form.Item
            label="Plant ID"
            name="plant_id"
            rules={[
              {
                required: true,
                message: 'Please enter your Plant ID!',
              },
            ]}
          >
            <Input
              style={{ textTransform: 'uppercase' }}
              type="text"
              className={`${styles.inputText}`}
              size="large"
            />
          </Form.Item>
          <Form.Item
            label="User ID"
            name="UserName"
            rules={[
              {
                required: true,
                message: 'Please enter your User ID!',
              },
              {
                min: 2,
                message: 'User ID must be at least 2 characters long!',
              },
              {
                max: 30,
                message: 'User ID cannot exceed 30 characters!',
              },
            ]}
          >
            <Input type="text" className={`${styles.inputText}`} size="large" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'Please enter your password!',
              },
            ]}
          >
            <Input.Password
              name="password"
              className={`${styles.inputText}`}
              size="large"
            />
          </Form.Item>
          <div className="text_right qc_mb_5 text_right">
            <Button
              onClick={onClickForgotPassword}
              className={`link ${styles.forgot__link}`}
              type="link"
            >
              Forgot Password ?
            </Button>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Login
            </Button>
          </Form.Item>
        </Form> */}
        <Form
          name="basic"
          layout={"vertical"}
          initialValues={{
            userType: "1",
          }}
          onFinish={onFinishLogin}
          onFinishFailed={onFinishLoginFailed}
          autoComplete="off"
        >
          <Form.Item name="userType">
            <Select
              placeholder="UserType"
              size="large"
              onChange={(value) => setUserType(value)} // Update userType state on change
              // defaultValue={'1'}
              options={[
                {
                  value: "1",
                  label: "Company",
                },
                {
                  value: "2",
                  label: "SuperAdmin",
                },
              ]}
            />
          </Form.Item>

          {userType === "1" && (
            <Form.Item
              name="CompanyCode"
              rules={[
                {
                  required: true,
                  message: "Please enter Company Code",
                },
              ]}
            >
              <Input
                style={{ textTransform: "uppercase" }}
                placeholder="Company Code"
                className={`${styles.inputText}`}
                size="large"
              />
            </Form.Item>
          )}

          <Form.Item
            name="userName"
            rules={[
              {
                required: true,
                message: "Please enter user name!",
              },
            ]}
          >
            <Input
              placeholder="user name"
              className={`${styles.inputText}`}
              autoComplete="new-password"
              size="large"
              onInput={(e) => (e.target.value = e.target.value.toLowerCase())}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password!",
              },
            ]}
          >
            <Input.Password
              placeholder="password"
              className={styles.inputText}
              autoComplete="new-password"
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Login
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </>
  );
}
