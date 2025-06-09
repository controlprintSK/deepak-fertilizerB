'use client'
import React, { useState } from "react";
// import DashboardLayout from "@components/dashboard/DashboardLayout";
import {
    Button,
    Select,
    Table,
    Card,
    Breadcrumb,
    Input,
    Space,
    Row,
    Col,
    Checkbox,
    Divider,
    DatePicker,
} from "antd";
import {
    ArrowLeftOutlined,
    ArrowRightOutlined,
    DownloadOutlined,
    EnvironmentOutlined,
    LeftOutlined,
    RightCircleOutlined,
    SearchOutlined,
} from "@ant-design/icons";
// import { getUserSlug } from "@components/TokenServices";
import Link from "next/link";
import MainLayout from "@/app/components/MainLayout";
import { useRouter } from "next/navigation";
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;
const plainOptions = ["All", "Unique Address", "Duplicate Address"];
const defaultCheckedList = ["All"];

export default function ScannedQuantityState() {
    //   let slug = getUserSlug();
    let slug = '';
    const { RangePicker } = DatePicker;
    const [checkedList, setCheckedList] = useState(defaultCheckedList);
    const router = useRouter();
    const onChange = (list) => {
        setCheckedList(list);
    };

    console.log("checkedList---", checkedList);

    const columnsException = [
        {
            title: "City",
            dataIndex: "city",
            key: "city",
        },
        {
            title: "Total Scan",
            dataIndex: "totalScan",
            key: "totalScan",
        },
        {
            title: "Unique Scan",
            dataIndex: "uniqueScan",
            key: "uniqueScan",
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            width: 150
        },
    ];

    const dataSourceException = [
        {
            key: "1",
            city: "Noida",
            totalScan: "50000",
            uniqueScan: "35000",
            action: (
                <>
                    <Space size="large">
                        <Link
                            href={`/scanned-quantity/scanned-quantity-city`}>
                            <span> <Button
                                type="default"
                                color="primary"
                                variant="text"
                                size="small"
                            >Download
                            </Button>
                            </span>
                        </Link>
                        <Link
                            href={`/scanned-quantity/scanned-quantity-city`}>
                            <span>
                                <Button
                                    shape="circle"
                                    icon={<ArrowRightOutlined />}
                                    type="default"
                                    color="primary" variant="outlined" size="small"
                                />
                            </span>
                        </Link>
                    </Space>
                </>
            ),
        },
        {
            key: "2",
            city: "Noida",
            totalScan: "50000",
            uniqueScan: "35000",
            action: (
                <>
                    <Space size="large">
                        <Link
                            href={`/scanned-quantity/scanned-quantity-city`}>
                            <span> <Button
                                type="default"
                                color="primary"
                                variant="text"
                                size="small"
                            >Download
                            </Button>
                            </span>
                        </Link>
                        <Link
                            href={`/scanned-quantity/scanned-quantity-city`}>
                            <span>
                                <Button
                                    shape="circle"
                                    icon={<ArrowRightOutlined />}
                                    type="default"
                                    color="primary" variant="outlined" size="small"
                                />
                            </span>
                        </Link>
                    </Space>
                </>
            ),
        },
        {
            key: "3",
            city: "Noida",
            totalScan: "50000",
            uniqueScan: "35000",
            action: (
                <>
                    <Space size="large">
                        <Link
                            href={`/scanned-quantity/scanned-quantity-city`}>
                            <span> <Button
                                type="default"
                                color="primary"
                                variant="text"
                                size="small"
                            >Download
                            </Button>
                            </span>
                        </Link>
                        <Link
                            href={`/scanned-quantity/scanned-quantity-city`}>
                            <span>
                                <Button
                                    shape="circle"
                                    icon={<ArrowRightOutlined />}
                                    type="default"
                                    color="primary" variant="outlined" size="small"
                                />
                            </span>
                        </Link>
                    </Space>
                </>
            ),
        },
        {
            key: "4",
            city: "Noida",
            totalScan: "50000",
            uniqueScan: "35000",
            action: (
                <>
                    <Space size="large">
                        <Link
                            href={`/scanned-quantity/scanned-quantity-city`}>
                            <span> <Button
                                type="default"
                                color="primary"
                                variant="text"
                                size="small"
                            >Download
                            </Button>
                            </span>
                        </Link>
                        <Link
                            href={`/scanned-quantity/scanned-quantity-city`}>
                            <span>
                                <Button
                                    shape="circle"
                                    icon={<ArrowRightOutlined />}
                                    type="default"
                                    color="primary" variant="outlined" size="small"
                                />
                            </span>
                        </Link>
                    </Space>
                </>
            ),
        },
        {
            key: "5",
            city: "Noida",
            totalScan: "50000",
            uniqueScan: "35000",
            action: (
                <>
                    <Space size="large">
                        <Link
                            href={`/scanned-quantity/scanned-quantity-city`}>
                            <span> <Button
                                type="default"
                                color="primary"
                                variant="text"
                                size="small"
                            >Download
                            </Button>
                            </span>
                        </Link>
                        <Link
                            href={`/scanned-quantity/scanned-quantity-city`}>
                            <span>
                                <Button
                                    shape="circle"
                                    icon={<ArrowRightOutlined />}
                                    type="default"
                                    color="primary" variant="outlined" size="small"
                                />
                            </span>
                        </Link>
                    </Space>
                </>
            ),
        },
    ];

    const breadcrumbItems = [
        {
            title: (
                <Space>
                    <LeftOutlined onClick={() => router.back()} />
                    Total Scanned Quantity (State Name)
                </Space>
            ),
        },
    ];


    return (
        <MainLayout>
            <div className="page_title_container">
                <div className="component__name"><Breadcrumb separator="" items={breadcrumbItems} /></div>
            </div>
            <div className="qc_page_container">
                <div className="qc_page_filter">
                    <Row gutter={[16, 16]} align="middle">
                        <Col span={20}>
                            <Row gutter={[16, 16]}>
                                <Col span={6}>
                                    <Select
                                        placeholder="Select Product"
                                        style={{ width: "100%" }}
                                        options={[
                                            { value: "All Products", label: "All Products" },
                                            { value: "Product 1", label: "Product 1" },
                                            { value: "Product 2", label: "Product 2" },
                                        ]}
                                    />
                                </Col>
                                <Col span={6}>
                                    <Select
                                        placeholder="Select State"
                                        style={{ width: "100%" }}
                                        options={[
                                            { value: "All States", label: "All States" },
                                            { value: "State 1", label: "State 1" },
                                            { value: "State 2", label: "State 2" },
                                        ]}
                                    />
                                </Col>
                                <Col span={6}>
                                    <RangePicker style={{ width: "100%" }} />
                                </Col>
                                <Col span={6}>
                                    <Input placeholder="UIDs Search" />
                                </Col>
                            </Row>
                        </Col>
                        <Col span={4} style={{ textAlign: "right" }}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                size="large"
                                icon={<DownloadOutlined />}
                            >
                                Download
                            </Button>
                        </Col>
                    </Row>
                </div>
                <Row gutter={[32, 16]} className="mb-3 qc_mt_4">
                    <Col span={6}>
                        <Card className="uidDetailLeftPanel">
                            <div className="mb-3">
                                <div>Total Scanned Quantity</div>
                                <h3 className="value">1,45,20,614</h3>
                            </div>
                            <Divider />
                            <div className="mb-3">
                                <div>Unique Scanned Quantity</div>
                                <h3 className="value">1,45,20,614</h3>
                            </div>
                        </Card>
                    </Col>
                    <Col span={18}>
                        <Table
                            dataSource={dataSourceException}
                            columns={columnsException}
                            size="small"
                        />
                    </Col>
                </Row>
            </div>
        </MainLayout>
    );
}
// ScannedQuantityState.getLayout = function getLayout(page) {
//   return <DashboardLayout type="company">{page}</DashboardLayout>;
// };
