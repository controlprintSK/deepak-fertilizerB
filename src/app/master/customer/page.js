"use client";
import React from "react";
import {
  Breadcrumb,
  Button,
  Col,
  Image,
  Input,
  Row,
  Space,
  Table,
  Tag,
} from "antd";
import MainLayout from "@/app/components/MainLayout";
import { EditOutlined } from "@ant-design/icons";
import { redirect } from "next/navigation";
const { Search } = Input;

export default function Customer() {
  const handleOpenPage = () => {
    redirect("/master/customer/add");
  };

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

  const dataSource = [
    {
      key: "1",
      customerLogo: (
        <Image
          src="/images/deepak-fertilizer-icon.png"
          alt="Customer Logo"
          preview={false}
        />
      ),
      customerCode: "Customer-360-001",
      customerName: "Customer-MH",
      contactNo: "1234567890",
      gstin: "11002233445599",
      customerType: "Distributor",
      address:
        "A-202, Sector 56, Surajpur, Gautam Buddha Nagar, Uttar Pradesh, India",
      status: <Tag color="success">Active</Tag>,
      action: (
        <Space>
          <Button icon={<EditOutlined />} size="small" />
        </Space>
      ),
    },
    {
      key: "2",
      customerLogo: (
        <Image
          src="/images/deepak-fertilizer-icon.png"
          alt="Customer Logo"
          preview={false}
        />
      ),
      customerCode: "Customer-360-001",
      customerName: "Customer-MH",
      contactNo: "1234567890",
      gstin: "11002233445599",
      customerType: "Distributor",
      address:
        "A-202, Sector 56, Surajpur, Gautam Buddha Nagar, Uttar Pradesh, India",
      status: <Tag color="success">Active</Tag>,
      action: (
        <Space>
          <Button icon={<EditOutlined />} size="small" />
        </Space>
      ),
    },
    {
      key: "3",
      customerLogo: (
        <Image
          src="/images/deepak-fertilizer-icon.png"
          alt="Customer Logo"
          preview={false}
        />
      ),
      customerCode: "Customer-360-001",
      customerName: "Customer-MH",
      contactNo: "1234567890",
      gstin: "11002233445599",
      customerType: "Distributor",
      address:
        "A-202, Sector 56, Surajpur, Gautam Buddha Nagar, Uttar Pradesh, India",
      status: <Tag color="success">Active</Tag>,
      action: (
        <Space>
          <Button icon={<EditOutlined />} size="small" />
        </Space>
      ),
    },
    {
      key: "4",
      customerLogo: (
        <Image
          src="/images/deepak-fertilizer-icon.png"
          alt="Customer Logo"
          preview={false}
        />
      ),
      customerCode: "Customer-360-001",
      customerName: "Customer-MH",
      contactNo: "1234567890",
      gstin: "11002233445599",
      customerType: "Distributor",
      address:
        "A-202, Sector 56, Surajpur, Gautam Buddha Nagar, Uttar Pradesh, India",
      status: <Tag color="success">Active</Tag>,
      action: (
        <Space>
          <Button icon={<EditOutlined />} size="small" />
        </Space>
      ),
    },
    {
      key: "5",
      customerLogo: (
        <Image
          src="/images/deepak-fertilizer-icon.png"
          alt="Customer Logo"
          preview={false}
        />
      ),
      customerCode: "Customer-360-001",
      customerName: "Customer-MH",
      contactNo: "1234567890",
      gstin: "11002233445599",
      customerType: "Distributor",
      address:
        "A-202, Sector 56, Surajpur, Gautam Buddha Nagar, Uttar Pradesh, India",
      status: <Tag color="success">Active</Tag>,
      action: (
        <Space>
          <Button icon={<EditOutlined />} size="small" />
        </Space>
      ),
    },
  ];

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
                    <Search placeholder="Search Customer Code" size="large" />
                  </div>
                </Col>
                <Col>
                  <div className="filter__item__search">
                    <Search placeholder="Search Customer Name" size="large" />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col>
              <div>
                <Button type="primary" size="large" onClick={handleOpenPage}>
                  Add Customer
                </Button>
              </div>
            </Col>
          </Row>
        </div>
        <div className="grid_list_container">
          <Table
            className="qc_mt_2"
            dataSource={dataSource}
            columns={columns}
            size="small"
          />
        </div>
      </div>
    </MainLayout>
  );
}
