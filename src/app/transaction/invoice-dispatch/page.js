"use client";
import React, { useState } from "react";
import {
  Breadcrumb,
  Button,
  Checkbox,
  Col,
  DatePicker,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import MainLayout from "@/app/components/MainLayout";
import { redirect } from "next/navigation";
import {
  DeleteOutlined,
  DownOutlined,
  EditOutlined,
  EyeOutlined,
  UpOutlined,
} from "@ant-design/icons";
const { RangePicker } = DatePicker;

export default function InvoiceDispatch() {
  const [showMoreFilters, setShowMoreFilters] = useState(false);

  const toggleFilters = () => {
    setShowMoreFilters((prev) => !prev);
  };

  const handleOpenPage = () => {
    redirect("/transaction/invoice-dispatch-add");
  };

  const columns = [
    {
      title: "From Plant - To Plant",
      dataIndex: "plantToPlant",
      key: "plantToPlant",
    },
    {
      title: "Product Name (Code)",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Transction ID",
      dataIndex: "transctionId",
      key: "transctionId",
    },
    {
      title: "Vehicle No.",
      dataIndex: "vehicleNo",
      key: "vehicleNo",
    },
    {
      title: "Receipt No.",
      dataIndex: "receiptNo",
      key: "receiptNo",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Finalize",
      dataIndex: "finalize",
      key: "finalize",
    },
    {
      title: "Received",
      dataIndex: "received",
      key: "received",
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
      plantToPlant: "Taloja (Maharashtra) - Panipat (Haryana)",
      productName: "CROPTEK 9:24:24 (A0104)",
      transctionId: "B1001",
      vehicleNo: "MH02 YU 6524",
      receiptNo: "GH012235",
      productCode: "A014",
      date: "25 March 2025",
      finalize: <Checkbox></Checkbox>,
      received: <Checkbox></Checkbox>,
      action: (
        <Space>
          <Button icon={<EditOutlined />} size="small" />
          <Button icon={<DeleteOutlined />} size="small" danger />
          <Button icon={<EyeOutlined />} size="small" />
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
                title: "Invoice Dispatch",
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
                      placeholder="From Plant"
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
                      placeholder="To Plant"
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
                      placeholder="Finalize"
                      options={[
                        {
                          value: "All",
                          label: "All",
                        },
                        {
                          value: "Yes",
                          label: "Yes",
                        },
                        {
                          value: "No",
                          label: "No",
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
                      placeholder="Received"
                      options={[
                        {
                          value: "All",
                          label: "All",
                        },
                        {
                          value: "Yes",
                          label: "Yes",
                        },
                        {
                          value: "No",
                          label: "No",
                        },
                      ]}
                    />
                  </div>
                </Col>
              </Row>
              {showMoreFilters && (
                <div className="qc_mt_4">
                  <Row gutter={[10, 10]}>
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
                              value: "Product Name/Code 1",
                              label: "Product Name/Code 1",
                            },
                            {
                              value: "Product Name/Code 2",
                              label: "Product Name/Code 2",
                            },
                            {
                              value: "Product Name/Code 3",
                              label: "Product Name/Code 3",
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
                          placeholder="Invoice No."
                          options={[
                            {
                              value: "QCIN0001",
                              label: "QCIN0001",
                            },
                            {
                              value: "QCIN0002",
                              label: "QCIN0002",
                            },
                            {
                              value: "QCIN0003",
                              label: "QCIN0003",
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
                          placeholder="Transaction ID"
                          options={[
                            {
                              value: "TR0000aa11aaa258",
                              label: "TR0000aa11aaa258",
                            },
                            {
                              value: "TR0000aa11aaa259",
                              label: "TR0000aa11aaa259",
                            },
                            {
                              value: "TR0000aa11aaa260",
                              label: "TR0000aa11aaa260",
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
                          placeholder="Receipt No."
                          options={[
                            {
                              value: "RNO0000258",
                              label: "RNO0000258",
                            },
                            {
                              value: "RNO0000259",
                              label: "RNO0000259",
                            },
                            {
                              value: "RNO0000260",
                              label: "RNO0000260",
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
                          placeholder="Vehicle No."
                          options={[
                            {
                              value: "MH02 YU 6524",
                              label: "MH02 YU 6524",
                            },
                            {
                              value: "MH02 YU 9352",
                              label: "MH02 YU 9352",
                            },
                            {
                              value: "MH02 YU 7436",
                              label: "MH02 YU 7436",
                            },
                          ]}
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
              )}
            </Col>
            <Col>
              <Space>
                <Button
                  type="primary"
                  icon={showMoreFilters ? <UpOutlined /> : <DownOutlined />}
                  size="large"
                  onClick={toggleFilters}
                  className="toggle_btn"
                />
                <Button type="primary" size="large" onClick={handleOpenPage}>
                  Add Invoice Dispatch
                </Button>
              </Space>
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
