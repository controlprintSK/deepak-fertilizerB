"use client";
import React, { useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import MainLayout from "@/app/components/MainLayout";
import { redirect, useParams, useRouter } from "next/navigation";
import { ArrowRightOutlined } from "@ant-design/icons";
const { TextArea } = Input;

export default function BranchTransferAdd() {
  const router = useRouter();
  const params = useParams();
  const [form] = Form.useForm();
  const [formProductDetails] = Form.useForm();
  const [modalProductDetailVisible, setModalProductDetailVisible] =
    useState(false);

  const [slug, setSlug] = useState([]);

  useEffect(() => {
    const unwrapParams = async () => {
      const resolvedParams = await params; // Unwrap the promise
      setSlug(resolvedParams.slug || []); // Ensure slug is always an array
    };

    unwrapParams();
  }, [params]);

  const handleBackToList = () => {
    redirect("/transaction/branch-transfer");
  };

  const handleBranchTransferSubmit = async (values) => {
    console.log("values--->>--", values);
  };

  const showModalProductDetail = () => {
    setModalProductDetailVisible(true);
  };

  const handleCancel = () => {
    setModalProductDetailVisible(false);
  };

  const handleSave = async () => {};

  const columns = [
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
      title: "QTY",
      dataIndex: "qty",
      key: "qty",
    },
    {
      title: "Tagged QTY",
      dataIndex: "taggedQty",
      key: "taggedQty",
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
      productCode: "A0104",
      productName: "CROPTEK 9:24:24",
      qty: "500",
      taggedQty: "500",
      action: (
        <Space>
          <Button
            color="primary"
            variant="outlined"
            icon={<ArrowRightOutlined />}
            onClick={showModalProductDetail}
            size="small"
          />
        </Space>
      ),
    },
    {
      key: "2",
      productCode: "A0105",
      productName: "CROPTEK 9:24:24",
      qty: "500",
      taggedQty: "500",
      action: (
        <Space>
          <Button
            color="primary"
            variant="outlined"
            icon={<ArrowRightOutlined />}
            onClick={showModalProductDetail}
            size="small"
          />
        </Space>
      ),
    },
    {
      key: "3",
      productCode: "A0105",
      productName: "CROPTEK 9:24:24",
      qty: "500",
      taggedQty: "500",
      action: (
        <Space>
          <Button
            color="primary"
            variant="outlined"
            icon={<ArrowRightOutlined />}
            onClick={showModalProductDetail}
            size="small"
          />
        </Space>
      ),
    },
    {
      key: "4",
      productCode: "A0105",
      productName: "CROPTEK 9:24:24",
      qty: "500",
      taggedQty: "500",
      action: (
        <Space>
          <Button
            color="primary"
            variant="outlined"
            icon={<ArrowRightOutlined />}
            onClick={showModalProductDetail}
            size="small"
          />
        </Space>
      ),
    },
    {
      key: "5",
      productCode: "A0105",
      productName: "CROPTEK 9:24:24",
      qty: "500",
      taggedQty: "500",
      action: (
        <Space>
          <Button
            color="primary"
            variant="outlined"
            icon={<ArrowRightOutlined />}
            onClick={showModalProductDetail}
            size="small"
          />
        </Space>
      ),
    },
    {
      key: "6",
      productCode: "A0105",
      productName: "CROPTEK 9:24:24",
      qty: "500",
      taggedQty: "500",
      action: (
        <Space>
          <Button
            color="primary"
            variant="outlined"
            icon={<ArrowRightOutlined />}
            onClick={showModalProductDetail}
            size="small"
          />
        </Space>
      ),
    },
  ];

  const columnsUID = [
    {
      title: "UIDs",
      dataIndex: "uids",
      key: "uids",
    },
    {
      title: "Batch No.",
      dataIndex: "batchNo",
      key: "batchNo",
    },
    {
      title: "MFG Date",
      dataIndex: "mfgDate",
      key: "mfgDate",
    },
    {
      title: "Expiry Date",
      dataIndex: "expiryDate",
      key: "expiryDate",
    },
  ];

  const dataSourceUID = [
    {
      key: "1",
      uids: "DJFNFF-12KJDNN-1236HJGDSBSNS-456987BXHG2-JKDNXL36985",
      batchNo: "B0123",
      mfgDate: "12 March 2025",
      expiryDate: "------",
    },
    {
      key: "2",
      uids: "DJFNFF-12KJDNN-1236HJGDSBSNS-456987BXHG2-JKDNXL36985",
      batchNo: "B0123",
      mfgDate: "12 March 2025",
      expiryDate: "------",
    },
    {
      key: "3",
      uids: "DJFNFF-12KJDNN-1236HJGDSBSNS-456987BXHG2-JKDNXL36985",
      batchNo: "B0123",
      mfgDate: "12 March 2025",
      expiryDate: "------",
    },
    {
      key: "4",
      uids: "DJFNFF-12KJDNN-1236HJGDSBSNS-456987BXHG2-JKDNXL36985",
      batchNo: "B0123",
      mfgDate: "12 March 2025",
      expiryDate: "------",
    },
    {
      key: "5",
      uids: "DJFNFF-12KJDNN-1236HJGDSBSNS-456987BXHG2-JKDNXL36985",
      batchNo: "B0123",
      mfgDate: "12 March 2025",
      expiryDate: "------",
    },
    {
      key: "6",
      uids: "DJFNFF-12KJDNN-1236HJGDSBSNS-456987BXHG2-JKDNXL36985",
      batchNo: "B0123",
      mfgDate: "12 March 2025",
      expiryDate: "------",
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
                title: (
                  <div className="cursor_pointer" onClick={handleBackToList}>
                    Branch Transfer
                  </div>
                ),
              },
              {
                title: "Branch Transfer Add",
              },
            ]}
          />
        </div>
      </div>
      <div className="qc_page_container">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Card>
              <Form
                name="basic"
                form={form}
                layout="vertical"
                autoComplete="off"
                onFinish={handleBranchTransferSubmit}
              >
                <Row gutter={[32]}>
                  <Col span={12}>
                    <Row gutter={[32]}>
                      <Col span={12}>
                        <Form.Item
                          label="Plant From"
                          name="PlantFrom"
                          rules={[
                            {
                              required: true,
                              message: "Plant From is required",
                            },
                          ]}
                        >
                          <Select
                            size="large"
                            placeholder="Please select Plant."
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
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Plant to"
                          name="PlantTo"
                          rules={[
                            {
                              required: true,
                              message: "Plant to is required",
                            },
                          ]}
                        >
                          <Select
                            size="large"
                            placeholder="Please select Plant."
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
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Transaction ID"
                          name="TransactionID"
                          rules={[
                            {
                              required: true,
                              message: "Transaction ID is required",
                            },
                            {
                              max: 100,
                              message:
                                "Transaction ID must be under 100 characters",
                            },
                            {
                              pattern: /^[a-zA-Z0-9-_]+$/,
                              message: "Transaction ID must be alphanumeric",
                            },
                          ]}
                        >
                          <Input type="text" size="large" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Vehicle No."
                          name="VehicleNo"
                          rules={[
                            {
                              required: true,
                              message: "Vehicle number is required",
                            },
                            {
                              pattern: /^[A-Z0-9 -]+$/i,
                              message: "Invalid vehicle number format",
                            },
                          ]}
                        >
                          <Input size="large" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Receipt No"
                          name="Receipt No"
                          rules={[
                            {
                              max: 50,
                              message: "Receipt No must be under 50 characters",
                            },
                          ]}
                        >
                          <Input size="large" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Date"
                          name="Date"
                          rules={[
                            {
                              required: true,
                              message: "Date is required",
                            },
                          ]}
                        >
                          <DatePicker
                            style={{ width: "100%" }}
                            size="large"
                            disabledDate={(current) =>
                              current && current > dayjs().endOf("day")
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Remark"
                          name="Remark"
                          rules={[
                            {
                              max: 250,
                              message: "Remark must be under 250 characters",
                            },
                          ]}
                        >
                          <TextArea
                            placeholder="Remark"
                            autoSize={{ minRows: 3, maxRows: 3 }}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={6}>
                        <div className="qc_mt_3">
                          <Form.Item
                            label={null}
                            name="Finalize"
                            valuePropName="checked"
                          >
                            <Checkbox>Finalize</Checkbox>
                          </Form.Item>
                        </div>
                      </Col>
                      <Col span={6}>
                        <div className="qc_mt_3">
                          <Form.Item
                            label={null}
                            name="Received"
                            valuePropName="checked"
                          >
                            <Checkbox>Received </Checkbox>
                          </Form.Item>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={12}>
                    <h3 className="qc_ps_2">Products</h3>
                    <Card>
                      <Row gutter={[32]}>
                        <Col span={9}>
                          <Form.Item
                            label="Product Code"
                            name="ProductCode"
                            rules={[
                              {
                                required: true,
                                message: "Product Code is required",
                              },
                            ]}
                          >
                            <Select
                              placeholder="Please select Product Code."
                              options={[
                                {
                                  value: "Product Code 1",
                                  label: "Product Code 1",
                                },
                                {
                                  value: "Product Code 2",
                                  label: "Product Code 2",
                                },
                                {
                                  value: "Product Code 3",
                                  label: "Product Code 3",
                                },
                              ]}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={9}>
                          <Form.Item
                            label="Quantity"
                            name="Quantity"
                            rules={[
                              {
                                required: true,
                                message: "Quantity is required",
                              },
                              {
                                pattern: /^[0-9]+$/,
                                message: "Quantity must be a valid number",
                              },
                            ]}
                          >
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <div className="qc_mt_4">
                            <Form.Item>
                              <Button color="primary" variant="outlined">
                                Add Product
                              </Button>
                            </Form.Item>
                          </div>
                        </Col>
                      </Row>
                      <Table
                        className="qc_mt_2"
                        dataSource={dataSource}
                        columns={columns}
                        size="small"
                      />
                    </Card>
                  </Col>
                </Row>

                <Row gutter={[32]}>
                  <Col span={24}>
                    <div className="qc_mt_5">
                      <Form.Item>
                        <Space size="large">
                          <Button type="primary" htmlType="submit" size="large">
                            Save
                          </Button>
                          <Button htmlType="button" size="large">
                            Cancel
                          </Button>
                        </Space>
                      </Form.Item>
                    </div>
                  </Col>
                </Row>
              </Form>
              {/* ===== product detail modal ===== */}
              <Modal
                title="Products Details"
                open={modalProductDetailVisible}
                onCancel={handleCancel}
                footer={null}
                width={{
                  xs: "90%",
                  sm: "80%",
                  md: "70%",
                  lg: "60%",
                  xl: "60%",
                  xxl: "60%",
                }}
              >
                <Form
                  form={formProductDetails}
                  onFinish={handleSave}
                  layout="vertical"
                >
                  <div className="qc_color_box qc_mb_5">
                    <Row>
                      <Col span={6}>
                        <div className="qc_key">Product Code</div>
                        <div className="qc_value">A0104</div>
                      </Col>
                      <Col span={9}>
                        <div className="qc_key">Product Name</div>
                        <div className="qc_value">CROPTEK 9:24:24</div>
                      </Col>
                      <Col span={4}>
                        <div className="qc_key">QTY.</div>
                        <div className="qc_value">500</div>
                      </Col>
                      <Col span={5}>
                        <div className="qc_key">Tagged QTY.</div>
                        <div className="qc_value">500</div>
                      </Col>
                    </Row>
                  </div>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        label="Scan QR"
                        name="ScanQR"
                        rules={[
                          {
                            required: true,
                            message: "Scan QR is required",
                          },
                          {
                            pattern: /^[A-Z0-9-]+$/i,
                            message: "Invalid QR format",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <div className="qc_mt_5">
                        <Form.Item
                          label={null}
                          name="Finalize"
                          valuePropName="checked"
                        >
                          <Checkbox>Tag Item</Checkbox>
                        </Form.Item>
                      </div>
                    </Col>
                    <Col span={8}>
                      <div className="qc_mt_5">
                        <Form.Item
                          label={null}
                          name="Received"
                          valuePropName="checked"
                        >
                          <Checkbox>Remove Tagged item</Checkbox>
                        </Form.Item>
                      </div>
                    </Col>
                    <Col span={24}>
                      <Table
                        className="qc_mt_2"
                        dataSource={dataSourceUID}
                        columns={columnsUID}
                        size="small"
                      />
                    </Col>
                    <Col span={24}>
                      <div className="qc_mt_5 qc_pt_5">
                        <Space size="large">
                          <Button type="primary" htmlType="submit" size="large">
                            Save
                          </Button>
                          <Button htmlType="button" size="large">
                            Cancel
                          </Button>
                        </Space>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </Modal>
            </Card>
          </Col>
        </Row>
      </div>
    </MainLayout>
  );
}
