"use client";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Col,
  DatePicker,
  Pagination,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Tag,
} from "antd";
import MainLayout from "@/app/components/MainLayout";
import {
  CheckCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { redirect, useRouter } from "next/navigation";
import moment from "moment";
import dayjs from "dayjs";
import { deleteAPI, postAPI } from "@/utils/apiRequest";
import { useSelector } from "react-redux";
import { displayMessage, interpolate } from "@/utils/common";
import { ERROR_MSG_TYPE, SUCCESS_MSG_TYPE } from "@/constants/hardData";
import {
  ALL_PRODUCT_LIST,
  DELETE_PRODUCTION,
  GET_BATCH_PRODUCTION,
  GET_PRODUCTION_LIST,
  LIST_ALL_LINE,
} from "@/app/api";
const { RangePicker } = DatePicker;

export default function Production() {
  const router = useRouter();
  const { user } = useSelector((state) => state.userInfo);
  const [loading, setLoading] = useState(false);
  const [productOptionList, setProductOptionList] = useState([]);
  const [productBatchList, setProductBatchList] = useState([]);
  const [productLineList, setProductLineList] = useState([]);
  const [productionData, setProductionData] = useState([]);
  const [productionTableData, setProductionTableData] = useState([]);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const [filters, setFilters] = useState({
    CompanyCode: user?.CurrentCompany ? user?.CurrentCompany : "",
    Line: "",
    ProductCode: "",
    BatchNumber: "",
    StartDate: dayjs().subtract(1, "week").format("DD/MM/YYYY"),
    EndDate: dayjs().format("DD/MM/YYYY"),
    page: tableParams?.pagination?.current,
    limit: tableParams?.pagination?.pageSize,
  });

  const handleOpenPage = () => {
    router.push("/transaction/production/add");
  };

  const fetchProductList = async () => {
    const res = await postAPI(ALL_PRODUCT_LIST, {
      CompanyCode: user?.CurrentCompany,
    });
    if (String(res?.status).includes("20") && res?.data?.length) {
      let optList = res?.data?.map((val, ind) => ({
        key: val?.ProductCode,
        value: val?.ProductCode,
        label: val?.ProductCode + " | " + val?.ProductName,
      }));
      setProductOptionList(optList);
    }
  };

  const fetchBatchList = async () => {
    const res = await postAPI(GET_BATCH_PRODUCTION, {
      CompanyCode: user?.CurrentCompany,
      ProductionStatus: [0, 1, 2, 10],
    });
    if (String(res?.status).includes("20") && res?.data?.length) {
      let optList = res?.data?.map((val, ind) => ({
        key: val?.BatchNumber,
        value: val?.BatchNumber,
        label: val?.BatchNumber,
      }));

      optList = Array.from(
        new Map(optList.map((item) => [item.key, item])).values()
      );

      setProductBatchList(optList);
    }
  };

  const fetchLineList = async () => {
    const res = await postAPI(LIST_ALL_LINE, {
      CompanyCode: user?.CurrentCompany,
    });
    if (String(res?.status).includes("20") && res?.data?.length) {
      let optList = res?.data?.map((val, ind) => ({
        key: val?.id,
        value: val?.Code,
        label: `${val?.Name}`,
      }));
      setProductLineList(optList);
    }
  };

  useEffect(() => {
    fetchBatchList();
    fetchProductList();
    fetchLineList();
  }, []);

  const fetchProductionList = async () => {
    try {
      setLoading(true);
      let res = await postAPI(GET_PRODUCTION_LIST, filters);
      setLoading(false);
      if (String(res?.status).includes("20")) {
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: res?.data?.totalResults,
          },
        });
        setProductionData(res?.data?.results);
      } else {
        displayMessage(ERROR_MSG_TYPE, res.message);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductionList();
  }, [JSON.stringify(filters)]);

  useEffect(() => {
    setFilters((pre) => ({
      ...pre,
      page: tableParams?.pagination?.current,
      limit: tableParams?.pagination?.pageSize,
    }));
  }, [JSON.stringify(tableParams)]);

  const handleProductChange = (value) => {
    setFilters((pre) => ({ ...pre, ProductCode: value || "" }));
  };

  const handleBatchChange = (value) => {
    setFilters((pre) => ({ ...pre, BatchNumber: value || "" }));
  };

  const handleLineChange = (value) => {
    setFilters((pre) => ({ ...pre, Line: value || "" }));
  };

  const handleEdit = (_id) => {
    router.push(`production/edit/${_id}`);
  };

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const res = await deleteAPI(interpolate(DELETE_PRODUCTION, [id]));
      setLoading(false);
      if (res?.status === 200) {
        displayMessage(SUCCESS_MSG_TYPE, res?.message);
        setProductionData(productionData.filter((item) => item.id !== id));
      } else {
        displayMessage(ERROR_MSG_TYPE, res?.message);
      }
    } catch (error) {
      setLoading(false);
      displayMessage(ERROR_MSG_TYPE, error?.message);
    }
  };

  useEffect(() => {
    setLoading(true);
    let data = [];

    productionData?.forEach((val, i) => {
      data.push({
        key: i.toString(),
        id: val?.id,
        dateTime: moment(val?.createdAt).format("MMM DD YYYY h:mm a"),
        plantName: val?.CompanyCode,
        lineNo: val?.Line,
        productName: val?.ProductName,
        productCode: val?.ProductCode,
        batchNo: val?.BatchNumber,
        mfgDate: val?.MfgDate,
        expDate: val?.ExpDate,
        batchSize: val?.BatchSize,
        remarks: val?.Remark,
        action: (
          <Space>
            <Button
              icon={<EditOutlined />}
              key={`edit_${i}`}
              size="small"
              onClick={() => handleEdit(val?.id)}
            />
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(val?.id)}
            >
              <Button
                icon={<DeleteOutlined />}
                type="primary"
                danger
                size="small"
              />
            </Popconfirm>
          </Space>
        ),
      });
    });
    setLoading(false);
    setProductionTableData(data);
  }, [productionData]);

  const columns = [
    {
      title: "Date & Time",
      dataIndex: "dateTime",
      key: "dateTime",
    },
    {
      title: "Plant Name",
      dataIndex: "plantName",
      key: "plantName",
    },
    {
      title: "Line No.",
      dataIndex: "lineNo",
      key: "lineNo",
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
      title: "Batch No.",
      dataIndex: "batchNo",
      key: "batchNo",
    },
    {
      title: "MFG. Date",
      dataIndex: "mfgDate",
      key: "mfgDate",
    },
    {
      title: "Exp. Date",
      dataIndex: "expDate",
      key: "expDate",
    },
    {
      title: "Batch Size",
      dataIndex: "batchSize",
      key: "batchSize",
    },
    {
      title: "Remarks",
      dataIndex: "remarks",
      key: "remarks",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
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
                    <RangePicker
                      size="large"
                      format="DD/MM/YYYY"
                      onChange={(dates, dateStrings) => {
                        setFilters((prev) => ({
                          ...prev,
                          StartDate: dateStrings[0],
                          EndDate: dateStrings[1],
                        }));
                      }}
                      defaultValue={[dayjs().subtract(1, "week"), dayjs()]}
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
                      disabled
                      defaultValue={
                        user?.CurrentCompany ? user?.CurrentCompany : ""
                      }
                    />
                  </div>
                </Col>
                <Col>
                  <div className="filter__item">
                    <Select
                      showSearch
                      allowClear
                      size="large"
                      placeholder="Line Code"
                      filterOption={(input, option) =>
                        option.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      style={{
                        width: "100%",
                      }}
                      onChange={handleLineChange}
                      options={productLineList}
                    />
                  </div>
                </Col>
                <Col>
                  <div className="filter__item">
                    <Select
                      allowClear
                      showSearch
                      size="large"
                      placeholder="Product"
                      filterOption={(input, option) =>
                        option.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      style={{
                        width: "100%",
                      }}
                      onChange={handleProductChange}
                      options={productOptionList}
                    />
                  </div>
                </Col>
                <Col>
                  <div className="filter__item">
                    <Select
                      allowClear
                      showSearch
                      size="large"
                      filterOption={(input, option) =>
                        option.label
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      placeholder="Batch Code"
                      style={{
                        width: "100%",
                      }}
                      onChange={handleBatchChange}
                      options={productBatchList}
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
        <div className="grid_list_container">
          <Table
            className="qc_mt_2"
            dataSource={productionTableData}
            columns={columns}
            size="small"
          />
        </div>
      </div>
    </MainLayout>
  );
}
