"use client";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Col,
  Input,
  Row,
  Spin,
  Pagination,
  Switch,
  Tag,
  Typography,
  Table,
  Space,
  Select,
} from "antd";
import MainLayout from "@/app/components/MainLayout";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import { redirect, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { deleteAPI, getAPI, postAPI, putAPI } from "@/utils/apiRequest";
import {
  ALL_USER_LIST,
  DELETE_USER,
  LOCK_UNLOCK_USER,
  STATUS_UPDATE,
  USER_LIST,
} from "@/app/api";
import { displayMessage, interpolate, stringCapitalize } from "@/utils/common";
import { ERROR_MSG_TYPE, SUCCESS_MSG_TYPE } from "@/constants/hardData";
import {
  AddButton,
  EditButton,
  SwitchButton,
} from "@/app/components/common/Button";
import * as utils from "@/utils/common";

const { Search } = Input;
const { Text } = Typography;

export default function Users() {
  const handleOpenPage = () => {
    router.push("/userManagement/users/add");
  };

  const dispatch = useDispatch();
  const { userRoleList } = useSelector((state) => state.utilities);
  const [userList, setUserList] = useState([]);
  const [userTableData, setUserTableData] = useState([]);
  const { user } = useSelector((state) => state.userInfo);
  const [loading, setLoading] = useState(false);
  const [searchUserList, setSearchUserList] = useState([]);
  const router = useRouter();
  const [serachText, setSerachText] = useState("");
  const [userOptionList, setUserOptionList] = useState([]);
  const [userNameOptionList, setUserNameOptionList] = useState([]);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 180,
    },
  });
  console.log(user, "useruseruser");

  const [filters, setFilters] = useState({
    CompanyCode: user?.CurrentCompany ? user?.CurrentCompany : "",
    UserRole: "",
    sortBy: "createdAt",
    page: tableParams?.pagination?.current,
    limit: tableParams?.pagination?.pageSize,
  });

  // const onChangeStatus = (e) => {
  //   setCheckedStatus(e.target.checked);
  // };

  const fetchUserList = async () => {
    setLoading(true);
    try {
      let reqData = filters;
      let res = await postAPI(USER_LIST, reqData);
      setLoading(false);
      if (res?.status === 200) {
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: res?.data?.totalResults,
          },
        });
        let res1 = res?.data?.results?.filter((val) => val?.id != user?.id);
        setUserList(res1);
        setSearchUserList(res1);
      } else {
        setUserList([]);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching company list:", error);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, [JSON.stringify(filters)]);

  // useEffect(() => {
  //   setFilters((pre) => ({
  //     ...pre,
  //     page: tableParams?.pagination?.current,
  //     limit: tableParams?.pagination?.pageSize,
  //   }));
  // }, [JSON.stringify(tableParams)]);

  const getUserEditData = async (userID) => {
    router.push(`/userManagement/users/edit/${userID}`);
  };

  const handleDeleteUser = async (userID) => {
    setLoading(true);
    try {
      const res = await deleteAPI(interpolate(DELETE_USER, [userID]));
      setLoading(false);
      if (res?.status == 200) {
        displayMessage(SUCCESS_MSG_TYPE, res?.message);
        let updatedUserList = userList.filter((val) => val.id != userID);
        setUserList(updatedUserList);
      } else {
        displayMessage(ERROR_MSG_TYPE, res?.message);
      }
    } catch (error) {
      setLoading(false);
      displayMessage(ERROR_MSG_TYPE, error?.message);
    }
  };

  const handleStatusChange = (status, userId) => {
    if (user.id != userId) {
      avtivebyuser(userId);
      setUserList((prevList) =>
        prevList.map((user) =>
          user.id == userId ? { ...user, Active: Number(!status) } : user
        )
      );
    } else {
      displayMessage(
        ERROR_MSG_TYPE,
        "You cannot activate/de-activate your own account"
      );
    }
  };

  const avtivebyuser = async (userId) => {
    try {
      const res = await putAPI(interpolate(STATUS_UPDATE, [userId]), {
        userId: user?.id,
      });
      let data = res?.data;
      if (res.status == 200) {
        if (data.Active) {
          displayMessage(SUCCESS_MSG_TYPE, "User Active");
          fetchUserList();
        } else {
          displayMessage(SUCCESS_MSG_TYPE, "User InActive");
          fetchUserList();
        }
      } else {
        displayMessage(ERROR_MSG_TYPE, error?.message);
        fetchUserList();
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const lockUnlockUser = async (checked, userId) => {
    try {
      const res = await putAPI(interpolate(LOCK_UNLOCK_USER, [userId]), {
        IsLocked: Number(!checked),
      });
      let data = res?.data;
      if (res.status == 200) {
        if (data.IsLocked) {
          displayMessage(SUCCESS_MSG_TYPE, "User Locked Successfully");
        } else {
          displayMessage(SUCCESS_MSG_TYPE, "User Unlocked Successfully");
        }

        // setUserList((prevList) =>
        //   prevList.map((user) =>
        //     user.id == userId ? { ...user, IsLocked: Number(!checked) } : user,
        //   ),
        // );
        fetchUserList();
      } else {
        displayMessage(ERROR_MSG_TYPE, error?.message);
        fetchUserList();
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const columns = [
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Employee Code",
      dataIndex: "employeeCode",
      key: "employeeCode",
    },
    {
      title: "Email ID",
      dataIndex: "emailId",
      key: "emailId",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];
  useEffect(() => {
    setLoading(true);
    let data = [];

    userList?.forEach((val, i) => {
      data.push({
        key: i.toString(),
        id: val?.id,
        customerLogo: val?.CustomerLogo ? (
          <Image
            width={50}
            height={50}
            src={
              process.env.NEXT_PUBLIC_BACKEND_BASE_IMG_URL + val?.CustomerLogo
            }
            crossOrigin="anonymous"
            alt="Customer Logo"
            style={{ objectFit: "contain" }}
            preview={false}
          />
        ) : (
          "-"
        ),
        userName: val?.FullName,
        userId: val?.UserName,
        employeeCode: val?.EmployeeCode,
        emailId: val?.Email,
        role: val?.UserRole,
        status: (
          <Tag color={val?.Active ? "green" : "red"}>
            {val?.Active ? "Active" : "Inactive"}
          </Tag>
        ),
        action: (
          <Space>
            <EditButton
              pageId={30}
              rightId={3}
              _function={() => getUserEditData(val?.id)}
              _size="small"
            />
          </Space>
        ),
      });
    });
    setLoading(false);
    setUserTableData(data);
  }, [userList]);

  const fetchAllUserList = async () => {
    const res = await getAPI(ALL_USER_LIST);

    if (String(res?.status).includes("20") && res?.data?.results?.length) {
      let codeOptions = res.data.results.map((val) => ({
        key: val.UserName,
        value: val.UserName,
        label: val.UserName,
      }));

      let nameOptions = res.data.results.map((val) => ({
        key: val.FullName,
        value: val.FullName,
        label: val.FullName,
      }));

      setUserOptionList(codeOptions);
      setUserNameOptionList(nameOptions);
    }
  };

  useEffect(() => {
    fetchAllUserList();
  }, []);

  const handleUserChange = (value) => {
    setFilters((pre) => ({ ...pre, page: 1, UserID: value || "" }));
  };

  const handleUserNameChange = (value) => {
    setFilters((pre) => ({ ...pre, page: 1, UserName: value || "" }));
  };
  const handleTableChange = (page, pageSize) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page: page,
      limit: pageSize,
    }));

    setTableParams((prevState) => ({
      ...prevState,
      pagination: {
        ...prevState.pagination,
        current: page,
        pageSize: pageSize,
      },
    }));
  };

  return (
    <MainLayout>
      <div className="page_title_container">
        <div className="component__name">User Management</div>
        <div>
          <Breadcrumb
            items={[
              {
                title: "User",
              },
            ]}
          />
        </div>
      </div>
      <div className="qc_page_container">
        <div className="qc_page_filter">
          <Row justify={"space-between"}>
            <Col>
              <Row gutter={[10, 10]}>
                <Col>
                  <div className="filter__item__search">
                    <Select
                      allowClear
                      size="large"
                      showSearch
                      placeholder="User ID"
                      filterOption={(input, option) =>
                        option.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      style={{
                        width: "100%",
                      }}
                      onChange={handleUserChange}
                      options={userOptionList}
                    />
                  </div>
                </Col>
                <Col>
                  <div className="filter__item__search">
                    <Select
                      allowClear
                      showSearch
                      size="large"
                      placeholder="User Name"
                      filterOption={(input, option) =>
                        option.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      style={{
                        width: "100%",
                      }}
                      onChange={handleUserNameChange}
                      options={userNameOptionList}
                    />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col>
              <div>
                {/* <Button type="primary" size="large" onClick={handleAddNewUser}>
                  Add User
                </Button> */}
                <AddButton
                  pageId={30}
                  rightId={2}
                  _href={"users/add"}
                  text="Add User"
                  _size="large"
                />
              </div>
            </Col>
          </Row>
        </div>
        {/* <div className="grid_list_container">
          <Spin spinning={loading}>
            {user.UserRole != "viewer" ? (
              <Row gutter={[32, 32]}>
                {userList.map((user) => (
                  <Col span={8} key={user.id}>
                    <Card
                      className="grid_card user_card"
                      title={
                        <div className="card_title">
                          <div>{user.FullName}</div>
                          <Tag color="green">
                            Role-
                            {stringCapitalize(user?.UserRole)}
                          </Tag>
                        </div>
                      }
                      actions={[
                        // <Checkbox
                        //   checked={user.Active}
                        //   onChange={(e) => handleStatusChange(e, user.id)}
                        // >
                        //   Active
                        // </Checkbox>,
                        <SwitchButton
                          pageId={30}
                          rightId={6}
                          _function={(e) =>
                            handleStatusChange(user?.Active, user.id)
                          }
                          _checkedText="Active"
                          _uncheckedText="InActive"
                          _checked={user?.Active == 1 ? true : false}
                        />,

                        <SwitchButton
                          pageId={30}
                          rightId={6}
                          _function={(e) =>
                            lockUnlockUser(user?.IsLocked, user.id)
                          }
                          _checkedText="Locked"
                          _uncheckedText="Unlocked"
                          _checked={user?.IsLocked == 1 ? true : false}
                        />,

                        <EditButton
                          // key="edit"
                          pageId={30}
                          rightId={3}
                          _function={() => getUserEditData(user?.id)}
                          _size="small"
                        />,
                      ]}
                    >
                      <div className="card_content">
                        <Row gutter={[10, 10]}>
                          <Col span={12}>
                            <Text className="qc_key">User ID</Text>
                            <div className="qc_value">{user.UserName}</div>
                          </Col>
                          <Col span={12}>
                            <Text className="qc_key">Employee Code</Text>
                            <div className="qc_value">{user.EmployeeCode}</div>
                          </Col>
                          <Col span={12}>
                            <Text className="qc_key">Email ID</Text>
                            <div className="qc_value">{user.Email}</div>
                          </Col>
                        </Row>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <Row gutter={[32, 32]}>
                {userList.map((user) => (
                  <Col span={8} key={user.id}>
                    <Card
                      className="user_card"
                      title={
                        <div className="card_title">
                          <Text>{user?.FullName}</Text>

                          <Tag color="green">
                            Role-
                            {stringCapitalize(user?.UserRole)}
                          </Tag>
                        </div>
                      }
                      actions={[
                        <EditButton
                          // key="edit"
                          pageId={30}
                          rightId={3}
                          _function={() => getUserEditData(user?.id)}
                          _size="small"
                        />,
                      ]}
                    >
                      <div className="card_content">
                        <Row gutter={[10, 10]}>
                          <Col span={10}>
                            <Text className="qc_key">User Name</Text>
                            <div className="qc_value">{user.UserName}</div>
                          </Col>
                          <Col span={14}>
                            <Text className="qc_key">Employee Code</Text>
                            <div className="qc_value">{user.EmployeeCode}</div>
                          </Col>
                          <Col span={10}>
                            <Text className="qc_key">Mobile No.</Text>
                            <div className="qc_value">{user.Mobile}</div>
                          </Col>
                          <Col span={14}>
                            <Text className="qc_key">Email ID</Text>
                            <div className="qc_value">{user.Email}</div>
                          </Col>
                        </Row>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </Spin>
          <div className="qc_mt_3">
            <Pagination
              total={tableParams.pagination.total}
              pageSize={tableParams.pagination.pageSize}
              current={tableParams.pagination.current}
              onChange={handleTableChange}
            />
          </div>
        </div> */}
        <div className="grid_list_container">
          <Table
            className="qc_mt_2"
            dataSource={userTableData}
            columns={columns}
            pagination={tableParams.pagination}
            onChange={handleTableChange}
            size="small"
          />
        </div>
      </div>
    </MainLayout>
  );
}
