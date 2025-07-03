"use client";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Col,
  Form,
  Input,
  Pagination,
  Row,
  Space,
  Switch,
  Checkbox,
  Tag,
} from "antd";
import MainLayout from "@/app/components/MainLayout";
import { redirect } from "next/navigation";
import { EditOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { postAPI, putAPI } from "@/utils/apiRequest";
import {
  ADD_USER_GROUP,
  EDIT_USER_GROUP,
  LIST_USER_GROUP,
  STATUS_USERGROUP,
} from "@/app/api";
import { displayMessage, interpolate } from "@/utils/common";
import { ERROR_MSG_TYPE, SUCCESS_MSG_TYPE } from "@/constants/hardData";
import {
  REGEX_ALPHANUMERIC_WITH_SPACE,
  REGEX_ALPHANUMERIC_WITHOUT_SPACE,
} from "@/utils/validation";
import { AddButton, EditButton } from "@/app/components/common/Button";
const { Search } = Input;

export default function UserGroup() {
  const [form] = Form.useForm();
  const [editform] = Form.useForm();
  const [isAddingGroup, setIsAddingGroup] = useState(false);
  const [isEditingGroup, setIsEditingGroup] = useState(false);
  const [groupList, setGroupList] = useState([]);
  const [allGroupList, setAllGroupList] = useState([]);
  const [editingGroupId, setEditingGroupId] = useState(null);
  const [serachText, setSerachText] = useState("");
  const { user } = useSelector((state) => state.userInfo);
  const navBarInfo = useSelector((state) => state?.navBarInfo);
  const [checkedStatus, setCheckedStatus] = useState({});
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 200,
    },
  });

  const [filters, setFilters] = useState({
    sortBy: "createdAt",
    page: tableParams?.pagination?.current,
    limit: tableParams?.pagination?.pageSize,
  });

  useEffect(() => {
    fetchGroupList();
  }, [JSON.stringify(filters)]);

  const fetchGroupList = async () => {
    const res = await postAPI(LIST_USER_GROUP, filters);
    if (String(res?.status).includes("20")) {
      setTableParams((prevState) => ({
        ...prevState,
        pagination: {
          ...prevState.pagination,
          total: res?.data?.totalResults,
        },
      }));
      setGroupList(
        res.data.results?.filter((role) => role?.RoleId != "superadmin")
      );
      setAllGroupList(
        res.data.results?.filter((role) => role?.RoleId != "superadmin")
      );
      // applySearchFilter(
      //   serachText,
      //   res.data.results?.filter((role) => role?.RoleId != "superadmin") || []
      // );

      let tempStatus = res.data.results?.map((val) => ({
        [val?.id]: val?.Active,
      }));

      setCheckedStatus(tempStatus);
    }
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

  const onFinish = async (values) => {
    const payload = {
      ...values,
      RoleId: (values?.RoleId).toUpperCase(),
      Active: Number(values.Active),
    };
    try {
      const response = await postAPI(ADD_USER_GROUP, payload);

      if (String(response?.status).includes("20")) {
        displayMessage(SUCCESS_MSG_TYPE, "User Group saved successfully!");
      }
      fetchGroupList();
      setIsAddingGroup(false);
      form.resetFields();
    } catch (error) {
      displayMessage(ERROR_MSG_TYPE, "Failed to save Group!");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const onFinishEdit = async (values) => {
    try {
      const response = await putAPI(
        interpolate(EDIT_USER_GROUP, [values.RoleId.toUpperCase()]),
        values
      );
      if (String(response?.status).includes("20")) {
        displayMessage(SUCCESS_MSG_TYPE, "User Group Update successfully!");
      }
      fetchGroupList();
      setIsEditingGroup(false);
      editform.resetFields();
    } catch (error) {
      console.error("Failed to edit group:", error);
    }
  };

  const handleEdit = (group) => {
    console.log(group, "groupgroupgroup");
    if (group?.IsFixed == 1) {
      displayMessage(ERROR_MSG_TYPE, "You Can't Edit Fixed Roles");
      return;
    }
    setIsEditingGroup(true);
    setEditingGroupId(group.id);
    editform.setFieldsValue({
      RoleName: group.RoleName,
      RoleId: group.RoleId,
      Active: group.Active == 1,
    });
  };

  const searchItems11 = (e) => {
    let val = String(e.target.value).toLowerCase();

    let data = allGroupList?.filter(
      (item) =>
        String(item.RoleName).toLowerCase().includes(val) ||
        String(item.RoleId).toLowerCase().includes(val)
    );
    setGroupList(data);
  };

  // const applySearchFilter = (searchValue, data) => {
  //   const filteredData = data.filter((item) =>
  //     [item.RoleName, item.RoleId]
  //       .map((field) => String(field).toLowerCase())
  //       .some((field) => field.includes(searchValue.toLowerCase()))
  //   );
  //   setGroupList(filteredData);
  // };

  // const handleSearch = (e) => {
  //   const value = e.target.value;
  //   setSerachText(value);
  //   applySearchFilter(value, allGroupList);
  // };

  const searchItems = (e) => {
    let val = String(e.target.value).toLowerCase();

    if (val.length < 3) {
      setGroupList(allGroupList);
      return;
    }

    let data = allGroupList?.filter(
      (item) =>
        String(item.RoleName).toLowerCase().includes(val) ||
        String(item.RoleId).toLowerCase().includes(val)
    );
    setGroupList(data);
  };

  const handleCheckboxChange = async (e, group) => {
    try {
      const res = await putAPI(interpolate(STATUS_USERGROUP, [group?.RoleId]));
      if (res?.status == 200) {
        displayMessage(
          SUCCESS_MSG_TYPE,
          "User Group Status Changed Successfully"
        );
        fetchGroupList();
      } else {
        displayMessage(ERROR_MSG_TYPE, res?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <MainLayout>
      <div className="page_title_container">
        <div className="component__name">User Management</div>
        <div>
          <Breadcrumb
            items={[
              {
                title: "Users Group",
              },
            ]}
          />
        </div>
      </div>
      <div className="qc_page_container">
        <div className="qc_page_filter">
          <Row>
            <Col>
              <div className="filter__item__search">
                <Search
                  placeholder="Search User Group Name/Code"
                  onChange={(e) => searchItems(e)}
                  size="large"
                  // value={serachText}
                />
              </div>
            </Col>
          </Row>
        </div>
        <div className="user_group_container">
          {/* ===== add group item =====  */}
          <div className="user_group_item">
            <Form
              name="basic"
              form={form}
              labelCol={{
                span: 24,
              }}
              wrapperCol={{
                span: 24,
              }}
              initialValues={{
                Active: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
            >
              <Row gutter={[24, 16]} align="middle">
                <Col span={6}>
                  <Form.Item
                    label="Group Name"
                    name="RoleName"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Group Name!",
                      },
                      {
                        pattern: REGEX_ALPHANUMERIC_WITH_SPACE,
                        message:
                          "Space and Special characters are not allowed!",
                      },
                      {
                        max: 30,
                        message: "Max 30 characters are allowed",
                      },
                    ]}
                  >
                    {isAddingGroup ? <Input /> : <div>----</div>}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item
                    label="Group Code"
                    name="RoleId"
                    rules={[
                      {
                        required: true,
                        message: "Please enter Group Code!",
                      },
                      {
                        pattern: REGEX_ALPHANUMERIC_WITHOUT_SPACE,
                        message:
                          "Space and Special characters are not allowed!",
                      },
                      {
                        max: 20,
                        message: "Max 20 characters are allowed",
                      },
                    ]}
                  >
                    {isAddingGroup ? <Input /> : <div>----</div>}
                  </Form.Item>
                </Col>
                <Col span={6}>
                  <Form.Item label="Status" name="Active">
                    {isAddingGroup ? (
                      <Switch checkedChildren="On" unCheckedChildren="Off" />
                    ) : (
                      <div>----</div>
                    )}
                  </Form.Item>
                </Col>
                <Col
                  span={6}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  <Form.Item label={null}>
                    {!isAddingGroup ? (
                      <div
                        className="link_type_btn link_type_btn_lg link_type_btn_primary cursor_pointer"
                        type="link"
                        onClick={() => setIsAddingGroup(true)}
                      >
                        Add New Group
                      </div>
                    ) : (
                      // <AddButton
                      //   pageId={47}
                      //   rightId={2}
                      //   text="Add New Group"
                      //   _function={() => {
                      //     setIsAddingGroup(true);
                      //   }}
                      // />
                      <div>
                        <Space size="large">
                          <Button
                            className="link_primary"
                            type="link"
                            htmlType="submit"
                          >
                            Save
                          </Button>
                          <Button
                            className="link"
                            type="link"
                            htmlType="submit"
                            onClick={() => setIsAddingGroup(false)}
                          >
                            Cancel
                          </Button>
                        </Space>
                      </div>
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </div>
          {/* ===== group row =====  */}

          {groupList.map((group) => (
            <div key={group.id} className="user_group_item">
              <Form
                key={group.id}
                labelCol={{
                  span: 24,
                }}
                wrapperCol={{
                  span: 24,
                }}
                form={editform}
                onFinish={onFinishEdit}
              >
                <Row gutter={[24, 16]} align="middle">
                  <Col span={6}>
                    <Form.Item
                      label="Group Name"
                      name="RoleName"
                      rules={[
                        {
                          required: true,
                          message: "Please enter Group Name!",
                        },
                        {
                          pattern: REGEX_ALPHANUMERIC_WITH_SPACE,
                          message:
                            "Space and Special characters are not allowed!",
                        },
                        {
                          max: 30,
                          message: "Max 30 characters are allowed",
                        },
                      ]}
                    >
                      {isEditingGroup && group.id == editingGroupId ? (
                        <Input disabled={group?.IsFixed == 1} />
                      ) : (
                        <div>{group?.RoleName}</div>
                      )}
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item label="Group Code" name="RoleId">
                      {isEditingGroup && group.id == editingGroupId ? (
                        <Input disabled />
                      ) : (
                        <div>{group?.RoleId}</div>
                      )}
                    </Form.Item>
                  </Col>

                  <Col span={6}>
                    {isEditingGroup && group.id == editingGroupId ? (
                      <Form.Item label="Status" name="Active">
                        <Switch
                          disabled={group?.IsUsed == 1}
                          checked={checkedStatus[group.id]}
                          checkedChildren="On"
                          unCheckedChildren="Off"
                        />
                      </Form.Item>
                    ) : (
                      <Form.Item label="Status" name="Active1">
                        <Checkbox
                          disabled={group?.IsUsed == 1}
                          checked={group?.Active}
                          onChange={(e) => handleCheckboxChange(e, group)}
                        >
                          Active
                        </Checkbox>
                      </Form.Item>
                    )}
                  </Col>

                  <Col span={6}>
                    {!isEditingGroup || editingGroupId !== group?.id ? (
                      // <EditButton
                      //   pageId={47}
                      //   rightId={3}
                      //   _function={() => handleEdit(group)}
                      //   _size="small"
                      // />
                      <Button type="link" onClick={() => handleEdit(group)}>
                        Edit
                      </Button>
                    ) : (
                      <Space size="large">
                        <Button type="link" htmlType="submit">
                          Save
                        </Button>
                        <Button
                          type="link"
                          onClick={() => setIsEditingGroup(false)}
                        >
                          Cancel
                        </Button>
                      </Space>
                    )}
                  </Col>
                </Row>
              </Form>
            </div>
          ))}
        </div>
        <Pagination
          total={tableParams.pagination.total}
          pageSize={tableParams.pagination.pageSize}
          current={tableParams.pagination.current}
          onChange={handleTableChange}
        />
      </div>
    </MainLayout>
  );
}
