import React from "react";
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
} from "antd";
import {
    ArrowLeftOutlined,
    DownloadOutlined,
    LeftOutlined,
    RightCircleOutlined,
    SearchOutlined,
} from "@ant-design/icons";
// import { getUserSlug } from "@components/TokenServices";
import Link from "next/link";
import MainLayout from "../components/MainLayout";
const { Option } = Select;

export default function DataAnalysis() {
    //   let slug = getUserSlug();
    let slug = '';

    const columnsException = [
        {
            title: "UID",
            dataIndex: "uid",
            key: "uid",
        },
        {
            title: "Product & Plant",
            dataIndex: "productPlant",
            key: "productPlant",
        },
        {
            title: "Scanned In Diff. states",
            dataIndex: "scannedInDiffStates",
            key: "scannedInDiffStates",
            width: 100,
        },
        {
            title: "Scanned In Diff. PIN",
            dataIndex: "scannedInDiffPIN",
            key: "scannedInDiffPIN",
            width: 100,
        },
        {
            title: "Batch & MFG Date",
            dataIndex: "batchMfgDate",
            key: "batchMfgDate",
            width: 100,
        },
        {
            title: "Last Scan Details",
            dataIndex: "lastScanDetails",
            key: "lastScanDetails",
        },

        {
            title: "Total (Unique) Scans",
            dataIndex: "totalUniqueScans",
            key: "totalUniqueScans",
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
        },
    ];

    const dataSourceException = [
        {
            key: "1",
            uid: "IY2W4bxa33GaIZ5YR4x4",
            productPlant: (
                <>
                    <div>GUDCEF-CV 200 (10 TAB)</div>
                    <small>Copmed Phamaceuticals Pvt. Ltd.</small>
                </>
            ),
            scannedInDiffStates: 4,
            scannedInDiffPIN: 8,
            batchMfgDate: (
                <>
                    <div>A3AEW120</div>
                    <div>April 2024</div>
                </>
            ),
            lastScanDetails: (
                <>
                    <div>06-May-2024 11:05 AM</div>
                    <div>
                        Noida, A-36, Block A, Sector 4, Noida, Uttar Pradesh 201301, India
                    </div>
                </>
            ),
            totalUniqueScans: "120(35)",
            action: (
                <Link href={`/${slug}/company/data-analysis/uid-detail`}>
                    <span className="viewAllLink actionIcon">
                        <RightCircleOutlined />
                    </span>
                </Link>
            ),
        },
        {
            key: "2",
            uid: "IY2W4bxa33GaIZ5YR4x4",
            productPlant: (
                <>
                    <div>GUDCEF-CV 200 (10 TAB)</div>
                    <small>Copmed Phamaceuticals Pvt. Ltd.</small>
                </>
            ),
            scannedInDiffStates: 4,
            scannedInDiffPIN: 8,
            batchMfgDate: (
                <>
                    <div>A3AEW120</div>
                    <div>April 2024</div>
                </>
            ),
            lastScanDetails: (
                <>
                    <div>06-May-2024 11:05 AM</div>
                    <div>
                        Noida, A-36, Block A, Sector 4, Noida, Uttar Pradesh 201301, India
                    </div>
                </>
            ),
            totalUniqueScans: "120(35)",
            action: (
                <div className="cursorPointer actionIcon">
                    <RightCircleOutlined />
                </div>
            ),
        },
        {
            key: "3",
            uid: "IY2W4bxa33GaIZ5YR4x4",
            productPlant: (
                <>
                    <div>GUDCEF-CV 200 (10 TAB)</div>
                    <small>Copmed Phamaceuticals Pvt. Ltd.</small>
                </>
            ),
            scannedInDiffStates: 4,
            scannedInDiffPIN: 8,
            batchMfgDate: (
                <>
                    <div>A3AEW120</div>
                    <div>April 2024</div>
                </>
            ),
            lastScanDetails: (
                <>
                    <div>06-May-2024 11:05 AM</div>
                    <div>
                        Noida, A-36, Block A, Sector 4, Noida, Uttar Pradesh 201301, India
                    </div>
                </>
            ),
            totalUniqueScans: "120(35)",
            action: (
                <div className="cursorPointer actionIcon">
                    <RightCircleOutlined />
                </div>
            ),
        },
        {
            key: "4",
            uid: "IY2W4bxa33GaIZ5YR4x4",
            productPlant: (
                <>
                    <div>GUDCEF-CV 200 (10 TAB)</div>
                    <small>Copmed Phamaceuticals Pvt. Ltd.</small>
                </>
            ),
            scannedInDiffStates: 4,
            scannedInDiffPIN: 8,
            batchMfgDate: (
                <>
                    <div>A3AEW120</div>
                    <div>April 2024</div>
                </>
            ),
            lastScanDetails: (
                <>
                    <div>06-May-2024 11:05 AM</div>
                    <div>
                        Noida, A-36, Block A, Sector 4, Noida, Uttar Pradesh 201301, India
                    </div>
                </>
            ),
            totalUniqueScans: "120(35)",
            action: (
                <div className="cursorPointer actionIcon">
                    <RightCircleOutlined />
                </div>
            ),
        },
        {
            key: "5",
            uid: "IY2W4bxa33GaIZ5YR4x4",
            productPlant: (
                <>
                    <div>GUDCEF-CV 200 (10 TAB)</div>
                    <small>Copmed Phamaceuticals Pvt. Ltd.</small>
                </>
            ),
            scannedInDiffStates: 4,
            scannedInDiffPIN: 8,
            batchMfgDate: (
                <>
                    <div>A3AEW120</div>
                    <div>April 2024</div>
                </>
            ),
            lastScanDetails: (
                <>
                    <div>06-May-2024 11:05 AM</div>
                    <div>
                        Noida, A-36, Block A, Sector 4, Noida, Uttar Pradesh 201301, India
                    </div>
                </>
            ),
            totalUniqueScans: "120(35)",
            action: (
                <div className="cursorPointer actionIcon">
                    <RightCircleOutlined />
                </div>
            ),
        },
    ];

    return (
        <MainLayout>
            <div className="page_title_container">
                <div className="component__name"><LeftOutlined />{" "}Data Analysis</div>
            </div>
            <div className="qc_page_container">
                <Row gutter={[16, 16]} justify="space-between" className="qc_mb_4">
                    <Col span={4}>
                        <Select
                            placeholder="All Products"
                            style={{
                                width: "100%",
                            }}
                            options={[
                                {
                                    value: "Product 1",
                                    label: "Product 1",
                                },
                                {
                                    value: "Product 2",
                                    label: "Product 2",
                                },
                            ]}
                        />
                    </Col>
                    <Col span={4}>
                        <Input placeholder="Batch" />
                    </Col>
                    <Col span={4}>
                        <Input placeholder="UIDs Search" />
                    </Col>
                    <Col span={4}>
                        <Input placeholder="Word Search" />
                    </Col>
                    <Col span={4}>
                        <Button
                            // onClick={updateUserRight}
                            type="primary"
                            htmlType="submit"
                            size="large"
                            icon={<DownloadOutlined />}>
                            Download
                        </Button>
                    </Col>
                </Row>
                <Table
                    dataSource={dataSourceException}
                    columns={columnsException}
                    size="small"
                />
            </div>

        </MainLayout>
    );
}
// DataAnalysis.getLayout = function getLayout(page) {
//   return <DashboardLayout type="company">{page}</DashboardLayout>;
// };
