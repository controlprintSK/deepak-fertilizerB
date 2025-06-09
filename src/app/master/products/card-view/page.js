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
} from "antd";
import MainLayout from "@/app/components/MainLayout";
import { redirect } from "next/navigation";
import { EditOutlined } from "@ant-design/icons";
const { Search } = Input;

export default function Products() {
  const [checked, setChecked] = useState(true);
  const handleOpenPage = () => {
    redirect("/master/product-add");
  };

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
                    <Search placeholder="Search Product Code" size="large" />
                  </div>
                </Col>
                <Col>
                  <div className="filter__item__search">
                    <Search placeholder="Search Product Name" size="large" />
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
          <Row gutter={[24, 24]}>
            <Col span={8}>
              <Card
                className="grid_card product_card"
                title={
                  <div className="card_title">
                    <small className="qc_key">Product Name</small>
                    <div>CEFAKIND-500 TABLETS 10TAB</div>
                  </div>
                }
                actions={[
                  <Row key="row" justify={"space-between"}>
                    <Col>
                      <Checkbox checked={checked}>Active</Checkbox>
                    </Col>
                    <Col>
                      <Button icon={<EditOutlined />} size="small" />
                    </Col>
                  </Row>,
                ]}>
                <div className="card_content">
                  <Row gutter={[15, 15]}>
                    <Col span={9}>
                      <div className="product__img__container qc_h_100">
                        <Image
                          src="/images/product-img1.png"
                          alt=""
                          preview={false}
                        />
                      </div>
                    </Col>
                    <Col span={15}>
                      <Row gutter={[10, 10]}>
                        <Col span={12}>
                          <div className="qc_key">Product Code</div>
                          <div className="qc_value">CEFA-001</div>
                        </Col>
                        <Col span={12}>
                          <div className="qc_key">Weight</div>
                          <div className="qc_value">40 KG</div>
                        </Col>
                        <Col span={12}>
                          <div className="qc_key">PDF Link</div>
                          <div className="qc_value">
                            <Checkbox checked={checked}>Enable</Checkbox>
                          </div>
                        </Col>
                        <Col span={12}>
                          <div className="qc_key">UOM</div>
                          <div className="qc_value">Bag</div>
                        </Col>
                        <Col span={12}>
                          <div className="qc_key">M.R.P.</div>
                          <div className="qc_value">₹ 600</div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                className="grid_card product_card"
                title={
                  <div className="card_title">
                    <small className="qc_key">Product Name</small>
                    <div>CEFAKIND-500 TABLETS 10TAB</div>
                  </div>
                }
                actions={[
                  <Row key="row" justify={"space-between"}>
                    <Col>
                      <Checkbox checked={checked}>Active</Checkbox>
                    </Col>
                    <Col>
                      <Button icon={<EditOutlined />} size="small" />
                    </Col>
                  </Row>,
                ]}>
                <div className="card_content">
                  <Row gutter={[15, 15]}>
                    <Col span={9}>
                      <div className="product__img__container qc_h_100">
                        <Image
                          src="/images/product-img1.png"
                          alt=""
                          preview={false}
                        />
                      </div>
                    </Col>
                    <Col span={15}>
                      <Row gutter={[10, 10]}>
                        <Col span={12}>
                          <div className="qc_key">Product Code</div>
                          <div className="qc_value">CEFA-001</div>
                        </Col>
                        <Col span={12}>
                          <div className="qc_key">Weight</div>
                          <div className="qc_value">40 KG</div>
                        </Col>
                        <Col span={12}>
                          <div className="qc_key">PDF Link</div>
                          <div className="qc_value">
                            <Checkbox checked={checked}>Enable</Checkbox>
                          </div>
                        </Col>
                        <Col span={12}>
                          <div className="qc_key">UOM</div>
                          <div className="qc_value">Bag</div>
                        </Col>
                        <Col span={12}>
                          <div className="qc_key">M.R.P.</div>
                          <div className="qc_value">₹ 600</div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                className="grid_card product_card"
                title={
                  <div className="card_title">
                    <small className="qc_key">Product Name</small>
                    <div>CEFAKIND-500 TABLETS 10TAB</div>
                  </div>
                }
                actions={[
                  <Row key="row" justify={"space-between"}>
                    <Col>
                      <Checkbox checked={checked}>Active</Checkbox>
                    </Col>
                    <Col>
                      <Button icon={<EditOutlined />} size="small" />
                    </Col>
                  </Row>,
                ]}>
                <div className="card_content">
                  <Row gutter={[15, 15]}>
                    <Col span={9}>
                      <div className="product__img__container qc_h_100">
                        <Image
                          src="/images/product-img1.png"
                          alt=""
                          preview={false}
                        />
                      </div>
                    </Col>
                    <Col span={15}>
                      <Row gutter={[10, 10]}>
                        <Col span={12}>
                          <div className="qc_key">Product Code</div>
                          <div className="qc_value">CEFA-001</div>
                        </Col>
                        <Col span={12}>
                          <div className="qc_key">Weight</div>
                          <div className="qc_value">40 KG</div>
                        </Col>
                        <Col span={12}>
                          <div className="qc_key">PDF Link</div>
                          <div className="qc_value">
                            <Checkbox checked={checked}>Enable</Checkbox>
                          </div>
                        </Col>
                        <Col span={12}>
                          <div className="qc_key">UOM</div>
                          <div className="qc_value">Bag</div>
                        </Col>
                        <Col span={12}>
                          <div className="qc_key">M.R.P.</div>
                          <div className="qc_value">₹ 600</div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                className="grid_card product_card"
                title={
                  <div className="card_title">
                    <small className="qc_key">Product Name</small>
                    <div>CEFAKIND-500 TABLETS 10TAB</div>
                  </div>
                }
                actions={[
                  <Row key="row" justify={"space-between"}>
                    <Col>
                      <Checkbox checked={checked}>Active</Checkbox>
                    </Col>
                    <Col>
                      <Button icon={<EditOutlined />} size="small" />
                    </Col>
                  </Row>,
                ]}>
                <div className="card_content">
                  <Row gutter={[15, 15]}>
                    <Col span={9}>
                      <div className="product__img__container qc_h_100">
                        <Image
                          src="/images/product-img1.png"
                          alt=""
                          preview={false}
                        />
                      </div>
                    </Col>
                    <Col span={15}>
                      <Row gutter={[10, 10]}>
                        <Col span={12}>
                          <div className="qc_key">Product Code</div>
                          <div className="qc_value">CEFA-001</div>
                        </Col>
                        <Col span={12}>
                          <div className="qc_key">Weight</div>
                          <div className="qc_value">40 KG</div>
                        </Col>
                        <Col span={12}>
                          <div className="qc_key">PDF Link</div>
                          <div className="qc_value">
                            <Checkbox checked={checked}>Enable</Checkbox>
                          </div>
                        </Col>
                        <Col span={12}>
                          <div className="qc_key">UOM</div>
                          <div className="qc_value">Bag</div>
                        </Col>
                        <Col span={12}>
                          <div className="qc_key">M.R.P.</div>
                          <div className="qc_value">₹ 600</div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
            <Col span={8}>
              <Card
                className="grid_card product_card"
                title={
                  <div className="card_title">
                    <small className="qc_key">Product Name</small>
                    <div>CEFAKIND-500 TABLETS 10TAB</div>
                  </div>
                }
                actions={[
                  <Row key="row" justify={"space-between"}>
                    <Col>
                      <Checkbox checked={checked}>Active</Checkbox>
                    </Col>
                    <Col>
                      <Button icon={<EditOutlined />} size="small" />
                    </Col>
                  </Row>,
                ]}>
                <div className="card_content">
                  <Row gutter={[15, 15]}>
                    <Col span={9}>
                      <div className="product__img__container qc_h_100">
                        <Image
                          src="/images/product-img1.png"
                          alt=""
                          preview={false}
                        />
                      </div>
                    </Col>
                    <Col span={15}>
                      <Row gutter={[10, 10]}>
                        <Col span={12}>
                          <div className="qc_key">Product Code</div>
                          <div className="qc_value">CEFA-001</div>
                        </Col>
                        <Col span={12}>
                          <div className="qc_key">Weight</div>
                          <div className="qc_value">40 KG</div>
                        </Col>
                        <Col span={12}>
                          <div className="qc_key">PDF Link</div>
                          <div className="qc_value">
                            <Checkbox checked={checked}>Enable</Checkbox>
                          </div>
                        </Col>
                        <Col span={12}>
                          <div className="qc_key">UOM</div>
                          <div className="qc_value">Bag</div>
                        </Col>
                        <Col span={12}>
                          <div className="qc_key">M.R.P.</div>
                          <div className="qc_value">₹ 600</div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </MainLayout>
  );
}
