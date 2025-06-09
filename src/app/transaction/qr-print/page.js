"use client";
import React from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Table,
} from "antd";
import MainLayout from "@/app/components/MainLayout";
const { RangePicker } = DatePicker;

export default function QRPrint() {
  const [form] = Form.useForm();

  const handleQRQuantitySubmit = async (values) => {
    console.log("values--->>--", values);
  };

  const columns = [
    {
      title: "Request No.",
      dataIndex: "requestNo",
      key: "requestNo",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Series",
      dataIndex: "series",
      key: "series",
    },
    {
      title: "Print Date & Time",
      dataIndex: "printDateTime",
      key: "printDateTime",
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
      requestNo: "B001",
      quantity: "5000",
      series: "01-5000",
      printDateTime: "5-JUL-2024 - 01:59:56 ",
      action: (
        <Button color="primary" variant="outlined" size="small">
          Re-Print
        </Button>
      ),
    },
    {
      key: "2",
      requestNo: "B002",
      quantity: "5000",
      series: "01-5000",
      printDateTime: "5-JUL-2024 - 01:59:56 ",
      action: (
        <Button color="primary" variant="outlined" size="small">
          Re-Print
        </Button>
      ),
    },
    {
      key: "3",
      requestNo: "B003",
      quantity: "5000",
      series: "01-5000",
      printDateTime: "5-JUL-2024 - 01:59:56 ",
      action: (
        <Button color="primary" variant="outlined" size="small">
          Re-Print
        </Button>
      ),
    },
    {
      key: "4",
      requestNo: "B004",
      quantity: "5000",
      series: "01-5000",
      printDateTime: "5-JUL-2024 - 01:59:56 ",
      action: (
        <Button color="primary" variant="outlined" size="small">
          Re-Print
        </Button>
      ),
    },
    {
      key: "5",
      requestNo: "B005",
      quantity: "5000",
      series: "01-5000",
      printDateTime: "5-JUL-2024 - 01:59:56 ",
      action: (
        <Button color="primary" variant="outlined" size="small">
          Re-Print
        </Button>
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
                title: "QR Print",
              },
            ]}
          />
        </div>
      </div>
      <div className="qc_page_container">
        <div className="qc_color_box qc_mb_5">
          <Row justify={"space-between"} align={"middle"}>
            <Col span={12}>
              <Form
                name="basic"
                form={form}
                layout="vertical"
                autoComplete="off"
                onFinish={handleQRQuantitySubmit}>
                <Row gutter={[32]}>
                  <Col span={12}>
                    <Form.Item
                      label="Print Quantity"
                      name="PrintQuantity"
                      rules={[
                        {
                          required: true,
                          message: "Print Quantity is required",
                        },
                      ]}>
                      <Input type="text" size="large" />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <div className="qc_mt_5">
                      <Form.Item>
                        <Button type="primary" htmlType="submit" size="large">
                          Print
                        </Button>
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Col>
            <Col>
              <Card>
                <div>Total Available QR</div>
                <div className="item-value ">50,000</div>
              </Card>
            </Col>
          </Row>
        </div>
        <div className="qc_page_filter">
          <Row justify={"space-between"}>
            <Col>
              <Row gutter={[10, 10]}>
                <Col>
                  <div className="filter__item__search">
                    <RangePicker size="large" />
                  </div>
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
