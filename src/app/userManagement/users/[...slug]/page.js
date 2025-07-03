"use client";
import {
  Breadcrumb,
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Select,
  Space,
  Spin,
  Switch,
  Table,
  Tag,
} from "antd";
import MainLayout from "@/app/components/MainLayout";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAPI,
  postAPI,
  postFileAPI,
  putAPI,
  putFileAPI,
} from "@/utils/apiRequest";
import { displayMessage, interpolate } from "@/utils/common";
import {
  ADD_USER,
  CREAT_USER,
  GET_USER_DATA,
  LIST_PASSWORD_POLICY,
  LIST_USER_GROUP,
} from "@/app/api";
import { ERROR_MSG_TYPE, SUCCESS_MSG_TYPE } from "@/constants/hardData";
import {
  REGEX_ALPHANUMERIC_WITH_SPACE,
  REGEX_ALPHANUMERIC_WITHOUT_SPACE,
  REGEX_EMAIL,
  Regex_Password,
} from "@/utils/validation";

export default function UserAdd() {
  const [form] = Form.useForm();
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch();
  const [editUserData, setEditUserData] = useState();
  const [dataLoading, setDataLoading] = useState(false);
  const [userGroupList, setUserGroupList] = useState([]);
  const [userGroupOption, setUserGroupOption] = useState([]);
  const [companyListOption, setCompanyListOption] = useState([]);
  const [roleTypeOption, setRoleTypeOption] = useState([]);
  const [passwordPolicy, setPasswordPolicy] = useState({});
  const [dynamicRegex, setDynamicRegex] = useState(null);
  const { user } = useSelector((state) => state.userInfo);
  const { userRoleList, companyList } = useSelector((state) => state.utilities);

  const navBarInfo = useSelector((state) => state?.navBarInfo);
  const [slug, setSlug] = useState([]);

  const handleBackToList = () => {
    router.push("/userManagement/users");
  };

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params; // Unwrap the promise
      setSlug(resolvedParams.slug || []); // Ensure slug is always an array
    };

    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (Array.isArray(slug) && slug.length > 0 && slug[0] == "edit") {
      fetchUserData(slug[1]);
    }
  }, [slug]);

  console.log(editUserData, "editUserDataeditUserDataeditUserData");

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

  const fetchUserData = async (_id) => {
    setDataLoading(true);
    try {
      let res = await getAPI(interpolate(GET_USER_DATA, [_id]));
      setDataLoading(false);
      if (res?.status == 200) {
        const userData = res?.data;
        setEditUserData(userData);
        form.setFieldsValue(userData);
        setDataLoading(false);
      } else {
        setDataLoading(false);
        displayMessage(ERROR_MSG_TYPE, res?.message);
      }
    } catch (error) {
      setDataLoading(false);
      console.error("Error fetching user data:", error);
    }
  };

  const fetchUserGroupList = async () => {
    try {
      let reqData = {
        sortBy: "createdAt",
        page: 1,
        limit: 100,
      };
      const res = await postAPI(LIST_USER_GROUP, reqData);
      if (res?.status == 200) {
        let res1 = res?.data?.results?.filter(
          (val) => val?.RoleId != "superadmin" && val?.Active == 1
        );
        setUserGroupList(res1);
      } else {
        displayMessage(ERROR_MSG_TYPE, res?.message);
      }
    } catch (error) {
      displayMessage(ERROR_MSG_TYPE, error?.message);
    }
  };

  useEffect(() => {
    fetchUserGroupList();
  }, []);

  useEffect(() => {
    const data = userGroupList.map((val) => ({
      value: val?.RoleId,
      label: val?.RoleName,
    }));
    setUserGroupOption(data);
  }, [userGroupList]);

  const handleOnSubmit = async (values) => {
    console.log(values, "valuesvaluesvalues");
    setDataLoading(true);
    try {
      let reqObj = {
        FullName: values?.FullName,
        UserName: values?.UserName,
        EmployeeCode: values?.EmployeeCode,
        Email: values?.Email,
        Password: values?.Password,
        CompanyCode: user?.CurrentCompany
          ? user?.CurrentCompany
          : values?.CompanyCode,
        UserRole: values?.UserRole,
        Active: Number(values.Active),
      };

      const res = editUserData
        ? await putAPI(interpolate(GET_USER_DATA, [editUserData?.id]), reqObj)
        : await postAPI(CREAT_USER, reqObj);

      if (res?.status === 200) {
        editUserData
          ? displayMessage(SUCCESS_MSG_TYPE, res?.message)
          : displayMessage(SUCCESS_MSG_TYPE, res?.message);
        form.resetFields();
        setDataLoading(false);
        setTimeout(() => {
          router.push("/userManagement/users");
        }, 500);
      } else {
        setDataLoading(false);
        displayMessage(ERROR_MSG_TYPE, res?.message);
      }
    } catch (error) {
      setDataLoading(false);
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (editUserData) {
  //     const {
  //       FirstName,
  //       LastName,
  //       UserName,
  //       EmployeeCode,
  //       Department,
  //       Mobile,
  //       Email,
  //       CompanyCode,
  //       UserRole,
  //       Remark,
  //       ProfilePhoto,
  //       Active,
  //     } = editUserData;
  //     form.setFieldsValue({
  //       FirstName: FirstName,
  //       LastName: LastName,
  //       UserName: UserName,
  //       EmployeeCode: EmployeeCode,
  //       Department: Department,
  //       Mobile: Mobile,
  //       Email: Email,
  //       CompanyCode: CompanyCode,
  //       UserRole: UserRole,
  //       Remark: Remark,
  //       Active: Active,
  //       ProfilePhoto: ProfilePhoto,
  //     });
  //   }
  // }, [editUserData]);

  useEffect(() => {
    let Rolelist = userRoleList?.filter((val) => val?.RoleId < 100);
    const data = Rolelist.map((val) => ({
      value: val?.RoleId,
      label: val?.RoleName,
    }));
    setRoleTypeOption(data);
  }, [userRoleList]);

  useEffect(() => {
    let optList = companyList?.results.map((val, ind) => ({
      value: val?.CompanyCode,
      label: val?.CompanyCode,
    }));
    optList = [{ value: "", label: "Select Company" }, ...optList];
    setCompanyListOption(optList);
  }, [companyList]);

  const onFinish = async (values) => {
    setDataLoading(true);
    try {
      const formData = new FormData();
      formData.append("FirstName", values?.FirstName);
      formData.append("LastName", values?.LastName);
      formData.append("UserName", values?.UserName);
      formData.append("EmployeeCode", values?.EmployeeCode);
      formData.append("Email", values?.Email);
      formData.append("Department", String(values?.Department)?.toUpperCase());
      if (values?.Password) {
        formData.append("Password", values?.Password);
        // formData.append('ConfirmPassword', values?.Password);
      }

      formData.append("Mobile", values?.Mobile);
      formData.append("CompanyCode[]", values?.CompanyCode);
      formData.append("UserRole", values?.UserRole);

      formData.append("Remark", values?.Remark ? values?.Remark : "");
      formData.append("Active", values?.Active);

      const res = editUserData
        ? await putFileAPI(
            interpolate(GET_USER_DATA, [editUserData?.id]),
            formData
          )
        : await postFileAPI(ADD_USER, formData);
      setDataLoading(false);
      if (res?.status == 200) {
        editUserData
          ? displayMessage(SUCCESS_MSG_TYPE, res?.message)
          : displayMessage(SUCCESS_MSG_TYPE, res?.message);
        setTimeout(() => {
          router.push("/user-management/user");
        }, 1000);
      } else {
        displayMessage(ERROR_MSG_TYPE, res?.message);
      }
    } catch (error) {
      setDataLoading(false);
      displayMessage(
        ERROR_MSG_TYPE,
        "An error occurred while adding the User."
      );
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // Custom validator to check password match
  const validatePassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("Password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("The confirm passwords do not match!"));
    },
  });

  return (
    <MainLayout>
      <div className="page_title_container">
        <div className="component__name">User Management</div>
        <div>
          <Breadcrumb
            items={[
              {
                title: (
                  <div className="cursor_pointer" onClick={handleBackToList}>
                    Users
                  </div>
                ),
              },
              {
                title: editUserData ? "Update User" : "Add User",
              },
            ]}
          />
        </div>
      </div>
      <div className="qc_page_container">
        <Spin spinning={dataLoading}>
          <div>
            <Form
              form={form}
              style={{ width: "736px" }}
              name="basic"
              layout={"vertical"}
              autoComplete="off"
              initialValues={{
                Active: true,
                Companycode: user?.CurrentCompany,
              }}
              onFinish={handleOnSubmit}
            >
              <Row gutter={[32]}>
                <Col span={12}>
                  <Form.Item
                    label="User ID"
                    name="UserName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter user Name!",
                      },
                      {
                        pattern: REGEX_ALPHANUMERIC_WITHOUT_SPACE,
                        message:
                          "Space and Special characters are not Allowed!",
                      },
                      {
                        max: 20,
                        message: "only 20 characters are Allowed!",
                      },
                    ]}
                  >
                    <Input
                      disabled={
                        editUserData && Object.values(editUserData).length
                          ? true
                          : false
                      }
                      size="large"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Full Name"
                    name="FullName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter full name!",
                      },
                      {
                        max: 100,
                        message: "only 100 characters are Allowed!",
                      },
                      {
                        pattern: REGEX_ALPHANUMERIC_WITH_SPACE,
                        message: "Special characters are not Allowed!",
                      },
                    ]}
                  >
                    <Input size="large" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Employee Code"
                    name="EmployeeCode"
                    rules={[
                      {
                        required: true,
                        message: "Please enter employee code!",
                      },
                      {
                        pattern: REGEX_ALPHANUMERIC_WITHOUT_SPACE,
                        message:
                          "Space and Special characters are not Allowed!",
                      },
                      {
                        max: 20,
                        message: "only 20 characters are Allowed!",
                      },
                    ]}
                  >
                    <Input
                      disabled={
                        editUserData && Object.values(editUserData).length
                          ? true
                          : false
                      }
                      size="large"
                    />
                  </Form.Item>
                </Col>
                {/* <Col span={12}>
                <Form.Item label="Role" name="Role">
                  <Select
                    size="large"
                    options={[
                      {
                        value: "Admin",
                        label: "1",
                      },
                      {
                        value: "Supervisor",
                        label: "2",
                      },
                      {
                        value: "Operator",
                        label: "3",
                      },
                    ]}
                  />
                </Form.Item>
              </Col> */}
                <Col span={12}>
                  <Form.Item
                    label="Role"
                    name="UserRole"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Role!",
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      size="large"
                      options={userGroupOption}
                      filterOption={(input, option) => {
                        return (
                          option.label
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        );
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Password"
                    name="Password"
                    rules={[
                      {
                        required:
                          editUserData && Object.values(editUserData).length
                            ? false
                            : true,
                        message: "Please enter a password",
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
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Confirm Password"
                    name="ConfirmPassword"
                    dependencies={["Password"]}
                    rules={[
                      {
                        required:
                          editUserData && Object.values(editUserData).length
                            ? false
                            : true,
                        message: "Please enter Confirm Password!",
                      },
                      {
                        max: 50,
                        message: "Max 50 characters",
                      },
                      validatePassword,
                    ]}
                  >
                    <Input.Password size="large" autoComplete="new-password" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Email ID"
                    name="Email"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Email ID!",
                        pattern: REGEX_EMAIL,
                      },
                      {
                        max: 100,
                        message: "only 100 characters are Allowed!",
                      },
                    ]}
                  >
                    <Input size="large" />
                  </Form.Item>
                </Col>
                {/* <Col span={12}>
                <Form.Item
                  label="Company Code"
                  name="CompanyCode"
                  rules={[
                    {
                      required: true,
                      message: "Please enter Company Code!",
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Select Company"
                    options={codeTypeOption}
                    filterOption={(input, option) => {
                      return (
                        option.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      );
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Confirm Password" name="ConfirmPassword">
                  <Input.Password size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Email" name="Email">
                  <Input type="text" size="large" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Status" name="Status">
                  <Switch checkedChildren="On" unCheckedChildren="Off" />
                </Form.Item>
              </Col>
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
          </Form>
        </div>
              </Col> */}
                {user?.UserRole != "superadmin" ? (
                  <Col span={12}>
                    <Form.Item
                      label="Company Code"
                      name="Companycode"
                      rules={[
                        {
                          required: true,
                          message: "Please select your company code!",
                        },
                      ]}
                    >
                      <Input
                        value={user?.CurrentCompany}
                        readOnly
                        disabled
                        size="large"
                      />
                    </Form.Item>
                  </Col>
                ) : (
                  <Col span={12}>
                    <Form.Item
                      label="Company Code"
                      name="CompanyCode"
                      rules={[
                        {
                          required: true,
                          message: "Please select your company code!",
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        size="large"
                        options={companyListOption}
                        filterOption={(input, option) => {
                          return (
                            option.label
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          );
                        }}
                      />
                    </Form.Item>
                  </Col>
                )}

                <Col span={12}>
                  <Form.Item
                    label="Status"
                    name="Active"
                    valuePropName="checked"
                  >
                    <Switch
                      size="large"
                      checkedChildren="On"
                      unCheckedChildren="Off"
                      disabled={user?.id == editUserData?.id}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item>
                    <Space>
                      <Button
                        size="large"
                        type="primary"
                        htmlType="submit"
                        className="submitBtn"
                      >
                        {editUserData && Object.values(editUserData).length
                          ? "Update"
                          : "Save"}
                      </Button>
                      <Button
                        htmlType="button"
                        size="large"
                        onClick={handleBackToList}
                      >
                        Cancel
                      </Button>
                    </Space>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
        </Spin>
      </div>
    </MainLayout>
  );
}
