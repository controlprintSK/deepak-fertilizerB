"use client";
import React from "react";
import { Breadcrumb, Button, Col, Input, Row, Space, Table, Tag } from "antd";
import MainLayout from "@/app/components/MainLayout";
import { EditOutlined } from "@ant-design/icons";
import { redirect } from "next/navigation";
const { Search } = Input;

export default function ViewContacts() {
  const handleBackToList = () => {
    redirect("/master/plant");
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Contact No",
      dataIndex: "contactNo",
      key: "contactNo",
    },
    {
      title: "Email ID",
      dataIndex: "emailId",
      key: "emailId",
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

  const dataSource = [
    {
      key: "1",
      name: "Shiv Kumar Chaudhary",
      contactNo: "1234567890",
      emailId: "shivkumarchaudhary@plantname.com",
      designation: <Tag>IT Head</Tag>,
      purpose: "For Software related",
    },
    {
      key: "2",
      name: "Shiv Kumar Chaudhary",
      contactNo: "1234567890",
      emailId: "shivkumarchaudhary@plantname.com",
      designation: <Tag>IT Head</Tag>,
      purpose: "For Software related",
    },
    {
      key: "3",
      name: "Shiv Kumar Chaudhary",
      contactNo: "1234567890",
      emailId: "shivkumarchaudhary@plantname.com",
      designation: <Tag>IT Head</Tag>,
      purpose: "For Software related",
    },
    {
      key: "4",
      name: "Shiv Kumar Chaudhary",
      contactNo: "1234567890",
      emailId: "shivkumarchaudhary@plantname.com",
      designation: <Tag>IT Head</Tag>,
      purpose: "For Software related",
    },
    {
      key: "5",
      name: "Shiv Kumar Chaudhary",
      contactNo: "1234567890",
      emailId: "shivkumarchaudhary@plantname.com",
      designation: <Tag>IT Head</Tag>,
      purpose: "For Software related",
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
                title: (
                  <div className="cursor_pointer" onClick={handleBackToList}>
                    Plant
                  </div>
                ),
              },
              {
                title: "View Contacts",
              },
            ]}
          />
        </div>
      </div>
      <div className="qc_page_container">
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
