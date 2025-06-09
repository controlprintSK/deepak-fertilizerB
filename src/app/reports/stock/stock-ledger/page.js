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
  Space,
  Table,
} from "antd";
import MainLayout from "@/app/components/MainLayout";
import { DownloadOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;

export default function StockLedger() {
  const columns = [
    {
      title: "Customer/Plant",
      dataIndex: "customerPlant",
      key: "customerPlant",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Ref. No.",
      dataIndex: "refNo",
      key: "refNo",
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
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
    },
  ];

  const dataSource = [
    {
      key: "1",
      customerPlant: "Customer-1",
      date: "12 March 2025",
      type: "Stock Transfer",
      refNo: "023546",
      receipt: "3000",
      issue: "5000",
      balance: "47000",
    },
    {
      key: "2",
      customerPlant: "Customer-1",
      date: "12 March 2025",
      type: "Stock Transfer",
      refNo: "023546",
      receipt: "3000",
      issue: "5000",
      balance: "47000",
    },
    {
      key: "3",
      customerPlant: "Customer-1",
      date: "12 March 2025",
      type: "Stock Transfer",
      refNo: "023546",
      receipt: "3000",
      issue: "5000",
      balance: "47000",
    },
    {
      key: "4",
      customerPlant: "Customer-1",
      date: "12 March 2025",
      type: "Stock Transfer",
      refNo: "023546",
      receipt: "3000",
      issue: "5000",
      balance: "47000",
    },
    {
      key: "5",
      customerPlant: "Customer-1",
      date: "12 March 2025",
      type: "Stock Transfer",
      refNo: "023546",
      receipt: "3000",
      issue: "5000",
      balance: "47000",
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
                title: "Stock Ledger",
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
                </Col>
              </Row>
            </Col>
            <Col>
              <Row gutter={[10, 10]}>
                <Col>
                  <div className="filter__item control_box font_size_xl color_primary qc_fw_5">
                    50,000
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
        <div className="qc_mb_5">
          <h3 className="qc_mb_4">Mahadhan AgriTech Limited</h3>
          <Space size={45}>
            <div>
              <div className="qc_value">Product Code</div>
              <div className="qc_key">A0104</div>
            </div>
            <div>
              <div className="qc_value">Product Name(Description )</div>
              <div className="qc_key">CROPTEK 9:24:24</div>
            </div>
          </Space>
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
