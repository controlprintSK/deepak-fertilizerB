import { Col, Row, Select, Space, Button, Checkbox, Table } from "antd";

export default function GroupPermissions({ activeTab }) {
  const handleOnCancel = () => {
    setAllPages([]);
    setRightToUpdate([]);
  };

  const updateUserRight = async () => {};

  const columns = [
    {
      title: "S. No.",
      dataIndex: "SNo",
      key: "SNo",
      width: "100",
    },
    {
      title: "Menu Name",
      dataIndex: "MenuName",
      key: "MenuName",
    },
    {
      title: "View",
      dataIndex: "View",
      key: "View",
    },
    {
      title: "Add",
      dataIndex: "Add",
      key: "Add",
    },
    {
      title: "Edit",
      dataIndex: "Edit",
      key: "Edit",
    },
    {
      title: "Delete",
      dataIndex: "Delete",
      key: "Delete",
    },
    {
      title: "Print",
      dataIndex: "Print",
      key: "Print",
    },
    {
      title: "Custom 1",
      dataIndex: "Custom1",
      key: "Custom1",
    },
    {
      title: "Custom 2",
      dataIndex: "Custom2",
      key: "Custom2",
    },
    {
      title: "Custom 3",
      dataIndex: "Custom3",
      key: "Custom3",
    },
    {
      title: "Custom 4",
      dataIndex: "Custom4",
      key: "Custom4",
    },
    {
      title: "Custom 5",
      dataIndex: "Custom5",
      key: "Custom5",
    },
    {
      title: "Custom 6",
      dataIndex: "Custom6",
      key: "Custom6",
    },
  ];

  const dataSource = [
    {
      key: "1",
      SNo: "#1",
      MenuName: "Production",
      View: (
        <>
          <Checkbox></Checkbox>
        </>
      ),
      Add: (
        <>
          <Checkbox></Checkbox>
        </>
      ),
      Edit: (
        <>
          <Checkbox></Checkbox>
        </>
      ),
      Delete: (
        <>
          <Checkbox></Checkbox>
        </>
      ),
      Print: (
        <>
          <Checkbox></Checkbox>
        </>
      ),
      Custom1: (
        <>
          <Checkbox>Checkbox</Checkbox>
        </>
      ),
      Custom2: (
        <>
          <Checkbox>Checkbox</Checkbox>
        </>
      ),
      Custom3: (
        <>
          <Checkbox>Checkbox</Checkbox>
        </>
      ),
      Custom4: (
        <>
          <Checkbox>Checkbox</Checkbox>
        </>
      ),
      Custom5: (
        <>
          <Checkbox>Checkbox</Checkbox>
        </>
      ),
      Custom6: (
        <>
          <Checkbox>Checkbox</Checkbox>
        </>
      ),
    },
    {
      key: "2",
      SNo: "#2",
      MenuName: "User",
      View: (
        <>
          <Checkbox></Checkbox>
        </>
      ),
      Add: (
        <>
          <Checkbox></Checkbox>
        </>
      ),
      Edit: (
        <>
          <Checkbox></Checkbox>
        </>
      ),
      Delete: (
        <>
          <Checkbox></Checkbox>
        </>
      ),
      Print: (
        <>
          <Checkbox></Checkbox>
        </>
      ),
      Custom1: (
        <>
          <Checkbox>Checkbox</Checkbox>
        </>
      ),
      Custom2: (
        <>
          <Checkbox>Checkbox</Checkbox>
        </>
      ),
      Custom3: (
        <>
          <Checkbox>Checkbox</Checkbox>
        </>
      ),
      Custom4: (
        <>
          <Checkbox>Checkbox</Checkbox>
        </>
      ),
      Custom5: (
        <>
          <Checkbox>Checkbox</Checkbox>
        </>
      ),
      Custom6: (
        <>
          <Checkbox>Checkbox</Checkbox>
        </>
      ),
    },
    {
      key: "3",
      SNo: "#3",
      MenuName: "Plant",
      View: (
        <>
          <Checkbox></Checkbox>
        </>
      ),
      Add: (
        <>
          <Checkbox></Checkbox>
        </>
      ),
      Edit: (
        <>
          <Checkbox></Checkbox>
        </>
      ),
      Delete: (
        <>
          <Checkbox></Checkbox>
        </>
      ),
      Print: (
        <>
          <Checkbox></Checkbox>
        </>
      ),
      Custom1: (
        <>
          <Checkbox>Checkbox</Checkbox>
        </>
      ),
      Custom2: (
        <>
          <Checkbox>Checkbox</Checkbox>
        </>
      ),
      Custom3: (
        <>
          <Checkbox>Checkbox</Checkbox>
        </>
      ),
      Custom4: (
        <>
          <Checkbox>Checkbox</Checkbox>
        </>
      ),
      Custom5: (
        <>
          <Checkbox>Checkbox</Checkbox>
        </>
      ),
      Custom6: (
        <>
          <Checkbox>Checkbox</Checkbox>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="qc_page_filter">
        <Row gutter={[10, 10]}>
          <Col>
            <div className="filter__item__search">
              <div>Group Name </div>
              <Select
                style={{ width: "100%" }}
                size="large"
                placeholder="Please select user group"
                options={[
                  {
                    value: "User Group 1",
                    label: "User Group 1",
                  },
                  {
                    value: "User Group 2",
                    label: "User Group 2",
                  },
                  {
                    value: "User Group 3",
                    label: "User Group 3",
                  },
                ]}
              />
            </div>
          </Col>
        </Row>
      </div>
      <div>
        <h3 className="qc_mt_5">Assign Permission</h3>
        <Table
          className="qc_mt_2"
          dataSource={dataSource}
          columns={columns}
          size="small"
        />
        <Row gutter={[22, 0]} className="qc_mt_4">
          <Col span={24}>
            <Space>
              <Button
                onClick={updateUserRight}
                type="primary"
                htmlType="submit"
                size="large">
                Save
              </Button>
              <Button onClick={handleOnCancel} size="large">
                Cancel
              </Button>
            </Space>
          </Col>
        </Row>
      </div>
    </>
  );
}
