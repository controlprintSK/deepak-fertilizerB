"use client";
import React from "react";
import {
  Breadcrumb,
  Button,
  Checkbox,
  Col,
  DatePicker,
  Input,
  Row,
  Select,
  Table,
} from "antd";
import MainLayout from "@/app/components/MainLayout";
import { DownloadOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;

export default function StockInTransit() {
  const columns = [
    {
      title: "Customer/Plant",
      dataIndex: "customerPlant",
      key: "customerPlant",
    },
    {
      title: "Product Code",
      dataIndex: "productCode",
      key: "productCode",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "STR. No.",
      dataIndex: "strNo",
      key: "strNo",
    },
    {
      title: "Receipt",
      dataIndex: "receipt",
      key: "receipt",
    },
    {
      title: "Issue",
      dataIndex: "issue",
      key: "issue",
    },
  ];

  const dataSource = [
    {
      key: "1",
      customerPlant: "Customer-1",
      productCode: "A0104",
      productName: "CROPTEK 9:24:24",
      date: "12 March 2025",
      strNo: "023546",
      receipt: "3000",
      issue: "5000",
    },
    {
      key: "2",
      customerPlant: "Customer-1",
      productCode: "A0104",
      productName: "CROPTEK 9:24:24",
      date: "12 March 2025",
      strNo: "023546",
      receipt: "3000",
      issue: "5000",
    },
    {
      key: "3",
      customerPlant: "Customer-1",
      productCode: "A0104",
      productName: "CROPTEK 9:24:24",
      date: "12 March 2025",
      strNo: "023546",
      receipt: "3000",
      issue: "5000",
    },
    {
      key: "4",
      customerPlant: "Customer-1",
      productCode: "A0104",
      productName: "CROPTEK 9:24:24",
      date: "12 March 2025",
      strNo: "023546",
      receipt: "3000",
      issue: "5000",
    },
    {
      key: "5",
      customerPlant: "Customer-1",
      productCode: "A0104",
      productName: "CROPTEK 9:24:24",
      date: "12 March 2025",
      strNo: "023546",
      receipt: "3000",
      issue: "5000",
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
                title: "Stock",
              },
              {
                title: "Stock In Transit",
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
                  <div>
                    <Select
                      size="large"
                      placeholder="From Customer/Plant"
                      options={[
                        {
                          value: "Plant 1",
                          label: "Plant 1",
                        },
                        {
                          value: "Plant 2",
                          label: "Plant 2",
                        },
                        {
                          value: "Plant 3",
                          label: "Plant 3",
                        },
                      ]}
                    />
                  </div>
                </Col>
                <Col>
                  <div>
                    <Select
                      size="large"
                      placeholder="To Customer/Plant"
                      options={[
                        {
                          value: "Plant 1",
                          label: "Plant 1",
                        },
                        {
                          value: "Plant 2",
                          label: "Plant 2",
                        },
                        {
                          value: "Plant 3",
                          label: "Plant 3",
                        },
                      ]}
                    />
                  </div>
                </Col>
                <Col>
                  <div>
                    <Select
                      size="large"
                      placeholder="Select Product Name"
                      options={[
                        {
                          value: "Product 1",
                          label: "Product 1",
                        },
                        {
                          value: "Product 2",
                          label: "Product 2",
                        },
                        {
                          value: "Product 3",
                          label: "Product 3",
                        },
                      ]}
                    />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row gutter={[10, 10]}>
                <Col>
                  <div className="filter__item control_box font_size_xl color_primary qc_fw_5">
                    5,00,000
                  </div>
                </Col>
                <Col>
                  <Button type="primary" size="large">
                    Fetch Data
                  </Button>
                </Col>
                <Col>
                  <Button
                    icon={<DownloadOutlined />}
                    type="primary"
                    size="large">
                    Download
                  </Button>
                </Col>
              </Row>
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
