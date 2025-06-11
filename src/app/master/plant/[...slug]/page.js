"use client";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Col,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Switch,
  Table,
} from "antd";
import MainLayout from "@/app/components/MainLayout";
import { redirect, useParams, useRouter } from "next/navigation";
import { CloseOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import {
  ADD_COMPANY,
  ADD_COMPANY_CONTACT,
  DELETE_COMPANY_CONTACT,
  GET_COMMON,
  GET_COMPANY_BYCODE,
  UPDATE_COMPANY,
  UPDATE_COMPANY_CONTACT,
} from "@/app/api";
import {
  displayMessage,
  fetchCompanyList,
  interpolate,
  searchPincode,
} from "@/utils/common";
import { deleteAPI, getAPI, postAPI, putAPI } from "@/utils/apiRequest";
import { ERROR_MSG_TYPE, SUCCESS_MSG_TYPE } from "@/constants/hardData";
import { DeleteButton, EditButton } from "@/app/components/common/Button";
import { setCompanyList } from "@/redux/utilitiesSlice";
import {
  IP_ADDRESS,
  REGEX_ALPHANUMERIC_WITHOUT_SPACE,
  REGEX_CITY,
  REGEX_COUNTRY,
  REGEX_EMAIL,
  regex_mobile,
  REGEX_NAME,
  REGEX_PINCODE,
  REGEX_STATE,
} from "@/utils/validation";
const { TextArea } = Input;

export default function PlantAdd() {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const router = useRouter();
  const params = useParams();
  const [formContact] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cCode, setCCode] = useState(null);
  const [editcontact, setEditContact] = useState(null);
  const [editCompanyData, setEditCompanyData] = useState(null);
  const [companyTypeList, setCompanyTypeList] = useState([]);
  const [companyTypeOption, setCompanyTypeOption] = useState([]);
  const [slug, setSlug] = useState([]);

  const handleBackToList = () => {
    router.push("/master/plant");
  };

  // useEffect(() => {
  //   const unwrapParams = async () => {
  //     const resolvedParams = await params; // Unwrap the promise
  //     setSlug(resolvedParams.slug);
  //   };

  //   unwrapParams();
  // }, [params]);
  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params; // Unwrap the promise
      setSlug(resolvedParams.slug || []); // Ensure slug is always an array
    };

    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (Array.isArray(slug) && slug.length > 0 && slug[0] == "edit") {
      fetchCompanyData(slug[1]);
    }
  }, [slug]);

  const fetchCompanyData = async (_code) => {
    setLoading(true);
    try {
      let res = await postAPI(interpolate(GET_COMPANY_BYCODE, [_code]));

      setLoading(false);
      if (res?.status == 200) {
        const companyData = res?.data[0];
        form.setFieldsValue({
          PlantCode: companyData?.CompanyCode,
          PlantName: companyData?.CompanyName,
          Address: companyData?.Address,
          City: companyData?.City,
          State: companyData?.State,
          Country: companyData?.Country,
          PinCode: companyData?.PinCode,
          LicenseNo: companyData?.LicenseNo,
          PlantType: companyData?.CompanyType,
          IpAddress: companyData?.IpAddress,
          Active: companyData?.Active,
        });
        let _contactData = companyData.ContactDetails.map((item, index) => ({
          key: index.toString(),
          _id: item.id,
          PlantCode: item.CompanyCode,
          Name: item.Name,
          ContactNo: item.ContactNo,
          Email: item.Email,
          Designation: item.Designation,
          Purpose: item.Purpose,
        }));
        setDataSource(_contactData);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching company data:", error);
    }
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    formContact.resetFields();
    setEditContact(null);
    setModalVisible(false);
  };

  const fetchCompanyType = async () => {
    try {
      let res = await getAPI(interpolate(GET_COMMON, ["COMPANYTYPE"]));
      if (res?.status == 200) {
        setCompanyTypeList(res?.data);
      } else {
        setCompanyTypeList([]);
      }
    } catch (error) {}
  };

  useEffect(() => {
    fetchCompanyType();
  }, []);

  useEffect(() => {
    const data = companyTypeList.map((val) => ({
      value: val?.Value,
      label: val?.Value,
    }));
    setCompanyTypeOption(data);
  }, [companyTypeList]);

  const handleSave = async () => {
    formContact.validateFields().then(async (values) => {
      if (slug[0] == "edit") {
        console.log(slug[0], "slug[0]slug[0]slug[0]");
        if (editcontact !== null) {
          console.log(editcontact, "editcontacteditcontacteditcontact");
          // Edit contact via API
          try {
            const response = await putAPI(
              interpolate(UPDATE_COMPANY_CONTACT, [editcontact]),
              {
                ...values,
                CompanyCode: slug[1],
              }
            );
            if (response?.status === 200) {
              setDataSource((prev) =>
                prev.map((item) =>
                  item._id == editcontact ? { ...item, ...values } : item
                )
              );
              displayMessage(SUCCESS_MSG_TYPE, response?.message);
            }
          } catch (error) {
            console.error("Error updating contact:", error);
          }
        } else {
          // Add contact via API
          try {
            const response = await postAPI(ADD_COMPANY_CONTACT, {
              ...values,
              CompanyCode: slug[1],
            });
            if (response?.status === 200) {
              setDataSource((prev) => [
                ...prev,
                {
                  key: prev?.length,
                  _id: response.companyData.id,
                  ...response.companyData,
                },
              ]);
              displayMessage(SUCCESS_MSG_TYPE, response?.message);
            }
          } catch (error) {
            console.error("Error adding contact:", error);
          }
        }
      } else {
        if (editcontact !== null) {
          // Edit contact locally
          const newData = [...dataSource];
          const index = newData.findIndex((item) => item.key === editcontact);
          if (index > -1) {
            newData[index] = { ...newData[index], ...values };
            setDataSource(newData);
          }
        } else {
          // Add contact locally
          const newData = {
            key: dataSource.length.toString(),
            ...values,
          };
          setDataSource([...dataSource, newData]);
        }
      }
      formContact.resetFields();
      setModalVisible(false);
      setEditContact(null);
    });
  };

  const handleDelete = async (id, key) => {
    if (slug[0] == "edit") {
      // Delete contact via API
      try {
        const response = await deleteAPI(
          interpolate(DELETE_COMPANY_CONTACT, [id])
        );
        if (response?.status == 200) {
          setDataSource((prev) => prev.filter((item) => item._id !== id));
          displayMessage(SUCCESS_MSG_TYPE, response?.message);
        }
      } catch (error) {
        console.error("Error deleting contact:", error);
      }
    } else {
      // Delete contact locally
      const newData = dataSource.filter((item) => item.key !== key);
      setDataSource(newData);
    }
  };

  const handleEdit = (record) => {
    formContact.setFieldsValue(record);

    if (slug[0] == "edit") {
      setEditContact(record._id);
    } else {
      setEditContact(record.key);
    }
    setModalVisible(true);
  };
  console.log(
    slug,
    "slugslugslugslugslug11111111111111111111111111111111111111111111"
  );
  const handlePostalCodeChange = async (e) => {
    const postalCode = e.target.value;
    if (!REGEX_PINCODE.test(postalCode)) {
      form.setFieldsValue({
        City: "",
        State: "",
        Country: "",
      });
      return;
    }
    try {
      const res = searchPincode(postalCode);
      if (res?.length) {
        let locationData = res[0];
        form.setFieldsValue({
          City: locationData.city,
          State: locationData.state,
          Country: "India",
        });
      } else {
        form.setFieldsValue({
          City: "",
          State: "",
          Country: "",
        });
      }
    } catch (error) {
      form.setFieldsValue({
        City: "",
        State: "",
        Country: "",
      });
    }
  };

  const defaultColumns = [
    {
      title: "Name",
      dataIndex: "name",
      editable: true,
      render: (_, record) => (dataSource?.length >= 1 ? record?.Name : null),
    },
    {
      title: "Contact No.",
      dataIndex: "contactNo",
      render: (_, record) =>
        dataSource?.length >= 1 ? record?.ContactNo : null,
    },
    {
      title: "Email ID",
      dataIndex: "email",
      render: (_, record) => (dataSource?.length >= 1 ? record?.Email : null),
    },
    {
      title: "Designation",
      dataIndex: "designation",
      render: (_, record) =>
        dataSource?.length >= 1 ? record?.Designation : null,
    },
    {
      title: "Purpose",
      dataIndex: "purpose",
      render: (_, record) => (dataSource?.length >= 1 ? record?.Purpose : null),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) =>
        dataSource?.length >= 1 ? (
          <>
            <Space>
              <EditButton
                pageId={21}
                rightId={3}
                _function={() => {
                  handleEdit(record);
                }}
                _size="small"
              />
              <DeleteButton
                pageId={21}
                rightId={4}
                _function={() => {
                  handleDelete(record?._id, record.key);
                }}
                _size="small"
              />
            </Space>
          </>
        ) : null,
    },
  ];

  const handleSubmit = async (values) => {
    setLoading(true);
    if (dataSource.length == 0) {
      displayMessage(ERROR_MSG_TYPE, "Please add at least one contact.");
      return;
    }
    const formattedData = {
      ...values,
      ContactDetails: dataSource.map((item) => ({
        CompanyCode: String(values?.CompanyCode)?.toUpperCase(),
        Name: item.Name,
        ContactNo: item.ContactNo,
        Email: item.Email,
        Designation: item.Designation,
        Purpose: item.Purpose,
        // Action: item.Action,
      })),
    };

    let res;
    try {
      if (slug && slug.length > 0 && slug[0] == "edit") {
        const formObj = {
          CompanyCode: values?.PlantCode,
          CompanyName: values?.PlantName,
          Address: values?.Address,
          City: values?.City,
          State: values?.State,
          Country: values?.Country,
          PinCode: values?.PinCode,
          LicenseNo: values?.LicenseNo,
          CompanyType: values?.PlantType,
          Active: values?.Active,
        };
        res = await putAPI(UPDATE_COMPANY, formObj);
      } else {
        res = await postAPI(ADD_COMPANY, formattedData);
      }
      setLoading(false);
      if (res.status === 200) {
        displayMessage(SUCCESS_MSG_TYPE, res?.message);
        const _companyList = await fetchCompanyList();
        dispatch(setCompanyList(_companyList));
        setTimeout(() => {
          router.push("/master/plant");
        }, 500);
      } else {
        message.error("Failed to update company.");
      }
    } catch (error) {
      console.error("Update error:", error);
      message.error("An error occurred while Add/updating the company.");
    }
  };

  return (
    <MainLayout>
      <div className="page_title_container">
        <div className="component__name">Master</div>
        <div>
          <Breadcrumb
            items={[
              {
                title: "Master",
              },
              {
                title: (
                  <div className="cursor_pointer" onClick={handleBackToList}>
                    Plant
                  </div>
                ),
              },
              {
                title:
                  slug && slug.length > 0 && slug[0] == "edit"
                    ? "Update Plant"
                    : "Add Plant",
              },
            ]}
          />
        </div>
      </div>
      <div className="qc_page_container">
        <div className="grid_list_container">
          <div>
            <Form
              style={{ width: "736px" }}
              form={form}
              name="basic"
              layout={"vertical"}
              autoComplete="off"
              initialValues={{
                Active: true,
              }}
              onFinish={handleSubmit}
            >
              <Row gutter={[32]}>
                <Col span={12}>
                  <Form.Item
                    label="Plant Code"
                    name="PlantCode"
                    rules={[
                      {
                        required: true,

                        message: "Please input your plant code!",
                      },
                      {
                        pattern: REGEX_ALPHANUMERIC_WITHOUT_SPACE,
                        message:
                          "Space and Special characters are not allowed!",
                      },
                      {
                        max: 10,
                        message: "Only 10 characters are allowed!",
                      },
                    ]}
                  >
                    <Input
                      disabled={
                        slug && slug.length > 0 && slug[0] == "edit"
                          ? true
                          : false
                      }
                      style={{ textTransform: "uppercase" }}
                      type="text"
                      size="large"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Plant Name"
                    name="PlantName"
                    rules={[
                      {
                        required: true,

                        message: "Please input your plant name!",
                      },
                      {
                        pattern: REGEX_NAME,
                        message: "Special Characters are not allowed!",
                      },
                      {
                        max: 100,
                        message: "Only 100 characters are allowed!",
                      },
                    ]}
                  >
                    <Input type="text" size="large" />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Plant Type"
                    name="PlantType"
                    rules={[
                      {
                        required: true,
                        message: "Please input your plant type!",
                      },
                    ]}
                  >
                    <Select
                      size="large"
                      showSearch
                      options={companyTypeOption}
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
                    label="License No."
                    name="LicenseNo"
                    rules={[
                      {
                        required: true,
                        message: "Please input your License No.!",
                      },
                      {
                        max: 100,
                        message: "Only 100 characters are allowed!",
                      },
                    ]}
                  >
                    <Input type="text" size="large" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    label="Address"
                    name="Address"
                    rules={[
                      {
                        required: true,
                        // pattern: REGEX_ADDRESS,
                        message: "Please input your plant Address!",
                      },
                      {
                        max: 200,
                        message: "Only 200 characters are allowed!",
                      },
                    ]}
                  >
                    <Input type="text" size="large" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Pin Code"
                    name="PinCode"
                    rules={[
                      {
                        required: true,
                        pattern: REGEX_PINCODE,
                        message: "Please input your Pin Code!",
                      },
                      {
                        max: 6,
                        message: "Only 6 digits are allowed!",
                      },
                    ]}
                  >
                    <Input
                      onChange={handlePostalCodeChange}
                      type="text"
                      size="large"
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Country"
                    name="Country"
                    rules={[
                      {
                        required: true,
                        pattern: REGEX_COUNTRY,
                        message: "Please input your Country!",
                      },
                      {
                        max: 100,
                        message: "Only 100 characters are allowed!",
                      },
                    ]}
                  >
                    <Input type="text" size="large" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="State"
                    name="State"
                    rules={[
                      {
                        required: true,
                        pattern: REGEX_STATE,
                      },
                      {
                        max: 100,
                        message: "Only 100 characters are allowed!",
                      },
                    ]}
                  >
                    <Input type="text" size="large" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="City"
                    name="City"
                    rules={[
                      {
                        required: true,
                        pattern: REGEX_CITY,
                        message: "Please input your City!",
                      },
                      {
                        max: 100,
                        message: "Only 100 characters are allowed!",
                      },
                    ]}
                  >
                    <Input type="text" size="large" />
                  </Form.Item>
                </Col>
                {/* <Col span={12}>
                  <Form.Item
                    label="IP Address"
                    name="IpAddress"
                    rules={[
                      {
                        required: true,
                        message: "Please input your IP Address!",
                      },
                      {
                        pattern: IP_ADDRESS,
                        message:
                          "Please enter IP Address four No. seperated by periods",
                      },
                      {
                        max: 20,
                        message: "Only 20 characters are allowed!",
                      },
                    ]}
                  >
                    <Input
                      placeholder="Please Enter IP Address"
                      type="text"
                      size="large"
                    />
                  </Form.Item>
                </Col> */}
                <Col span={12}>
                  <Form.Item
                    label="Active"
                    name="Active"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Switch
                      disabled={slug && slug.length > 0 && slug[0] == "edit"}
                      checkedChildren="On"
                      unCheckedChildren="Off"
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row>
                <Col span={24}>
                  <h3>Contact</h3>
                  <div className="qc-mt-5">
                    <Button
                      icon={<PlusOutlined />}
                      onClick={showModal}
                      type="primary"
                      // style={{
                      //   marginTop: 16,
                      // }}
                    >
                      Add a row
                    </Button>
                    <div className="qc_mb_5">
                      <Table
                        className="qc_mt_2"
                        size="small"
                        columns={defaultColumns}
                        // dataSource={dataSource?.filter(
                        //   (val) => val?.Action != 'REMOVE',
                        // )}
                        dataSource={dataSource}
                        rowKey="key"
                        pagination={false}
                        // style={{
                        //   marginTop: 16,
                        // }}
                      />
                    </div>
                  </div>
                </Col>
              </Row>

              <Col span={24}>
                <Form.Item>
                  <Space size="large" className="qc_mt_5">
                    <Button type="primary" htmlType="submit" size="large">
                      {slug && slug.length > 0 && slug[0] == "edit"
                        ? "Update Plant"
                        : "Add Plant"}
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
            </Form>
            <Modal
              title="Add Contact"
              open={modalVisible}
              onCancel={handleCancel}
              footer={null}
            >
              <Form form={formContact} onFinish={handleSave} layout="vertical">
                <Row gutter={16}>
                  <Col span={12}>
                    <Form.Item
                      label="Name"
                      name="Name"
                      rules={[
                        { required: true, message: "Please enter name" },
                        {
                          pattern: REGEX_NAME,
                          message: "special characters are not Allowed!",
                        },
                        {
                          max: 100,
                          message: "only 100 characters are Allowed!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Name" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Contact No."
                      name="ContactNo"
                      rules={[
                        {
                          required: true,
                          message: "Please enter contact number",
                        },
                        {
                          pattern: regex_mobile,
                          message: "Invalid phone number format",
                        },
                        {
                          max: 10,
                          message: "only 10  digits are Allowed!",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Enter Contact No."
                        disabled={editcontact !== null}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Email"
                      name="Email"
                      rules={[
                        { required: true, message: "Please enter email" },
                        {
                          pattern: REGEX_EMAIL,
                          message: "Invalid email format",
                        },
                        {
                          max: 100,
                          message: "only 100 characters are Allowed!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Email" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Designation"
                      name="Designation"
                      rules={[
                        { required: true, message: "Please enter designation" },
                        {
                          max: 100,
                          message: "only 100 characters are Allowed!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Designation" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Purpose"
                      name="Purpose"
                      rules={[
                        { required: true, message: "Please enter purpose" },
                        {
                          max: 100,
                          message: "only 100 characters are Allowed!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Purpose" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Space>
                    <Button type="primary" htmlType="submit">
                      Save
                    </Button>

                    <Button onClick={handleCancel}> Cancel</Button>
                  </Space>
                </Row>
              </Form>
            </Modal>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
