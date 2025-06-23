"use client";
import React, { useState, useEffect } from "react";
import { Breadcrumb, Button, Col, Input, Pagination, Row, Space, Spin, Table, Tag } from "antd";
import MainLayout from "@/app/components/MainLayout";
import { EditOutlined } from "@ant-design/icons";
import { redirect } from "next/navigation";
import { postAPI } from "@/utils/apiRequest";
import { LIST_LINE } from "@/app/api";
import { useSelector } from "react-redux";
import { EditButton } from "@/app/components/common/Button";
import { useRouter } from "next/navigation";
import { displayMessage } from "@/utils/common";
import { ERROR_MSG_TYPE } from "@/constants/hardData";
const { Search } = Input;

export default function Line() {
  const [listLineDetails, setListLineDetails] = useState([]);
  const { user } = useSelector((state) => state.userInfo);
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
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
  const router = useRouter()
  const handleOpenPage = () => {
    router.push("/master/line/add");
  };

  const handleEditList = (code) => {
    router.push(`/master/line/edit/${code}`);
  }

  const columns = [
    {
      title: "Line Code",
      dataIndex: "Code",
      key: "Code",
    },
    {
      title: "Line Name",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "Plant",
      dataIndex: "CompanyCode",
      key: "CompanyCode",
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Active",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  useEffect(() => {
    listLine()
  }, [JSON.stringify(filters)])

  const listLine = async () => {
    setLoading(true);
    try {
      let reqData = {
        sortBy: 'createdAt',
        page: tableParams?.pagination?.current,
        limit: tableParams?.pagination?.pageSize,
        CompanyCode: user?.CurrentCompany || '',
      };

      const res = await postAPI(LIST_LINE, reqData);
      setLoading(false);
      if (res?.status == 200) {
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: res?.data?.totalResults,
          },
        });
        setListLineDetails(res?.data?.results);
      }
    } catch (error) {
      setLoading(false);
      displayMessage(
        ERROR_MSG_TYPE,
        'An error occurred while fetching the list of line.',
      );
    }
  };
  console.log("pagination", tableParams)
  useEffect(() => {
    dataLineList(listLineDetails);
  }, [listLineDetails, searchQuery]);

  const dataLineList = (items) => {
    const filteredItems = searchFilter(items, searchQuery);
    const grouplist =
      filteredItems &&
      filteredItems.map((val, i) => ({
        key: i,
        Code: val?.Code,
        Name: val?.Name,
        CompanyCode: val?.CompanyCode,
        Status: val?.Active ? (
          <Tag
            color="green"
            style={{ cursor: 'pointer' }}
            onClick={() => statusByCode(val?.Code)}
          >
            Active
          </Tag>
        ) : (
          <Tag
            color="red"
            style={{ cursor: 'pointer' }}
            onClick={() => statusByCode(val?.Code)}
          >
            Inactive
          </Tag>
        ),
        action: (
          <Space>
            <EditButton
              pageId={23}
              rightId={3}
              _function={() => handleEditList(val?.id)}
              _size="small"
            />
          </Space>
        ),
      }));
    setTableData(grouplist);
  };

  const searchFilter = (items, query) => {
    if (!query && query.length < 3) {
      return items;
    }
    return items.filter(
      (item) =>
        item?.Code?.toLowerCase().includes(query.toLowerCase()) ||
        item?.Name?.toLowerCase().includes(query.toLowerCase()) ||
        item?.CompanyCode?.toLowerCase().includes(query.toLowerCase())
    );
  };
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
          {/* <div className="component__name">Master</div> */}
          <div>
            <Breadcrumb
              items={[
                {
                  title: "Master",
                },
                {
                  title: "Line",
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
                      <Search placeholder="Search Line Code" size="large" onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>
                  </Col>
                  <Col>
                    <div className="filter__item__search">
                      <Search placeholder="Search Line Name" size="large" onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>
                  </Col>
                  <Col>
                    <div className="filter__item__search">
                      <Search placeholder="Search Plant Name" size="large" onChange={(e) => setSearchQuery(e.target.value)} />
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col>
                <div>
                  <Button type="primary" size="large" onClick={handleOpenPage}>
                    Add Line
                  </Button>
                </div>
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
