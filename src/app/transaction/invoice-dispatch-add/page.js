"use client";
import React, { useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Form,
  Image,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Switch,
  Table,
  Tabs,
  Tag,
  Upload,
} from "antd";
import MainLayout from "@/app/components/MainLayout";
import { redirect } from "next/navigation";
import { ArrowRightOutlined, PlusOutlined } from "@ant-design/icons";
const { TextArea } = Input;

export default function InvoiceDispatchAdd() {
  const [form] = Form.useForm();
  const [formCustomer] = Form.useForm();
  const [formProductDetails] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalProductDetailVisible, setModalProductDetailVisible] =
    useState(false);

  const handleBackToList = () => {
    redirect("/transaction/invoice-dispatch");
  };

  const handleBranchTransferSubmit = async (values) => {
    console.log("values--->>--", values);
  };

  const showModal = () => {
    setModalVisible(true);
  };

  const showModalProductDetail = () => {
    setModalProductDetailVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
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

  // ----- upload images -----
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([]);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button">
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}>
        Upload
      </div>
    </button>
  );
  // ----- upload images -----

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
                    Invoice/Dispatch
                  </div>
                ),
              },
              {
                title: "Invoice/Dispatch Add",
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
                onFinish={handleBranchTransferSubmit}>
                <Row gutter={[32]}>
                  <Col span={12}>
                    <Row gutter={[32]}>
                      <Col span={12}>
                        <Form.Item
                          label="Plant/Customer From"
                          name="PlantCustomerFrom"
                          rules={[
                            {
                              required: true,
                              message: "Plant/Customer From is required",
                            },
                          ]}>
                          <Select
                            size="large"
                            placeholder="Please select Plant/Customer."
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
                          style={{ marginBottom: "0px !important" }}
                          label="Customer to"
                          name="CustomerTo"
                          rules={[
                            {
                              required: true,
                              message: "Customer to is required",
                            },
                          ]}>
                          <Select
                            size="large"
                            placeholder="Please select Customer."
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
                        <div className="text_right qc_mt_1 qc_mb_3">
                          <Button type="link" onClick={showModal} danger>
                            + Add New Customer
                          </Button>
                        </div>
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
                                "Transaction ID cannot exceed 100 characters",
                            },
                          ]}>
                          <Input type="text" size="large" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Invoice No."
                          name="InvoiceNo"
                          rules={[
                            {
                              required: true,
                              message: "Please select your invoice no.!",
                            },
                          ]}>
                          <Input size="large" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item
                          label="Vehicle No."
                          name="VehicleNo"
                          rules={[
                            {
                              required: true,
                              message: "Please select your Vehicle No.!",
                            },
                          ]}>
                          <Input size="large" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Receipt No" name="Receipt No">
                          <Input size="large" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Date" name="Date">
                          <DatePicker style={{ width: "100%" }} size="large" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Remark" name="Remark">
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
                            valuePropName="checked">
                            <Checkbox>Finalize</Checkbox>
                          </Form.Item>
                        </div>
                      </Col>
                      <Col span={6}>
                        <div className="qc_mt_3">
                          <Form.Item
                            label={null}
                            name="Received"
                            valuePropName="checked">
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
                            ]}>
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
                                message: "Quantity to is required",
                              },
                            ]}>
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
              {/* ===== add customer modal ===== */}
              <Modal
                title="Add New Customer"
                open={modalVisible}
                onCancel={handleCancel}
                footer={null}
                width={{
                  xs: "90%",
                  sm: "80%",
                  md: "70%",
                  lg: "60%",
                  xl: "50%",
                  xxl: "40%",
                }}>
                <Form
                  form={formCustomer}
                  onFinish={handleSave}
                  layout="vertical">
                  <Row gutter={16}>
                    <Col span={12}>
                      <Form.Item
                        label="Customer Code"
                        name="CustomerCode"
                        rules={[
                          {
                            required: true,
                            message: "Please enter Customer Code",
                          },
                        ]}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Customer Name"
                        name="CustomerName"
                        rules={[
                          {
                            required: true,
                            message: "Please enter Customer Name",
                          },
                        ]}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Contact No."
                        name="ContactNo"
                        rules={[
                          {
                            required: true,
                            message: "Please enter contact number",
                          },
                        ]}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Customer Type"
                        name="CustomerType"
                        rules={[
                          {
                            required: true,
                            message: "Please enter Customer Type",
                          },
                        ]}>
                        <Select
                          placeholder="Please select customer type."
                          options={[
                            {
                              value: "Customer Type 1",
                              label: "Customer Type 1",
                            },
                            {
                              value: "Customer Type 2",
                              label: "Customer Type 2",
                            },
                            {
                              value: "Customer Type 3",
                              label: "Customer Type 3",
                            },
                          ]}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="GSTIN"
                        name="GSTIN"
                        rules={[
                          {
                            required: true,
                            message: "Please enter GSTIN",
                          },
                        ]}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Customer Logo" name="CustomerLogo">
                        <>
                          <Upload
                            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}>
                            {fileList.length >= 1 ? null : uploadButton}
                          </Upload>
                        </>
                      </Form.Item>
                      {previewImage && (
                        <Image
                          wrapperStyle={{ display: "none" }}
                          preview={{
                            visible: previewOpen,
                            onVisibleChange: (visible) =>
                              setPreviewOpen(visible),
                            afterOpenChange: (visible) =>
                              !visible && setPreviewImage(""),
                          }}
                          src={previewImage}
                          alt="Customer Image"
                        />
                      )}
                    </Col>
                  </Row>
                  <h3 className="qc_mb_5">Customer Address</h3>
                  <Row gutter={[32]}>
                    <Col span={24}>
                      <Form.Item
                        label="Address"
                        name="Address"
                        rules={[
                          {
                            required: true,
                            message: "Please select your Address!",
                          },
                        ]}>
                        <Input size="large" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Pin Code"
                        name="Pin Code"
                        rules={[
                          {
                            required: true,
                            message: "Please select your Pin Code!",
                          },
                        ]}>
                        <Input size="large" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="Country"
                        name="Country"
                        rules={[
                          {
                            required: true,
                            message: "Please select your Country!",
                          },
                        ]}>
                        <Input size="large" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="State"
                        name="State"
                        rules={[
                          {
                            required: true,
                            message: "Please select your State!",
                          },
                        ]}>
                        <Input size="large" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="City"
                        name="City"
                        rules={[
                          {
                            required: true,
                            message: "Please select your City!",
                          },
                        ]}>
                        <Input size="large" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item label="Status">
                        <Switch checkedChildren="On" unCheckedChildren="Off" />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <div className="qc_mt_5 qc_pt_5">
                        <Space size="large">
                          <Button type="primary" htmlType="submit">
                            Save
                          </Button>
                          <Button htmlType="button">Cancel</Button>
                        </Space>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </Modal>
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
                }}>
                <Form
                  form={formProductDetails}
                  onFinish={handleSave}
                  layout="vertical">
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
                            message: "Please enter Scan QR",
                          },
                        ]}>
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <div className="qc_mt_5">
                        <Form.Item
                          label={null}
                          name="Finalize"
                          valuePropName="checked">
                          <Checkbox>Tag Item</Checkbox>
                        </Form.Item>
                      </div>
                    </Col>
                    <Col span={8}>
                      <div className="qc_mt_5">
                        <Form.Item
                          label={null}
                          name="Received"
                          valuePropName="checked">
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
