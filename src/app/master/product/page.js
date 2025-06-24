"use client";
import React, { useEffect, useState } from "react";
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
  Spin,
  Table,
  Tag,
} from "antd";
import MainLayout from "@/app/components/MainLayout";
import { redirect } from "next/navigation";
import { EditOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { GET_COMMON, PRODUCT_LIST } from "@/app/api";
import { getAPI, postAPI } from "@/utils/apiRequest";
import { ERROR_MSG_TYPE } from "@/constants/hardData";
import { displayMessage, interpolate } from "@/utils/common";
import { DeleteButton, EditButton } from "@/app/components/common/Button";
import { useDebounceCallback } from "@/app/components/common/useDebounceCallback";
const { Search } = Input;

export default function Products() {
  const [checked, setChecked] = useState(true);
  const router = useRouter();
  const { user } = useSelector((state) => state.userInfo);
  const [productList, setProductList] = useState([])
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [productTypeList, setProductTypeList] = useState([]);
  const [productTypeOption, setProductTypeOption] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const [filters, setFilters] = useState({
    page: tableParams?.pagination?.current,
    limit: tableParams?.pagination?.pageSize,
  });

  useEffect(() => {
    listproduct();
    fetchProductType();
  }, [JSON.stringify(filters)]);
  //search products
  const handleProductCodeChange = useDebounceCallback((value) => {
    if (value && value.length > 3) {
      setFilters((prev) => ({ ...prev, ProductCode: value?.trim() }));
    } else {
      setFilters((prev) => ({ ...prev, ProductCode: "" }));
    }
  }, 1000);

  const handleProductNameChange = useDebounceCallback((value) => {
    if (value && value.length > 3) {
      setFilters((prev) => ({ ...prev, ProductName: value?.trim() }));
    } else {
      setFilters((prev) => ({ ...prev, ProductName: "" }));
    }
  }, 1000);
  const handleProductTypeChange = useDebounceCallback((value) => {
    setFilters((pre) => ({ ...pre, ProductType: value || "" }));
  }, 1000);

  const listproduct = async () => {
    setLoading(true);
    try {
      let reqData = {
        sortBy: 'createdAt',
        page: tableParams?.pagination?.current,
        limit: tableParams?.pagination?.pageSize,
        CompanyCode: user?.CurrentCompany || '',
        ProductCode: filters?.ProductCode || '',
        ProductName: filters?.ProductName || '',
        ProductType: filters?.ProductType || '',
      };

      const res = await postAPI(PRODUCT_LIST, reqData);
      setLoading(false);
      if (res?.status == 200) {
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.page,
            total: res?.data?.totalPages,
          },
        });
        setProductList(res?.data?.docs);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
      displayMessage(
        ERROR_MSG_TYPE,
        'An error occurred while fetching the list of line.',
      );
    }
  };

  const fetchProductType = async () => {
    try {
      let res = await getAPI(interpolate(GET_COMMON, ['PRODUCTTYPE']));
      if (res?.status == 200) {
        setProductTypeList(res?.data);
      } else {
        setProductTypeList([]);
      }
    } catch (error) { }
  };

  useEffect(() => {
    const data = productTypeList.map((val) => ({
      value: val?.Value,
      label: val?.Value,
    }));
    setProductTypeOption(data);
  }, [productTypeList]);
  useEffect(() => {
    const data = [];
    const imageURL = process.env.NEXT_PUBLIC_BACKEND_BASE_IMG_URL
    productList?.map((val, i) => {
      data.push({
        key: i,
        ProductImage: <Image src={`${imageURL}${val?.ProductImage}`} crossOrigin="anonymous" alt={val?.ProductName} />,
        ProductName: val?.ProductName,
        ProductCode: val?.ProductCode,
        ProductType: val?.ProductType,
        Weight: val?.Weight,
        Mrp: val?.Mrp,
        UOM: val?.UOM,
        CompanyCode: val?.CompanyCode,
        SyncStatus: <Checkbox checked={val?.SyncStatus === 1}>
          {val?.SyncStatus === 1 ? 'Enable' : 'Disable'}
        </Checkbox>
        ,
        Active: val?.Active ? (
          <Tag
            color="green"
            style={{ cursor: 'pointer' }}
            onClick={() => statusByCode(val?.ProductCode)}
          >
            Active
          </Tag>
        ) : (
          <Tag
            color="red"
            style={{ cursor: 'pointer' }}
            onClick={() => statusByCode(val?.ProductCode)}
          >
            Inactive
          </Tag>
        ),
        Action: (
          <Space>
            <EditButton
              pageId={23}
              rightId={3}
              _function={() => handleEdit(val?.ProductCode)}
              _size="small"
            />
            {/* <DeleteButton pageId={23}
              rightId={3}
              _function={() => deletebycode(val?.ProductCode)}
              _size="small" /> */}
          </Space>
        ),
      })

    });
    setTableData(data)
  }, [productList]);

  const handleOpenPage = () => {
    router.push("/master/product/add");
  };
  const handleEdit = (ProductCode) => {
    router.push(`/master/product/edit/${ProductCode}`);
  };
  // const deletebycode = async (ProductCode) => {
  //   setLoading(true);
  //   try {
  //     const res = await deleteAPI(interpolate(PRODUCT_LISTBYID, [ProductCode]));
  //     setLoading(false);
  //     if (res?.status === 200) {
  //       displayMessage(SUCCESS_MSG_TYPE, 'Product deleted successfully');
  //       listproduct();
  //     } else {
  //       displayMessage(ERROR_MSG_TYPE, res?.message);
  //     }
  //   } catch (error) {
  //     setLoading(false);
  //     displayMessage(ERROR_MSG_TYPE, error?.message);
  //   }
  // };
  const columns = [
    {
      title: "Product Image",
      dataIndex: "ProductImage",
      key: "ProductImage",
    },
    {
      title: "Product Name",
      dataIndex: "ProductName",
      key: "ProductName",
    },
    {
      title: "Product Code",
      dataIndex: "ProductCode",
      key: "ProductCode",
    },
    {
      title: "Product Type",
      dataIndex: "ProductType",
      key: "ProductType",
    },
    {
      title: "Weight",
      dataIndex: "Weight",
      key: "Weight",
    },
    {
      title: "MRP",
      dataIndex: "Mrp",
      key: "Mrp",
    },
    {
      title: "UOM",
      dataIndex: "UOM",
      key: "UOM",
    },
    {
      title: "PDF Link",
      dataIndex: "SyncStatus",
      key: "SyncStatus",
    },

    {
      title: "Status",
      dataIndex: "Active",
      key: "Active",
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
    },
  ];

  const handleTableChange = (pagination) => {
    setTableParams({
      pagination,
    });

    setFilters((prev) => ({
      ...prev,
      page: pagination.current,
      limit: pagination.pageSize,
    }));
  };

  return (
    <MainLayout>
      <Spin spinning={loading}>
        <div className="page_title_container">
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
                      <Search placeholder="Search Product Name" size="large" onChange={(e) => handleProductNameChange(e.target.value)} />
                    </div>
                  </Col>
                  <Col>
                    <div className="filter__item__search">
                      <Search placeholder="Search Product Code" size="large" onChange={(e) => handleProductCodeChange(e.target.value)} />
                    </div>
                  </Col>
                  <Col>
                    <div className="filter__item__search">
                      <Select
                        showSearch
                        allowClear
                        style={{ width: "100%" }}
                        size="large"
                        placeholder="Select Product Type"
                        options={productTypeOption || []}
                        onChange={handleProductTypeChange}
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
              dataSource={tableData}
              columns={columns}
              size="small"
              pagination={tableParams.pagination}
              onChange={handleTableChange}
            />
          </div>
        </div>
      </Spin>
    </MainLayout>
  );
}
