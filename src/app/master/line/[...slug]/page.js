"use client";
import { Breadcrumb, Button, Col, Form, Input, Row, Space, Spin, Switch } from "antd";
import MainLayout from "@/app/components/MainLayout";
import { useRouter, useParams } from "next/navigation";
import { ADD_LINE, LINE_LISTBYID, LINE_UPDATEBYID } from "@/app/api";
import { useState, useEffect } from "react";
import { displayMessage, interpolate } from "@/utils/common";
import { ERROR_MSG_TYPE, SUCCESS_MSG_TYPE } from "@/constants/hardData";
import { getAPI, postAPI, putAPI } from "@/utils/apiRequest";
import { useSelector } from "react-redux";

export default function LineAdd() {
  const params = useParams()
  const [form] = Form.useForm();
  const router = useRouter();
  const [editLineData, setEditLineData] = useState();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.userInfo);

  useEffect(() => {
    if (params?.slug[0] == 'edit') {
      getlistbyid();
    }
  }, [JSON.stringify(params)]);

  const getlistbyid = async () => {
    setLoading(true);
    try {
      const res = await getAPI(
        interpolate(LINE_LISTBYID, [params?.slug[1]]),
      );
      setLoading(false);
      if (res?.status == 200) {
        setEditLineData(res?.data);
      } else {
        displayMessage(ERROR_MSG_TYPE, res?.message);
      }
    } catch (error) {
      setLoading(false);
      displayMessage(ERROR_MSG_TYPE, error?.message);
    }
  };

  const handleBackToList = () => {
    router.push("/master/line");
  };
  //handle edit data
  useEffect(() => {
    if (editLineData) {
      const {
        Name,
        Code,
        CompanyCode,
        Active,
      } = editLineData;
      form.setFieldsValue({
        Code: Code,
        Name: Name,
        CompanyCode: CompanyCode,
        Active: Active,
      });
    }
  }, [editLineData]);

  const handleLineSubmit = async (values) => {
    setLoading(true);
    try {
      const payload = {
        Code: String(values.Code)?.toUpperCase(),
        Name: values.Name,
        Active: Number(values.Active),
        CompanyCode: values?.CompanyCode
      }
      const res = editLineData
        ? await putAPI(`${LINE_UPDATEBYID}/${editLineData?.id}`,
          payload,
        )
        : await postAPI(ADD_LINE, payload);
      setLoading(false);
      if (res?.status == 200) {
        editLineData
          ? displayMessage(SUCCESS_MSG_TYPE, res?.message)
          : displayMessage(SUCCESS_MSG_TYPE, res?.message);
        setTimeout(() => {
          router.push('/master/line');
        }, 1000);
      } else {
        displayMessage(ERROR_MSG_TYPE, res?.message);
      }
    } catch (error) {
      setLoading(false);
      displayMessage(
        ERROR_MSG_TYPE,
        'An error occurred while adding the product.',
      );
    }
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
                  title: (
                    <div className="cursor_pointer" onClick={handleBackToList}>
                      Line
                    </div>
                  ),
                },
                {
                  title: editLineData ? "Edit Line" : "Add Line",
                },
              ]}
            />
          </div>
        </div>
        <div className="qc_page_container">
          <Form
            name="basic"
            form={form}
            layout="vertical"
            autoComplete="off"
            onFinish={handleLineSubmit}
            initialValues={{ Active: true }}>
            <div style={{ width: "736px" }}>
              <Row gutter={[32]}>
                <Col span={12}>
                  <Form.Item
                    label="Line Code"
                    name="Code"
                    rules={[
                      { required: true, message: "Line Code is required" },
                      {
                        max: 20,
                        message: "Line Code cannot exceed 20 characters",
                      },
                    ]}>
                    <Input disabled={editLineData} type="text" size="large" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Line Name"
                    name="Name"
                    rules={[
                      { required: true, message: "Line Name is required" },
                      {
                        max: 100,
                        message: "Line Name cannot exceed 100 characters",
                      },
                    ]}>
                    <Input type="text" size="large" />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Plant Name"
                    name="CompanyCode"
                    rules={[
                      {
                        required: true,
                        message: "Please select your Plant Name!",
                      },
                    ]}>
                    <Input size="large" />
                  </Form.Item>
                </Col>
              </Row>
            </div>
            <div style={{ width: "736px" }}>
              <Row gutter={[32]}>
                <Col span={12}>
                  <Form.Item label="Status" name="Active" valuePropName="checked">
                    <Switch checkedChildren="On" unCheckedChildren="Off" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[32]}>
                <Col span={24}>
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
                </Col>
              </Row>
            </div>
          </Form>
        </div>
      </Spin>
    </MainLayout>
  );
}
