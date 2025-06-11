"use client";
import React, { useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Col,
  Image,
  Input,
  Row,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import MainLayout from "@/app/components/MainLayout";
import { redirect } from "next/navigation";
import { EditOutlined } from "@ant-design/icons";
const { Search } = Input;

export default function Products() {
  const [checked, setChecked] = useState(true);
  const handleOpenPage = () => {
    redirect("/master/product/add");
  };

  const columns = [
    {
      title: "Product Image",
      dataIndex: "productImg",
      key: "productImg",
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
      title: "Product Type",
      dataIndex: "productType",
      key: "productType",
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
    },
    {
      title: "MRP",
      dataIndex: "mrp",
      key: "mrp",
    },
    {
      title: "UOM",
      dataIndex: "uom",
      key: "uom",
    },
    {
      title: "PDF Link",
      dataIndex: "pdfLink",
      key: "pdfLink",
    },

    {
      title: "Status",
      dataIndex: "status",
      key: "status",
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
      productImg: (
        <Image
          src="/images/product-img1.png"
          alt="product-img1"
          preview={false}
        />
      ),
      productName: "CROPTEK 9:24:24",
      productCode: "P0001",
      productType: "MAL",
      weight: "40 KG",
      mrp: "600",
      uom: "Bag",
      pdfLink: <Checkbox>Enable</Checkbox>,
      status: <Tag color="success">Active</Tag>,
      action: (
        <Space>
          <Button icon={<EditOutlined />} size="small" />
        </Space>
      ),
    },
    {
      key: "2",
      productImg: (
        <Image
          src="/images/product-img1.png"
          alt="product-img1"
          preview={false}
        />
      ),
      productName: "CROPTEK 9:24:24",
      productCode: "P0002",
      productType: "MAL",
      weight: "40 KG",
      mrp: "600",
      uom: "Bag",
      pdfLink: <Checkbox>Enable</Checkbox>,
      status: <Tag color="success">Active</Tag>,
      action: (
        <Space>
          <Button icon={<EditOutlined />} size="small" />
        </Space>
      ),
    },
    {
      key: "3",
      productImg: (
        <Image
          src="/images/product-img1.png"
          alt="product-img1"
          preview={false}
        />
      ),
      productName: "CROPTEK 9:24:24",
      productCode: "P0003",
      productType: "MAL",
      weight: "40 KG",
      mrp: "600",
      uom: "Bag",
      pdfLink: <Checkbox>Enable</Checkbox>,
      status: <Tag color="success">Active</Tag>,
      action: (
        <Space>
          <Button icon={<EditOutlined />} size="small" />
        </Space>
      ),
    },
    {
      key: "4",
      productImg: (
        <Image
          src="/images/product-img1.png"
          alt="product-img1"
          preview={false}
        />
      ),
      productName: "CROPTEK 9:24:24",
      productCode: "P0004",
      productType: "MAL",
      weight: "40 KG",
      mrp: "600",
      uom: "Bag",
      pdfLink: <Checkbox>Enable</Checkbox>,
      status: <Tag color="success">Active</Tag>,
      action: (
        <Space>
          <Button icon={<EditOutlined />} size="small" />
        </Space>
      ),
    },
    {
      key: "5",
      productImg: (
        <Image
          src="/images/product-img1.png"
          alt="product-img1"
          preview={false}
        />
      ),
      productName: "CROPTEK 9:24:24",
      productCode: "P0005",
      productType: "MAL",
      weight: "40 KG",
      mrp: "600",
      uom: "Bag",
      pdfLink: <Checkbox>Enable</Checkbox>,
      status: <Tag color="success">Active</Tag>,
      action: (
        <Space>
          <Button icon={<EditOutlined />} size="small" />
        </Space>
      ),
    },
  ];

  return (
    <MainLayout>
      <div className="page_title_container">
        {/* <div className="component__name">Master</div> */}
        <div>
          <Breadcrumb
            items={[
              {
                title: "Master",
              },
              {
                title: "Products",
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
                    <Search placeholder="Search Product Name" size="large" />
                  </div>
                </Col>
                <Col>
                  <div className="filter__item__search">
                    <Search placeholder="Search Product Code" size="large" />
                  </div>
                </Col>
                <Col>
                  <div className="filter__item__search">
                    <Select
                      style={{ width: "100%" }}
                      size="large"
                      placeholder="Select Product Type"
                      options={[
                        {
                          value: "MAL",
                          label: "MAL",
                        },
                        {
                          value: "IC",
                          label: "IC",
                        },
                        {
                          value: "Explosives",
                          label: "Explosives",
                        },
                      ]}
                    />
                  </div>
                </Col>
              </Row>
            </Col>

            <Col>
              <Button type="primary" size="large" onClick={handleOpenPage}>
                Add Product
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
