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
      let finalUserData =
        userType == "1"
          ? {
              CompanyCode: String(values?.PlantCode).toUpperCase(),
              UserName: String(values?.userName).toLowerCase(),
              Password: values?.password,
            }
          : {
              UserName: String(values?.userName).toLowerCase(),
              Password: values?.password,
            };

      let res = await postAPI(LOGIN, finalUserData, {
        company: values?.CompanyCode
          ? String(values?.CompanyCode).toUpperCase()
          : "",
      });
      if (res?.status == 200) {
        displayMessage(SUCCESS_MSG_TYPE, res?.message);

        var decoded = jwt.decode(res?.data?.access?.token);
        let pageRight = decoded?.pageRights;

        console.log("decoded :>> ", decoded);

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
                  label: "Plant",
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
              name="PlantCode"
              rules={[
                {
                  required: true,
                  message: "Please enter Plant Code",
                },
              ]}
            >
              <Input
                style={{ textTransform: "uppercase" }}
                placeholder="Plant Code"
                className={`${styles.inputText}`}
                size="large"
              />
            </Form.Item>
          )}

          {/* <Form.Item
            name="CompanyCode"
            rules={[
              {
                required: true,
                message: "Please enter Plant ID",
              },
            ]}
          >
            <Input
              style={{ textTransform: "uppercase" }}
              placeholder="Plant ID"
              className={`${styles.inputText}`}
              size="large"
              name="CompanyCode"
            />
          </Form.Item> */}

          <Form.Item
            name="UserName"
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
              size="large"
              name="UserName"
              onInput={(e) => (e.target.value = e.target.value.toLowerCase())}
            />
          </Form.Item>
          <Form.Item
            name="Password"
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
              name="Password"
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
