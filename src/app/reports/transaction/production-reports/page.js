"use client";
import React from "react";
import { Breadcrumb, Button, Col, DatePicker, Row, Select, Space } from "antd";
import MainLayout from "@/app/components/MainLayout";
import { DownloadOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;

export default function ProductionReports() {
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
                title: "Transaction",
              },
              {
                title: "Production Reports",
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
                    <Select
                      style={{ width: "100%" }}
                      size="large"
                      placeholder="Select Product "
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
                <Col>
                  <div className="filter__item__search">
                    <Select
                      style={{ width: "100%" }}
                      size="large"
                      placeholder="Select Batch "
                      options={[
                        {
                          value: "Batch 1",
                          label: "Batch 1",
                        },
                        {
                          value: "Batch 2",
                          label: "Batch 2",
                        },
                        {
                          value: "Batch 3",
                          label: "Batch 3",
                        },
                      ]}
                    />
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <div className="production_report_container">
          <div className="production_report_item">
            <div className="qc_p_2">
              <Row gutter={[24, 16]} align="middle" justify="space-between">
                <Col span={24}>
                  <Row gutter={[10, 20]}>
                    <Col span={4}>
                      <div className="qc_value">Product Name</div>
                      <div className="qc_key">Phamra-unwanted72</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Material Code</div>
                      <div className="qc_key">70006589</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Batch Code</div>
                      <div className="qc_key">C7AJW2020</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Batch Size</div>
                      <div className="qc_key">10,000</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Line No.</div>
                      <div className="qc_key">Man_001</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Product Code</div>
                      <div className="qc_key">PRO0024</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Manufacturing Date</div>
                      <div className="qc_key">14-MAR-24</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Expiry Date</div>
                      <div className="qc_key">14-MAR-25</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Production Date & Time</div>
                      <div className="qc_key">14-MAR-24, 12:30 PM</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Accepted</div>
                      <div className="qc_key">500</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Rejected Qty.</div>
                      <div className="qc_key">00</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Sample</div>
                      <div className="qc_key">00</div>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <div className="color_grid_without_radius button__container qc_mt_3">
                <Row justify={"space-between"}>
                  <Col>
                    <Space size="large">
                      <Button
                        color="primary"
                        variant="outlined"
                        icon={<DownloadOutlined />}>
                        Accepted QR
                      </Button>
                      <Button
                        color="primary"
                        variant="outlined"
                        icon={<DownloadOutlined />}>
                        Unused QR
                      </Button>
                      <Button
                        color="primary"
                        variant="outlined"
                        icon={<DownloadOutlined />}>
                        Rejected QR
                      </Button>
                      <Button
                        color="primary"
                        variant="outlined"
                        icon={<DownloadOutlined />}>
                        Batch Report
                      </Button>
                    </Space>
                  </Col>
                  {/* <Col>
                    <Space size="large">
                      <Button type="primary">Submit Report</Button>
                    </Space>
                  </Col> */}
                </Row>
              </div>
            </div>
          </div>
          <div className="production_report_item">
            <div className="qc_p_2">
              <Row gutter={[24, 16]} align="middle" justify="space-between">
                <Col span={24}>
                  <Row gutter={[10, 20]}>
                    <Col span={4}>
                      <div className="qc_value">Product Name</div>
                      <div className="qc_key">Phamra-unwanted72</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Material Code</div>
                      <div className="qc_key">70006589</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Batch Code</div>
                      <div className="qc_key">C7AJW2020</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Batch Size</div>
                      <div className="qc_key">10,000</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Line No.</div>
                      <div className="qc_key">Man_001</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Product Code</div>
                      <div className="qc_key">PRO0024</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Manufacturing Date</div>
                      <div className="qc_key">14-MAR-24</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Expiry Date</div>
                      <div className="qc_key">14-MAR-25</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Production Date & Time</div>
                      <div className="qc_key">14-MAR-24, 12:30 PM</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Accepted</div>
                      <div className="qc_key">500</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Rejected Qty.</div>
                      <div className="qc_key">00</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Sample</div>
                      <div className="qc_key">00</div>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <div className="color_grid_without_radius button__container qc_mt_3">
                <Row justify={"space-between"}>
                  <Col>
                    <Space size="large">
                      <Button
                        color="primary"
                        variant="outlined"
                        icon={<DownloadOutlined />}>
                        Accepted QR
                      </Button>
                      <Button
                        color="primary"
                        variant="outlined"
                        icon={<DownloadOutlined />}>
                        Unused QR
                      </Button>
                      <Button
                        color="primary"
                        variant="outlined"
                        icon={<DownloadOutlined />}>
                        Rejected QR
                      </Button>
                      <Button
                        color="primary"
                        variant="outlined"
                        icon={<DownloadOutlined />}>
                        Batch Report
                      </Button>
                    </Space>
                  </Col>
                  {/* <Col>
                    <Space size="large">
                      <Button type="primary">Submit Report</Button>
                    </Space>
                  </Col> */}
                </Row>
              </div>
            </div>
          </div>
          <div className="production_report_item">
            <div className="qc_p_2">
              <Row gutter={[24, 16]} align="middle" justify="space-between">
                <Col span={24}>
                  <Row gutter={[10, 20]}>
                    <Col span={4}>
                      <div className="qc_value">Product Name</div>
                      <div className="qc_key">Phamra-unwanted72</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Material Code</div>
                      <div className="qc_key">70006589</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Batch Code</div>
                      <div className="qc_key">C7AJW2020</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Batch Size</div>
                      <div className="qc_key">10,000</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Line No.</div>
                      <div className="qc_key">Man_001</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Product Code</div>
                      <div className="qc_key">PRO0024</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Manufacturing Date</div>
                      <div className="qc_key">14-MAR-24</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Expiry Date</div>
                      <div className="qc_key">14-MAR-25</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Production Date & Time</div>
                      <div className="qc_key">14-MAR-24, 12:30 PM</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Accepted</div>
                      <div className="qc_key">500</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Rejected Qty.</div>
                      <div className="qc_key">00</div>
                    </Col>
                    <Col span={4}>
                      <div className="qc_value">Sample</div>
                      <div className="qc_key">00</div>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <div className="color_grid_without_radius button__container qc_mt_3">
                <Row justify={"space-between"}>
                  <Col>
                    <Space size="large">
                      <Button
                        color="primary"
                        variant="outlined"
                        icon={<DownloadOutlined />}>
                        Accepted QR
                      </Button>
                      <Button
                        color="primary"
                        variant="outlined"
                        icon={<DownloadOutlined />}>
                        Unused QR
                      </Button>
                      <Button
                        color="primary"
                        variant="outlined"
                        icon={<DownloadOutlined />}>
                        Rejected QR
                      </Button>
                      <Button
                        color="primary"
                        variant="outlined"
                        icon={<DownloadOutlined />}>
                        Batch Report
                      </Button>
                    </Space>
                  </Col>
                  {/* <Col>
                    <Space size="large">
                      <Button type="primary">Submit Report</Button>
                    </Space>
                  </Col> */}
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
