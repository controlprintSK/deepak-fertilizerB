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
        <div className="production_container">
          {/* ===== production row =====  */}
          <div className="production_item">
            <div className="color_grid">
              <Row gutter={[10, 20]}>
                <Col span={5}>
                  <div className="qc_value">Product Name</div>
                  <div className="qc_key">Phamra-unwanted72</div>
                </Col>
                <Col span={5}>
                  <div className="qc_value">Product Code</div>
                  <div className="qc_key">PRO0024</div>
                </Col>
                <Col span={5}>
                  <div className="qc_value">Batch Code</div>
                  <div className="qc_key">C7AJW2020</div>
                </Col>
                <Col span={5}>
                  <div className="qc_value">Batch Size</div>
                  <div className="qc_key">10,000</div>
                </Col>
                <Col span={4}>
                  <div className="qc_value">Line No.</div>
                  <div className="qc_key">Man_001</div>
                </Col>
                <Col span={5}>
                  <div className="qc_value">Manufacturing Date</div>
                  <div className="qc_key">14-MAR-2024</div>
                </Col>
                <Col span={5}>
                  <div className="qc_value">Expiry Date</div>
                  <div className="qc_key">14-MAR-2025</div>
                </Col>
                <Col span={5}>
                  <div className="qc_value">Production Date & Time</div>
                  <div className="qc_key">14-MAR-2025, 12:30 PM</div>
                </Col>
                <Col span={5}>
                  <div className="qc_value">Remark</div>
                  <div className="qc_key">Product details are correct</div>
                </Col>
              </Row>
            </div>
            <div className="qc_mt_5">
              <Row gutter={[10, 20]} justify={"space-between"}>
                <Col>
                  <Row gutter={[20, 20]} align={"middle"}>
                    <Col>
                      <Space>
                        <Tag icon={<CheckCircleOutlined />} color="blue">
                          Approved
                        </Tag>
                      </Space>
                    </Col>
                    <Col>
                      <Space>
                        <Button icon={<EditOutlined />} size="small" />
                        <Button danger icon={<DeleteOutlined />} size="small" />
                      </Space>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Row gutter={[20, 20]} align={"middle"}>
                    <Col>
                      {/* <Button color="primary" variant="outlined">
                        Offline Activation
                      </Button> */}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
          {/* ===== production row =====  */}
          <div className="production_item">
            <div className="color_grid">
              <Row gutter={[10, 20]}>
                <Col span={5}>
                  <div className="qc_value">Product Name</div>
                  <div className="qc_key">Phamra-unwanted72</div>
                </Col>
                <Col span={5}>
                  <div className="qc_value">Product Code</div>
                  <div className="qc_key">PRO0024</div>
                </Col>
                <Col span={5}>
                  <div className="qc_value">Batch Code</div>
                  <div className="qc_key">C7AJW2020</div>
                </Col>
                <Col span={5}>
                  <div className="qc_value">Batch Size</div>
                  <div className="qc_key">10,000</div>
                </Col>
                <Col span={4}>
                  <div className="qc_value">Line No.</div>
                  <div className="qc_key">Man_001</div>
                </Col>
                <Col span={5}>
                  <div className="qc_value">Manufacturing Date</div>
                  <div className="qc_key">14-MAR-2024</div>
                </Col>
                <Col span={5}>
                  <div className="qc_value">Expiry Date</div>
                  <div className="qc_key">14-MAR-2025</div>
                </Col>
                <Col span={5}>
                  <div className="qc_value">Production Date & Time</div>
                  <div className="qc_key">14-MAR-2025, 12:30 PM</div>
                </Col>
                <Col span={5}>
                  <div className="qc_value">Remark</div>
                  <div className="qc_key">Product details are correct</div>
                </Col>
              </Row>
            </div>
            <div className="qc_mt_5">
              <Row gutter={[10, 20]} justify={"space-between"}>
                <Col>
                  <Row gutter={[20, 20]} align={"middle"}>
                    <Col>
                      <Space>
                        <Tag icon={<CheckCircleOutlined />} color="blue">
                          Approved
                        </Tag>
                      </Space>
                    </Col>
                    <Col>
                      <Space>
                        <Button icon={<EditOutlined />} size="small" />
                        <Button danger icon={<DeleteOutlined />} size="small" />
                      </Space>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Row gutter={[20, 20]} align={"middle"}>
                    <Col>
                      {/* <Button color="primary" variant="outlined">
                        Offline Activation
                      </Button> */}
                    </Col>
                  </Row>
                </Col>
              </Row>
            </div>
          </div>
        </div>
        <Pagination defaultCurrent={1} total={50} />
      </div>
    </MainLayout>
  );
}
