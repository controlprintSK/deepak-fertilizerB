"use client";
import React from "react";
import { Breadcrumb, Button, Col, DatePicker, Input, Row, Table } from "antd";
import MainLayout from "@/app/components/MainLayout";
import { DownloadOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;
const { Search } = Input;

export default function AlarmReports() {
  const columns = [
    {
      title: "Role-User Name",
      dataIndex: "role_user_name",
      key: "role_user_name",
    },
    {
      title: "Alarm",
      dataIndex: "alarm",
      key: "alarm",
    },
    {
      title: "Date & Time",
      dataIndex: "dateTime",
      key: "dateTime",
    },
  ];

  const dataSource = [
    {
      key: "1",
      role_user_name: "Admin-Krunal Kumar",
      alarm: "Alarm reset manually",
      dateTime: "5-JUL-2024 - 01:59:56 ",
    },
    {
      key: "2",
      role_user_name: "Admin-Krunal Kumar",
      alarm: "Alarm reset manually",
      dateTime: "5-JUL-2024 - 01:59:56 ",
    },
    {
      key: "3",
      role_user_name: "Admin-Krunal Kumar",
      alarm: "Alarm reset manually",
      dateTime: "5-JUL-2024 - 01:59:56 ",
    },
    {
      key: "4",
      role_user_name: "Admin-Krunal Kumar",
      alarm: "Alarm reset manually",
      dateTime: "5-JUL-2024 - 01:59:56 ",
    },
    {
      key: "5",
      role_user_name: "Admin-Krunal Kumar",
      alarm: "Alarm reset manually",
      dateTime: "5-JUL-2024 - 01:59:56 ",
    },
  ];

  return (
    <MainLayout>
      <div className="page_title_container">
        {/* <div className="component__name">Reports</div> */}
        <div>
          <Breadcrumb
            items={[
              {
                title: "Reports",
              },
              {
                title: "Logs",
              },
              {
                title: "Alarm Reports",
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
                    <RangePicker size="large" />
                  </div>
                </Col>
                <Col>
                  <div className="filter__item__search">
                    <Search
                      placeholder="Search ( eg. user or module name)"
                      size="large"
                    />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col>
              <div>
                <Button icon={<DownloadOutlined />} type="primary" size="large">
                  Download
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
