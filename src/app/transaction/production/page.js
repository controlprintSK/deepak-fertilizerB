"use client";
import React from "react";
import {
  Breadcrumb,
  Button,
  Col,
  DatePicker,
  Pagination,
  Row,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import MainLayout from "@/app/components/MainLayout";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { redirect } from "next/navigation";
const { RangePicker } = DatePicker;

export default function Production() {
  const handleOpenPage = () => {
    redirect("/transaction/production-add");
  };
  const columns = [
    {
      title: "Date & Time",
      dataIndex: "dateTime",
      key: "dateTime",
    },
    {
      title: "Plant Name",
      dataIndex: "plantName",
      key: "plantName",
    },
    {
      title: "Line No.",
      dataIndex: "lineNo",
      key: "lineNo",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Product Code",
      dataIndex: "productCode",
      key: "productCode",
    },
    {
      title: "Batch No.",
      dataIndex: "batchNo",
      key: "batchNo",
    },
    {
      title: "MFG. Date",
      dataIndex: "mfgDate",
      key: "mfgDate",
    },
    {
      title: "Exp. Date",
      dataIndex: "expDate",
      key: "expDate",
    },
    {
      title: "Batch Size",
      dataIndex: "batchSize",
      key: "batchSize",
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
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
      dateTime: (
        <>
          <div>10 March 2025</div>
          <div>12:30 PM</div>
        </>
      ),
      plantName: "Taloja (Maharashtra) ",
      lineNo: "01",
      productName: "CROPTEK 9:24:24",
      productCode: "A014",
      batchNo: "B1002",
      mfgDate: "25 March 2025",
      expDate: "25 March 2026",
      batchSize: "2000",
      remarks: "Lorem Ipsum is simply dummy text.........",
      action: (
        <Space>
          <Button icon={<EditOutlined />} size="small" />
          <Button icon={<DeleteOutlined />} size="small" danger />
        </Space>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="page_title_container">
        {/* <div className="component__name">Transaction</div> */}
        <div>
          <Breadcrumb
            items={[
              {
                title: "Transaction",
              },
              {
                title: "Production",
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
                  <div className="filter__item">
                    <Select
                      style={{
                        width: "100%",
                      }}
                      size="large"
                      placeholder="Plant Name"
                      options={[
                        {
                          value: "Plant Name 1",
                          label: "Plant Name 1",
                        },
                        {
                          value: "Plant Name 2",
                          label: "Plant Name 2",
                        },
                        {
                          value: "Plant Name 3",
                          label: "Plant Name 3",
                        },
                      ]}
                    />
                  </div>
                </Col>
                <Col>
                  <div className="filter__item">
                    <Select
                      style={{
                        width: "100%",
                      }}
                      size="large"
                      placeholder="Line No."
                      options={[
                        {
                          value: "Line No. 1",
                          label: "Line No. 1",
                        },
                        {
                          value: "Line No. 2",
                          label: "Line No. 2",
                        },
                        {
                          value: "Line No. 3",
                          label: "Line No. 3",
                        },
                      ]}
                    />
                  </div>
                </Col>
                <Col>
                  <div className="filter__item">
                    <Select
                      style={{
                        width: "100%",
                      }}
                      size="large"
                      placeholder="Product Name/Code"
                      options={[
                        {
                          value: "Product/Code 1",
                          label: "Product/Code 1",
                        },
                        {
                          value: "Product/Code 2",
                          label: "Product/Code 2",
                        },
                        {
                          value: "Product/Code 3",
                          label: "Product/Code 3",
                        },
                      ]}
                    />
                  </div>
                </Col>
                <Col>
                  <div className="filter__item">
                    <Select
                      allowClear
                      size="large"
                      placeholder="Batch No."
                      style={{
                        width: "100%",
                      }}
                      options={[
                        {
                          value: "Batch No. 1",
                          label: "Batch No. 1",
                        },
                        {
                          value: "Batch No. 2",
                          label: "Batch No. 2",
                        },
                        {
                          value: "Batch No. 3",
                          label: "Batch No. 3",
                        },
                      ]}
                    />
                  </div>
                </Col>
              </Row>
            </Col>
            <Col>
              <Button type="primary" size="large" onClick={handleOpenPage}>
                Add Production
              </Button>
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
