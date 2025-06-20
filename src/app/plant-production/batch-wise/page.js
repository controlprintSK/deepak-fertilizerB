"use client"
import React, { useEffect, useState } from "react";
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
    DatePicker,
    message,
    Skeleton,
} from "antd";
import {
    ArrowLeftOutlined,
    ArrowRightOutlined,
    DownloadOutlined,
    LeftOutlined,
    RightCircleOutlined,
    SearchOutlined,
} from "@ant-design/icons";
// import { getUserID, getUserSlug } from "@components/TokenServices";
import Link from "next/link";
import { useDispatch } from "react-redux";
// import dayjs from "dayjs";
// import moment from "moment";
// import { AxiosInstance } from "@components/axiosInstance";
import { useRouter } from "next/navigation";
import MainLayout from "@/app/components/MainLayout";
const { Option } = Select;
const { RangePicker } = DatePicker;
export default function Product() {
    //   let slug = getUserSlug();
    let slug = '';
    const router = useRouter();
    // const [plantProductInfo, setPlantInfo] = useState(null);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    // const [dataPlantProduct, setDataPlantProduct] = useState([]);
    const [productList, setProductList] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [totalDataCount, setTotalDataCount] = useState(0);

    // console.log("plantProductInfo--", plantProductInfo);

    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
        },
    });
    //   const [filters, setFilters] = useState({
    //     startDate: dayjs().subtract(3, "month").format("DD/MM/YYYY"),
    //     endDate: dayjs().format("DD/MM/YYYY"),
    //     page: 0,
    //     limit: 10,
    //     reportType: "production-level2",
    //   });

    useEffect(() => {
        const getPlantInfo = localStorage.getItem("PLANT_INFO");
        if (getPlantInfo) {
            setPlantInfo(JSON.parse(getPlantInfo));
        }
    }, []);

    //   const onDateRangeChange = (dates, dateStrings) => {
    //     setFilters((prevFilters) => ({
    //       ...prevFilters,
    //       startDate: dayjs(dates[0]).format("DD/MM/YYYY"),
    //       endDate: dayjs(dates[1]).format("DD/MM/YYYY"),
    //     }));
    //   };

    //   const fetchPlantProductList = async () => {
    //     if (![plantProductInfo?.plantCode]) {
    //       console.log("Material number is not available yet.");
    //       return;
    //     }
    //     // ======================
    //     let user = getUserID();
    //     let reqData = {
    //       ...filters,
    //       userId: user,
    //       materialNumber: [""],
    //       plant: Array.isArray(plantProductInfo?.plantCode)
    //         ? plantProductInfo.plantCode
    //         : [plantProductInfo?.plantCode],
    //       page: tableParams?.pagination?.current - 1,
    //       limit: tableParams?.pagination?.pageSize,
    //     };
    //     console.log("reqData---", reqData);
    //     try {
    //       setLoading(true);
    //       let res = await AxiosInstance.post(
    //         "/api/cpl/dashReport/fetchProductionDetails",
    //         reqData
    //       );
    //       console.log("res-----", res);
    //       const productListItem = res.data.responseData || [];
    //       if (res?.data?.responseStatus === 1) {
    //         setProductList(productListItem);
    //         setTotalDataCount(res?.data?.totalCount || 0);
    //         setTableParams((prevParams) => ({
    //           ...prevParams,
    //           pagination: {
    //             ...prevParams.pagination,
    //             total: res?.data?.totalCount,
    //           },
    //         }));
    //       } else {
    //         console.error("Error fetching:", error);
    //         message.error(`${error} Error fetching.`);
    //       }
    //     } catch (error) {
    //       console.error("Error fetching:", error);
    //       message.error(`${error} Error fetching.`);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };

    //   useEffect(() => {
    //     if (plantProductInfo) {
    //       fetchPlantProductList();
    //     }
    //   }, [
    //     plantProductInfo,
    //     filters,
    //     tableParams?.pagination?.current,
    //     tableParams?.pagination?.pageSize,
    //   ]);

    const handleViewAllClick = (productionData) => {
        const plantProductInfo = {
            productName: productionData.productName,
            quantity: productionData.quantity,
            plantName: productionData.plantName,
        };
        console.log("======", plantProductInfo);
        localStorage.setItem(
            "PLANT_PRODUCT_INFO",
            JSON.stringify(plantProductInfo)
        );
        router.push(`/${slug}/company/production/batches`);
    };

    const handleTableChange = (pagination) => {
        setTableParams({
            pagination,
        });
    };

    const columnsProductReport = [
        {
            title: "Batch No.",
            dataIndex: "batchNo",
            key: "batchNo",
        },
        {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
        },
        {
            title: "MFG Date",
            dataIndex: "batchMfgDate",
            key: "batchMfgDate",
        },
    ];

    const dataPlantProduct = [
        {
            "key": "1",
            "batchNo": "B1004",
            "quantity": "2,40,356",
            "batchMfgDate": "25 March 2025"
        },
        {
            "key": "2",
            "batchNo": "B1004",
            "quantity": "2,40,356",
            "batchMfgDate": "25 March 2025"
        },
        {
            "key": "3",
            "batchNo": "B1004",
            "quantity": "2,40,356",
            "batchMfgDate": "25 March 2025"
        },
        {
            "key": "4",
            "batchNo": "B1004",
            "quantity": "2,40,356",
            "batchMfgDate": "25 March 2025"
        }
    ]
    const plantProductInfo =
    {
        productName: "CROPTEK 9:24:24",
        quantity: "2,40,356",
        plantName: "Taloja (Maharashtra)"
    }

    // useEffect(() => {
    //     setLoading(true);
    //     let filteredData = productList?.filter((val) =>
    //         selectedProduct && selectedProduct.length > 0
    //             ? selectedProduct.includes(val?.batchNumber)
    //             : true
    //     );
    //     let data = filteredData?.map((val, i) => ({
    //         key: val?.batchNumber,
    //         product: val?.productName,
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

    //     setDataPlantProduct(data);
    //     setLoading(false);
    // }, [productList, selectedProduct]);


    return (
        <MainLayout>
            <div className="page_title_container">
                <div className="component__name">
                    <Breadcrumb
                        items={[
                            {
                                title: (
                                    <Space>
                                        <LeftOutlined onClick={() => router.back()} />
                                        Plant Production
                                    </Space>
                                ),

                            },
                            {
                                title: "Batch Wise",
                            }

                        ]}
                    />
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
                    <Row gutter={[32, 16]} className="mb-3">
                        <Col span={6}>
                            {plantProductInfo ? (
                                <Card className="uidDetailLeftPanel">
                                    <div className="mb-3">
                                        <div>Plant Code</div>
                                        <h3 className="value">
                                            {plantProductInfo?.productName || "N/A"}
                                        </h3>
                                    </div>
                                    <div className="mb-3">
                                        <div>Plant Name</div>
                                        <h3 className="value">{plantProductInfo?.plantName}</h3>
                                    </div>
                                    <div className="mb-3">
                                        <div>Produced Quantity</div>
                                        <h3 className="value">
                                            {plantProductInfo?.quantity || "N/A"}
                                        </h3>
                                    </div>
                                </Card>
                            ) : (
                                <Skeleton
                                    paragraph={{
                                        rows: 4,
                                    }}
                                    active
                                />
                            )}
                        </Col>
                        <Col span={18}>
                            <Table
                                columns={columnsProductReport}
                                dataSource={dataPlantProduct}
                                size="small"
                                loading={loading}
                                pagination={tableParams.pagination}
                                onChange={handleTableChange}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        </MainLayout>
    );
}
// PlantProduction.getLayout = function getLayout(page) {
//   return <DashboardLayout type="company">{page}</DashboardLayout>;
// };
