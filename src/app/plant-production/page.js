'use client'
import React, { useEffect, useState } from "react";
// import DashboardLayout from "@components/dashboard/DashboardLayout";
import {
    Button,
    Select,
    Table,
    Card,
    Breadcrumb,
    Input,
    Row,
    Col,
    DatePicker,
    Space,
    message,
    Avatar,
} from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined, DownloadOutlined, LeftOutlined, RightCircleFilled } from "@ant-design/icons";
// import { getUserID, getUserSlug } from "@components/TokenServices";
import Link from "next/link";
// import { AxiosInstance } from "@components/axiosInstance";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import MainLayout from "@/app/components/MainLayout";
// import moment from "moment";
const { Option } = Select;
const { RangePicker } = DatePicker;

export default function Production() {
    //   let slug = getUserSlug();
    let slug = '';
    const router = useRouter();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    // const [dataPlantProduction, setDataPlantProduction] = useState([]);
    const [plantList, setPlantList] = useState([]);
    const [selectedPlant, setSelectedPlant] = useState(null);
    const [totalDataCount, setTotalDataCount] = useState(0);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    const [filters, setFilters] = useState({
        startDate: dayjs().subtract(3, "month").format("DD/MM/YYYY"),
        endDate: dayjs().format("DD/MM/YYYY"),
        page: 0,
        limit: 10,
        reportType: "production-level1",
    });

    const onDateRangeChange = (dates) => {
        if (dates) {
            setFilters((prevFilters) => ({
                ...prevFilters,
                startDate: dayjs(dates[0]).format("DD/MM/YYYY"),
                endDate: dayjs(dates[1]).format("DD/MM/YYYY"),
            }));
        }
    };

    //   const fetchProductionList = async () => {
    //     try {
    //       setLoading(true);
    //     //   let user = getUserID();
    //       let user = '1234';
    //       let reqData = {
    //         ...filters,
    //         userId: user,
    //         page: tableParams?.pagination?.current - 1,
    //         limit: tableParams?.pagination?.pageSize,
    //       };
    //       let res = await AxiosInstance.post(
    //         "/api/cpl/dashReport/fetchProductionDetails",
    //         reqData
    //       );
    //       console.log("res-----", res);
    //       const plantListItem = res.data.responseData || [];
    //       if (res?.data?.responseStatus === 1) {
    //         setPlantList(plantListItem);
    //         setTotalDataCount(res?.data?.totalCount || 0);
    //         setTableParams((prevParams) => ({
    //           ...prevParams,
    //           pagination: {
    //             ...prevParams.pagination,
    //             total: res?.data?.totalCount,
    //           },
    //         }));
    //       } else {
    //         console.error("Error fetching :", error);
    //       }
    //     } catch (error) {
    //       console.error("Error fetching:", error);
    //       message.error(`${error} Error fetching.`);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };

    //   useEffect(() => {
    //     fetchProductionList();
    //   }, [
    //     filters,
    //     tableParams?.pagination?.current,
    //     tableParams?.pagination?.pageSize,
    //   ]);

    const handleViewAllClick = (productionData) => {
        const plantInfo = {
            plantCode: [productionData.plantCode],
            plantName: productionData.plantName,
            quantity: productionData.quantity,
        };
        console.log("======", plantInfo);
        localStorage.setItem("PLANT_INFO", JSON.stringify(plantInfo));
        router.push(`/${slug}/company/production/plant-production`);
    };

    const handleTableChange = (pagination) => {
        setTableParams({
            pagination,
        });
    };

    const columnsProductionReport = [
        {
            title: "Plant Code",
            dataIndex: "plantCode",
            key: "plantCode",
        },
        {
            title: "Plant",
            dataIndex: "plantName",
            key: "plantName",
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
            width: 150,
        },
    ];

    const dataPlantProduction = [
        {
            key: "1",
            plantCode: "P001",
            plantName: "Taloja (Maharashtra)",
            quantity: "2,40,356",
            action: (
                <>
                    <Space size="large">
                        <Link
                            href={`scanned-quantity/scanned-quantity-state`}>
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
                            href={`/plant-production/product-wise`}>
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
            plantCode: "P001",
            plantName: "Taloja (Maharashtra)",
            quantity: "2,40,356",
            action: (
                <>
                    <Space size="large">
                        <Link
                            href={`scanned-quantity/scanned-quantity-state`}>
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
                            href={`/${slug}/company/scanned-quantity/scanned-quantity-state`}>
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
            plantCode: "P001",
            plantName: "Taloja (Maharashtra)",
            quantity: "2,40,356",
            action: (
                <>
                    <Space size="large">
                        <Link
                            href={`scanned-quantity/scanned-quantity-state`}>
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
                            href={`/${slug}/company/scanned-quantity/scanned-quantity-state`}>
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
            plantCode: "P001",
            plantName: "Taloja (Maharashtra)",
            quantity: "2,40,356",
            action: (
                <>
                    <Space size="large">
                        <Link
                            href={`scanned-quantity/scanned-quantity-state`}>
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
                            href={`/${slug}/company/scanned-quantity/scanned-quantity-state`}>
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
            plantCode: "P001",
            plantName: "Taloja (Maharashtra)",
            quantity: "2,40,356",
            action: (
                <>
                    <Space size="large">
                        <Link
                            href={`scanned-quantity/scanned-quantity-state`}>
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
                            href={`/${slug}/company/scanned-quantity/scanned-quantity-state`}>
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
        }
    ]

    // useEffect(() => {
    //     setLoading(true);
    //     let filteredData = plantList?.filter((val) =>
    //         selectedPlant && selectedPlant.length > 0
    //             ? selectedPlant.includes(val?.plantCode)
    //             : true
    //     );
    //     let data = filteredData?.map((val, i) => ({
    //         key: val?.plantCode,
    //         plantCode: val?.plantCode,
    //         plantName: val?.plantName,
    //         quantity: val?.quantity,
    //         action: (
    //             <Space>
    //                 <div
    //                     className="viewAllLink cursorPointer"
    //                     onClick={() => handleViewAllClick(val)}>
    //                     View All
    //                 </div>
    //                 <Link href={`/${slug}/company/product-report`}>
    //                     <a className="viewAllLink actionIcon">
    //                         <DownloadOutlined />
    //                     </a>
    //                 </Link>
    //             </Space>
    //         ),
    //     }));

    //     setDataPlantProduction(data);
    //     setLoading(false);
    // }, [plantList, selectedPlant]);

    const breadcrumbItems = [
        {
            title: (
                <Space>
                    <LeftOutlined onClick={() => router.back()} />
                    Plant Production
                </Space>
            ),
        },
    ];

    return (
        <MainLayout>
            <div className="page_title_container">
                <div className="component__name">
                    <Breadcrumb separator="" items={breadcrumbItems} />
                </div>
            </div>
            <div className="qc_page_container">
                <div className="qc_page_filter">
                    <Row justify="space-between" align="bottom" gutter={[16, 16]} className="qc_mb_3">
                        <Col>
                            <Row gutter={16} align="bottom">
                                <Col>
                                    <div className="filter__item__search">
                                        <div className="qc_mb_2">Select Plant</div>
                                        <Select
                                            style={{ width: "100%" }}
                                            size="large"
                                            placeholder="Please select Plants"
                                            options={[
                                                { value: "Plant 1", label: "Plant 1" },
                                                { value: "Plant 2", label: "Plant 2" },
                                                { value: "Plant 3", label: "Plant 3" },
                                            ]}
                                        />
                                    </div>
                                </Col>
                                <Col>
                                    <div className="filter__item__range__picker">
                                        <div className="qc_mb_2">Select Date</div>
                                        <RangePicker size="large" style={{ width: "100%" }} />
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <div>
                                <Button type="primary" size="large" icon={<DownloadOutlined />}>
                                    Download All
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="grid_list_container">
                    <Table
                        columns={columnsProductionReport}
                        dataSource={dataPlantProduction}
                        size="small"
                        loading={loading}
                        pagination={tableParams.pagination}
                        onChange={handleTableChange}
                    />
                </div>
            </div>
        </MainLayout>
    );
}
// Production.getLayout = function getLayout(page) {
//   return <DashboardLayout type="company">{page}</DashboardLayout>;
// };
