import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "@/styles/login.module.scss";
import { Form, Input, Button, Spin, Divider, Row } from "antd";
import { redirect } from "next/navigation";
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
  // const { user } = useSelector((state) => state.userInfo);
  const dispatch = useDispatch();
  const { data: session } = getSession();
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

  //nextauth login
  // const handleOnSubmit = async (values) => {
  //   setDataLoading(true);
  //   try {
  //     const res = await signIn("credentials", {
  //       // redirect: false, // crucial
  //       CompanyCode: values?.PlantId,
  //       UserName: values?.UserName,
  //       Password: values?.Password,
  //     });
  //     if (res?.status == 200) {
  //       const session = await getSession();
  //       displayMessage(SUCCESS_MSG_TYPE, session?.message);
  //       var decoded = jwt.decode(session.accessToken);
  //       let pageRight = decoded?.pageRights;
  //       dispatch(
  //         userSuccess({
  //           user: session?.message,
  //         })
  //       );

  //       dispatch(
  //         setAccessToken({
  //           accessToken: session?.accessToken,
  //         })
  //       );

  //       dispatch(
  //         setRefreshToken({
  //           refreshToken: session?.refreshToken,
  //         })
  //       );

  //       dispatch(
  //         rightSuccess({
  //           userModules: session?.userModules,
  //           pageRight: pageRight,
  //         })
  //       );
  //       if (session?.CurrentCompany) {
  //         dispatch(setCurrentCompany(session?.CurrentCompany));
  //       }

  //       fetchInitialData();
  //       setTimeout(() => {
  //         redirect("/dashboard");
  //       }, 1000);
  //     } else {
  //       displayMessage(ERROR_MSG_TYPE, res?.message);
  //       console.log("message", res.error);
  //     }
  //     setDataLoading(false);
  //   } catch (error) {
  //     console.log("Error message", error);
  //     setDataLoading(false);
  //     displayMessage(ERROR_MSG_TYPE, error?.message);
  //   }
  // };

  //api login
  // const handleOnSubmit = async (values) => {
  //   setDataLoading(true);
  //   try {
  //     let finalForgotPasswordData = {
  //       CompanyCode: values?.CompanyCode || 'SUN',
  //       // UserName: String(values?.UserName).toLowerCase(),
  //       UserName: values?.UserName,
  //       Password: values?.Password,
  //     };

  //     // let url = userType == '1' ? LOGINWITHCOMPANY : LOGIN;
  //     let res = await postAPI(LOGIN, finalForgotPasswordData, {
  //       company: values?.CompanyCode
  //         ? String(values?.CompanyCode).toUpperCase()
  //         : '',
  //     });
  //     console.log("Signe in res--->>",res)
  //     if (res?.status == 200) {
  //       displayMessage(SUCCESS_MSG_TYPE, res?.message);

  //       var decoded = jwt.decode(res?.data?.access?.token);
  //       console.log(decoded,'decoded')
  //       let pageRight = decoded?.pageRights;
  //       dispatch(
  //         userSuccess({
  //           user: res?.data?.message,
  //         }),
  //       );

  //       dispatch(
  //         setAccessToken({
  //           accessToken: res?.data?.access?.token,
  //         }),
  //       );

  //       dispatch(
  //         setRefreshToken({
  //           refreshToken: res?.data?.refresh?.token,
  //         }),
  //       );

  //       dispatch(
  //         rightSuccess({
  //           userModules: res?.data?.userModules,
  //           pageRight: pageRight,
  //         }),
  //       );
  //       if (res?.data?.user?.CurrentCompany) {
  //         dispatch(setCurrentCompany(res?.data?.user?.CurrentCompany));
  //       }

  //       fetchInitialData();
  //       setTimeout(() => {
  //         redirect("/dashboard");
  //       }, 1000);
  //     } else {
  //       displayMessage(ERROR_MSG_TYPE, res?.message);
  //       console.log("message", res.error)
  //     }
  //     setDataLoading(false);
  //   } catch (error) {
  //     console.log("Error message", error)
  //     setDataLoading(false);
  //     // displayMessage(ERROR_MSG_TYPE, error?.error);
  //   }
  // };

  // useEffect(() => {
  //   if (user?.RequiresPasswordReset == 1) {
  //     setTimeout(() => {
  //       redirect('/change-password');
  //     }, 1000);
  //   }
  // }, []);
  // on Finish login failed error info

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
        <Form
          name="basic"
          layout={"vertical"}
          autoComplete="off"
          onFinish={handleOnSubmit}
        >
          <Form.Item
            label="Plant ID"
            name="PlantId"
            rules={[
              {
                required: true,
                message: "Please enter your Plant ID!",
              },
            ]}
          >
            <Input
              style={{ textTransform: "uppercase" }}
              type="text"
              className={`${styles.inputText}`}
              size="large"
              name="PlantId"
            />
          </Form.Item>
          <Form.Item
            label="Email ID"
            name="UserName"
            rules={[
              {
                required: true,
                message: "Please enter your email!",
              },
            ]}
          >
            <Input
              type="text"
              name="UserName"
              className={`${styles.inputText}`}
              size="large"
            />
          </Form.Item>

          <Form.Item
            label="Password"
            name="Password"
            rules={[
              {
                required: true,
                message: "Please enter your password!",
              },
            ]}
          >
            <Input.Password
              name="Password"
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
        </Form>
        <Divider>Sign in with</Divider>
        <Row justify="center">
          {!session ? (
            <Button
              icon={<GoogleOutlined />}
              onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            >
              Sign in with Google
            </Button> // open multi-provider screen
          ) : (
            <>
              <p>Hello, {session.user?.name}</p>
              <Button onClick={() => signOut()}>Sign Out</Button>
            </>
          )}
        </Row>
      </Spin>
    </>
  );
}
