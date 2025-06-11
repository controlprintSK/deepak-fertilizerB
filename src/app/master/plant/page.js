"use client";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Input,
  Row,
  Space,
  Modal,
  Table,
  Tag,
} from "antd";
import MainLayout from "@/app/components/MainLayout";
import { EditOutlined, SearchOutlined } from "@ant-design/icons";
import { redirect, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { postAPI, putAPI } from "@/utils/apiRequest";
import { LIST_COMPANY, LIST_COMPANY_CONTACT, STATUS_UPDATE } from "@/app/api";
import { ERROR_MSG_TYPE, SUCCESS_MSG_TYPE } from "@/constants/hardData";
import { displayMessage, interpolate } from "@/utils/common";
import { AddButton } from "@/app/components/common/Button";
const { Search } = Input;

export default function Plant() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleOpenPage = () => {
    router.push("/master/plant/add");
  };

  const handleEdit = (CompanyCode) => {
    // localStorage.setItem('companyData', CompanyCode);
    router.push(`plant/edit/${CompanyCode}`);
    // redirect(`/master/company-add`);
  };

  const { userRoleList } = useSelector((state) => state.utilities);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [contactDetails, setContactDetails] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [plantTableData, setPlantTableData] = useState([]);
  const [companyList, setCompanyList] = useState([]);
  const { user } = useSelector((state) => state.userInfo);
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [searchCompanyList, setSearchCompanyList] = useState([]);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 5,
    },
  });
  console.log(user, "useruseruseruseruseruseruser");

  const [filters, setFilters] = useState({
    CompanyCode: user?.CurrentCompany ? user?.CurrentCompany : "",
    sortBy: "createdAt",
    page: tableParams?.pagination?.current,
    limit: tableParams?.pagination?.pageSize,
  });

  useEffect(() => {
    fetchCompanyList();
  }, [JSON.stringify(filters)]);

  const fetchCompanyList = async () => {
    setLoading(true);
    try {
      const res = await postAPI(LIST_COMPANY, filters);
      setLoading(false);
      if (res?.status == 200) {
        setTableParams((prevState) => ({
          ...prevState,
          pagination: {
            ...prevState.pagination,
            total: res?.data?.totalResults,
          },
        }));
        setCompanyList(res?.data?.results);
        setSearchCompanyList(res?.data?.results);
      } else {
        setCompanyList([]);
      }
    } catch (error) {
      setLoading(false);
      displayMessage(ERROR_MSG_TYPE, error?.message || "Error fetching data.");
    }
  };

  useEffect(() => {
    setLoading(true);
    let data = [];

    companyList?.forEach((val, i) => {
      data.push({
        key: i.toString(),
        id: val?.id,
        plantName: val?.CompanyName,
        plantCode: val?.CompanyCode,
        plantType: val?.CompanyType,
        licenseNo: val?.LicenseNo,
        address: val?.Address,
        state: val?.State,
        city: val?.City,
        // status: val?.contactNo,
        status: (
          <Tag color={val?.Active ? "green" : "red"}>
            {val?.Active ? "Active" : "Inactive"}
          </Tag>
        ),
        contact: (
          <Button
            color="primary"
            variant="outlined"
            key="view-contact"
            aria-label="View Contact"
            onClick={() => showModal(val?.CompanyCode)}
          >
            View Contact
          </Button>
        ),
        action: (
          <Space>
            <Button
              icon={<EditOutlined />}
              key={`edit_${i}`}
              shape="round"
              size="small"
              onClick={() => handleEdit(val?.CompanyCode)}
            />
          </Space>
        ),
      });
    });
    setLoading(false);
    setPlantTableData(data);
  }, [companyList]);

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

  const showModal = async (companyCode) => {
    setLoading(true);
    setIsModalVisible(false);
    setContactDetails({});
    try {
      const res = await postAPI(
        interpolate(LIST_COMPANY_CONTACT, [companyCode])
      );

      setLoading(false);
      if (res?.status == 200) {
        const contactData = res?.data;
        setContactDetails(contactData);
        setTableData(
          contactData.map((contact, index) => ({
            key: index.toString(),
            name: contact.Name,
            contactNo: contact.ContactNo,
            email: contact.Email,
            designation: contact.Designation,
            purpose: contact.Purpose,
            id: contact.id,
          }))
        );
      } else {
        setContactDetails([]);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching contact details:", error);
      setIsModalVisible(true);
    }
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Contact No.",
      dataIndex: "contactNo",
      key: "contactNo",
    },
    {
      title: "Email ID",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Designation",
      dataIndex: "designation",
      key: "designation",
    },
    {
      title: "Purpose",
      dataIndex: "purpose",
      key: "purpose",
    },
  ];

  const ColumnsPlant = [
    {
      title: "Plant Code",
      dataIndex: "plantCode",
      key: "plantCode",
      width: 100,
    },
    {
      title: "Plant Name",
      dataIndex: "plantName",
      key: "plantName",
      width: 150,
    },
    {
      title: "Plant Type",
      dataIndex: "plantType",
      key: "plantType",
      width: 100,
    },
    {
      title: "License No.",
      dataIndex: "licenseNo",
      key: "licenseNo",
      width: 150,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "State",
      dataIndex: "state",
      key: "state",
      width: 100,
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
      width: 120,
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Contact",
      dataIndex: "contact",
      key: "contact",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];
  const handleStatusChange = (e, userId) => {
    if (user.id != userId) {
      avtivebyuser(userId);
      setCompanyList((prevList) =>
        prevList.map((user) =>
          user.id == userId ? { ...user, Active: e.target.checked } : user
        )
      );
    } else {
      displayMessage(
        ERROR_MSG_TYPE,
        "You cannot activate/de-activate your own account"
      );
    }
  };

  const searchCompName = (e) => {
    let val = String(e.target.value).toLowerCase();

    let data = searchCompanyList?.filter((item) =>
      String(item.CompanyName).toLowerCase().includes(val)
    );
    setCompanyList(data);
  };

  const searchCompCode = (e) => {
    let val = String(e.target.value).toLowerCase();

    let data = searchCompanyList?.filter((item) =>
      String(item.CompanyCode).toLowerCase().includes(val)
    );
    setCompanyList(data);
  };

  const avtivebyuser = async (userId) => {
    try {
      const res = await putAPI(interpolate(STATUS_UPDATE, [userId]), {
        userId: user?.id,
      });
      let data = res?.data;
      if (res.status == 200) {
        if (data.Active) {
          displayMessage(SUCCESS_MSG_TYPE, "Plant Active");
        } else {
          displayMessage(SUCCESS_MSG_TYPE, "Plant InActive");
        }
      } else {
        displayMessage(ERROR_MSG_TYPE, error?.message);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const searchCompanyCode = (e) => {
    let val = String(e.target.value).toLowerCase();

    let data = searchCompanyList?.filter((item) =>
      String(item.CompanyCode).toLowerCase().includes(val)
    );
    setCompanyList(data);
  };

  const searchCompanyName = (e) => {
    let val = String(e.target.value).toLowerCase();

    let data = searchCompanyList?.filter((item) =>
      String(item.CompanyName).toLowerCase().includes(val)
    );
    setCompanyList(data);
  };

  return (
    <MainLayout>
      <div className="page_title_container">
        {/* <div className="component__name">Master</div> */}
        <div>
          <Breadcrumb
            items={[
              {
                title: "Master",
              },
              {
                title: "Plant",
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
                {user?.UserRole == "superadmin" ? (
                  <Col>
                    <div className="filter__item__search">
                      <Input
                        prefix={<SearchOutlined />}
                        placeholder="Search Plant Code"
                        size="large"
                        onChange={(e) => searchCompanyCode(e)}
                      />
                    </div>
                  </Col>
                ) : (
                  ""
                )}
                {user?.UserRole == "superadmin" ? (
                  <Col>
                    <div className="filter__item__search">
                      <Input
                        prefix={<SearchOutlined />}
                        placeholder="Search Plant Name"
                        size="large"
                        onChange={(e) => searchCompanyName(e)}
                      />
                    </div>
                  </Col>
                ) : (
                  ""
                )}
              </Row>
            </Col>

            <Col>
              <div>
                {/* <Button type="primary" size="large" onClick={handleOpenPage}>
                  Add Company
                </Button> */}
                <AddButton
                  pageId={21}
                  rightId={2}
                  // _href={'/master/company/add'}
                  _function={handleOpenPage}
                  text="Add Company"
                  _size="large"
                />
              </div>
            </Col>
          </Row>
        </div>
        {/* <div className="grid_list_container">
          <Spin spinning={loading}>
            <Row gutter={[32, 32]}>
              {companyList.map((company) => (
                <Col span={12} key={company.id}>
                  <Card
                    className="grid_card"
                    title={
                      <div className="card_title">
                        <small className="qc_key">Company Name</small>
                        <div>{company.CompanyName}</div>
                      </div>
                    }
                    actions={[
                      <Button onClick={() => showModal(company?.CompanyCode)}>
                        View Contact
                      </Button>,
                      <Button onClick={() => handleEdit(company?.CompanyCode)}>
                        Edit Contact
                      </Button>,
                      // <EditButton
                      //   // key="edit"
                      //   pageId={10}
                      //   rightId={3}
                      //   _function={() =>
                      //     getCompanyEditData(company?.CompanyCode)
                      //   }
                      //   _size="small"
                      // />,
                    ]}
                  >
                    <div className="card_content">
                      <Row gutter={[10, 10]}>
                        <Col span={12}>
                          <div className="qc_key">Company Code</div>
                          <div className="qc_value">{company?.CompanyCode}</div>
                        </Col>
                        <Col span={12}>
                          <div className="qc_key">Company Type</div>
                          <div className="qc_value">
                            {" "}
                            {company?.CompanyType}
                          </div>
                        </Col>
                        <Col span={12}>
                          <div className="qc_key">License No.</div>
                          <div className="qc_value">{company?.LicenseNo}</div>
                        </Col>
                        <Col span={12}>
                          <div className="qc_key">IP Address</div>
                          <div className="qc_value"> {company?.IpAddress}</div>
                        </Col>
                      </Row>
                    </div>
                    <div className="qc_mt_5">
                      <Row gutter={[10, 10]}>
                        <Col span={10}>
                          <div className="qc_key">Address</div>
                          <div className="qc_value">{company?.Address}</div>
                        </Col>
                        <Col span={7}>
                          <div className="qc_key">City Name</div>
                          <div className="qc_value">{company?.City}</div>
                        </Col>
                        <Col span={7}>
                          <div className="qc_key">State Name</div>
                          <div className="qc_value">{company?.State}</div>
                        </Col>
                      </Row>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Spin>
          <div className="qc_mt_3">
            <Modal
              title="Contact Details"
              open={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              width={1000}
              footer={false}
            >
              <Table
                columns={columns}
                dataSource={tableData}
                rowKey={(record) => record.id}
                pagination={false}
                scroll={{ x: true }}
              />
            </Modal>
          </div>
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
          <div className="qc_mt_3">
            <Modal
              title="Contact Details"
              open={isModalVisible}
              onOk={handleOk}
              onCancel={handleCancel}
              width={1000}
              footer={false}
            >
              <Table
                columns={columns}
                dataSource={tableData}
                rowKey={(record) => record.id}
                pagination={false}
                scroll={{ x: true }}
              />
            </Modal>
          </div>
          <Table
            className="qc_mt_2"
            dataSource={plantTableData}
            columns={ColumnsPlant}
            size="small"
          />
        </div>
      </div>
    </MainLayout>
  );
}
