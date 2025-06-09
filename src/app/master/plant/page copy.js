"use client";
import React from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Input,
  Row,
  Space,
  Table,
  Tag,
} from "antd";
import MainLayout from "@/app/components/MainLayout";
import { EditOutlined } from "@ant-design/icons";
import { redirect, useRouter } from "next/navigation";
const { Search } = Input;

export default function Plant() {
  const router = useRouter();

  const handleOpenPage = () => {
    router.push("/master/plant/add");
  };
  const handleViewContact = () => {
    redirect("/master/plant/view-contacts");
  };

  const columns = [
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

  const dataSource = [
    {
      key: "1",
      plantCode: "P0001",
      plantName: "Taloja (Maharashtra)",
      plantType: "MAL",
      licenseNo: "WHC-002-236541",
      address:
        "349M+VM3, 54, MIDC Rd, Tondare, Taloja, Navi Mumbai, Maharashtra 410208",
      state: "Maharashtra",
      city: "Navi Mumbai",
      status: <Tag color="success">Active</Tag>,
      contact: (
        <Button
          color="primary"
          variant="outlined"
          key="view-contact"
          aria-label="View Contact"
          onClick={handleViewContact}
        >
          View Contact
        </Button>
      ),
      action: (
        <Space>
          <Button icon={<EditOutlined />} size="small" />
        </Space>
      ),
    },
    {
      key: "2",
      plantCode: "P0002",
      plantName: "Taloja (Maharashtra)",
      plantType: "MAL",
      licenseNo: "WHC-002-236541",
      address:
        "349M+VM3, 54, MIDC Rd, Tondare, Taloja, Navi Mumbai, Maharashtra 410208",
      state: "Maharashtra",
      city: "Navi Mumbai",
      status: <Tag color="success">Active</Tag>,
      contact: (
        <Button
          color="primary"
          variant="outlined"
          key="view-contact"
          aria-label="View Contact"
          onClick={handleViewContact}
        >
          View Contact
        </Button>
      ),
      action: (
        <Space>
          <Button icon={<EditOutlined />} size="small" />
        </Space>
      ),
    },
    {
      key: "3",
      plantCode: "P0003",
      plantName: "Taloja (Maharashtra)",
      plantType: "MAL",
      licenseNo: "WHC-002-236541",
      address:
        "349M+VM3, 54, MIDC Rd, Tondare, Taloja, Navi Mumbai, Maharashtra 410208",
      state: "Maharashtra",
      city: "Navi Mumbai",
      status: <Tag color="success">Active</Tag>,
      contact: (
        <Button
          color="primary"
          variant="outlined"
          key="view-contact"
          aria-label="View Contact"
          onClick={handleViewContact}
        >
          View Contact
        </Button>
      ),
      action: (
        <Space>
          <Button icon={<EditOutlined />} size="small" />
        </Space>
      ),
    },
    {
      key: "4",
      plantCode: "P0004",
      plantName: "Taloja (Maharashtra)",
      plantType: "MAL",
      licenseNo: "WHC-002-236541",
      address:
        "349M+VM3, 54, MIDC Rd, Tondare, Taloja, Navi Mumbai, Maharashtra 410208",
      state: "Maharashtra",
      city: "Navi Mumbai",
      status: <Tag color="success">Active</Tag>,
      contact: (
        <Button
          color="primary"
          variant="outlined"
          key="view-contact"
          aria-label="View Contact"
          onClick={handleViewContact}
        >
          View Contact
        </Button>
      ),
      action: (
        <Space>
          <Button icon={<EditOutlined />} size="small" />
        </Space>
      ),
    },
    {
      key: "5",
      plantCode: "P0005",
      plantName: "Taloja (Maharashtra)",
      plantType: "MAL",
      licenseNo: "WHC-002-236541",
      address:
        "349M+VM3, 54, MIDC Rd, Tondare, Taloja, Navi Mumbai, Maharashtra 410208",
      state: "Maharashtra",
      city: "Navi Mumbai",
      status: <Tag color="success">Active</Tag>,
      contact: (
        <Button
          color="primary"
          variant="outlined"
          key="view-contact"
          aria-label="View Contact"
          onClick={handleViewContact}
        >
          View Contact
        </Button>
      ),
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
                <Col>
                  <div className="filter__item__search">
                    <Search placeholder="Search Plant Code" size="large" />
                  </div>
                </Col>
                <Col>
                  <div className="filter__item__search">
                    <Search placeholder="Search Plant Name" size="large" />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col>
              <div>
                <Button type="primary" size="large" onClick={handleOpenPage}>
                  Add Plant
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
