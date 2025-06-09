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
  Table,
} from "antd";
import MainLayout from "@/app/components/MainLayout";
import { DownloadOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;

export default function StockAgeing() {
  const columns = [
    {
      title: "Customer/Plant",
      dataIndex: "customerPlant",
      key: "customerPlant",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Batch No.",
      dataIndex: "batchNo",
      key: "batchNo",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Age (Days)",
      dataIndex: "ageDays",
      key: "ageDays",
    },
    {
      title: "MFG. Date",
      dataIndex: "mfgDate",
      key: "mfgDate",
    },
    {
      title: "Expiry Date",
      dataIndex: "expiryDate",
      key: "expiryDate",
    },
  ];

  const dataSource = [
    {
      key: "1",
      customerPlant: "Plant-1",
      productName: "CROPTEK 9:24:24",
      batchNo: "B1002",
      quantity: "20,000",
      ageDays: "47 Days",
      mfgDate: "12 March 2025",
      expiryDate: "12 March 2027",
    },
    {
      key: "2",
      customerPlant: "Plant-1",
      productName: "CROPTEK 9:24:24",
      batchNo: "B1002",
      quantity: "20,000",
      ageDays: "47 Days",
      mfgDate: "12 March 2025",
      expiryDate: "12 March 2027",
    },
    {
      key: "3",
      customerPlant: "Plant-1",
      productName: "CROPTEK 9:24:24",
      batchNo: "B1002",
      quantity: "20,000",
      ageDays: "47 Days",
      mfgDate: "12 March 2025",
      expiryDate: "12 March 2027",
    },
    {
      key: "4",
      customerPlant: "Plant-1",
      productName: "CROPTEK 9:24:24",
      batchNo: "B1002",
      quantity: "20,000",
      ageDays: "47 Days",
      mfgDate: "12 March 2025",
      expiryDate: "12 March 2027",
    },
    {
      key: "5",
      customerPlant: "Plant-1",
      productName: "CROPTEK 9:24:24",
      batchNo: "B1002",
      quantity: "20,000",
      ageDays: "47 Days",
      mfgDate: "12 March 2025",
      expiryDate: "12 March 2027",
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
                title: "Stock Ageing",
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
                  <div className="filter__item control_box">
                    <div className="qc_me_2">Plant wise</div>
                    <Checkbox></Checkbox>
                  </div>
                </Col>
                <Col>
                  <div className="filter__item control_box">
                    <div className="qc_me_2">Product wise</div>
                    <Checkbox></Checkbox>
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
