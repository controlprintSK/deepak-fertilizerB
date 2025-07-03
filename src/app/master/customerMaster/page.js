"use client";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Col,
  Image,
  Input,
  Row,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import MainLayout from "@/app/components/MainLayout";
import { EditOutlined } from "@ant-design/icons";
import { redirect, useRouter } from "next/navigation";
import { getAPI, postAPI } from "@/utils/apiRequest";
import { ALL_CUSTOMER_LIST, LIST_CUSTOMER } from "@/app/api";
import { displayMessage } from "@/utils/common";
import { ERROR_MSG_TYPE } from "@/constants/hardData";
import { AddButton } from "@/app/components/common/Button";
import { useSelector } from "react-redux";
const { Search } = Input;

export default function Customer() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const { user } = useSelector((state) => state.userInfo);
  const [customerTableData, setCustomerTableData] = useState([]);
  const [customerOptionList, setCustomerOptionList] = useState([]);
  const [customerNameOptionList, setCustomerNameOptionList] = useState([]);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 1,
    },
  });

  const [filters, setFilters] = useState({
    // CompanyCode: user?.CurrentCompany ? user?.CurrentCompany : "",
    // sortBy: "createdAt",
    CustomerCode: "",
    CustomerName: "",
    page: tableParams?.pagination?.current,
    limit: tableParams?.pagination?.pageSize,
  });

  const handleOpenPage = () => {
    router.push("/master/customerMaster/add");
  };

  const handleEdit = (CustomerCode) => {
    // localStorage.setItem('companyData', CompanyCode);
    router.push(`customerMaster/edit/${CustomerCode}`);
    // redirect(`/master/company-add`);
  };

  const fetchAllCustomerList = async () => {
    const res = await getAPI(ALL_CUSTOMER_LIST);

    if (String(res?.status).includes("20") && res?.data?.results?.length) {
      let codeOptions = res.data.results.map((val) => ({
        key: val.CustomerCode,
        value: val.CustomerCode,
        label: val.CustomerCode,
      }));

      let nameOptions = res.data.results.map((val) => ({
        key: val.CustomerName,
        value: val.CustomerName,
        label: val.CustomerName,
      }));

      setCustomerOptionList(codeOptions);
      setCustomerNameOptionList(nameOptions);
    }
  };

  useEffect(() => {
    fetchAllCustomerList();
  }, []);

  const handleCustomerCodeChange = (value) => {
    setFilters((pre) => ({ ...pre, page: 1, CustomerCode: value || "" }));
  };

  const handleCustomerNameChange = (value) => {
    setFilters((pre) => ({ ...pre, page: 1, CustomerName: value || "" }));
  };

  useEffect(() => {
    fetchCustomerList();
  }, [JSON.stringify(filters)]);

  const fetchCustomerList = async () => {
    setLoading(true);
    try {
      const res = await postAPI(LIST_CUSTOMER, filters);
      setLoading(false);
      if (res?.status == 200) {
        setTableParams((prevState) => ({
          ...prevState,
          pagination: {
            ...prevState.pagination,
            total: res?.data?.totalResults,
          },
        }));
        setCustomerList(res?.data?.results);
      } else {
        setCustomerList([]);
      }
    } catch (error) {
      setLoading(false);
      displayMessage(ERROR_MSG_TYPE, error?.message || "Error fetching data.");
    }
  };

  useEffect(() => {
    setLoading(true);
    let data = [];

    customerList?.forEach((val, i) => {
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
        customerCode: val?.CustomerCode,
        customerName: val?.CustomerName,
        customerType: val?.CustomerType,
        contactNo: val?.ContactNo,
        gstin: val?.Gstin,
        address: val?.Address,
        status: (
          <Tag color={val?.Active ? "green" : "red"}>
            {val?.Active ? "Active" : "Inactive"}
          </Tag>
        ),
        action: (
          <Space>
            <Button
              icon={<EditOutlined />}
              key={`edit_${i}`}
              size="small"
              onClick={() => handleEdit(val?.id)}
            />
          </Space>
        ),
      });
    });
    setLoading(false);
    setCustomerTableData(data);
  }, [customerList]);

  const columns = [
    {
      title: "Customer Logo",
      dataIndex: "customerLogo",
      key: "customerLogo",
    },
    {
      title: "Customer Code",
      dataIndex: "customerCode",
      key: "customerCode",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Contact No.",
      dataIndex: "contactNo",
      key: "contactNo",
    },
    {
      title: "GSTIN",
      dataIndex: "gstin",
      key: "gstin",
    },
    {
      title: "Customer Type",
      dataIndex: "customerType",
      key: "customerType",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
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

  const handleTableChange = (pagination) => {
    setTableParams({
      pagination,
    });

    setFilters((prev) => ({
      ...prev,
      page: pagination.current,
      limit: pagination.pageSize,
    }));
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
                title: "Customer",
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
                      placeholder="Customer Code"
                      filterOption={(input, option) =>
                        option.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      style={{
                        width: "100%",
                      }}
                      onChange={handleCustomerCodeChange}
                      options={customerOptionList}
                    />
                  </div>
                </Col>
                <Col>
                  <div className="filter__item__search">
                    <Select
                      allowClear
                      showSearch
                      size="large"
                      placeholder="Customer Name"
                      filterOption={(input, option) =>
                        option.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      style={{
                        width: "100%",
                      }}
                      onChange={handleCustomerNameChange}
                      options={customerNameOptionList}
                    />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col>
              <div>
                {/* <Button type="primary" size="large" onClick={handleOpenPage}>
                  Add Customer
                </Button> */}
                <AddButton
                  pageId={24}
                  rightId={2}
                  // _href={'/master/company/add'}
                  _function={handleOpenPage}
                  text="Add Customer"
                  _size="large"
                />
              </div>
            </Col>
          </Row>
        </div>
        <div className="grid_list_container">
          <Table
            className="qc_mt_2"
            dataSource={customerTableData}
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
