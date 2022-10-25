import React from "react";
import { Typography, Space, Row, Col, Button, Table } from "antd";
import Layout from "antd/lib/layout/layout";
import { PlusSquareOutlined, ExportOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const ShowBuyItems = () => {
  const navigate = useNavigate();

  const columns = [
    {
      title: "ပစ္စည်းကုတ်",
      dataIndex: "item_code",
    },
    {
      title: "ပစ္စည်းအမည်",
      dataIndex: "item_name",
    },
    {
      title: "ပစ္စည်းဆိုဒ်",
      dataIndex: "item_size",
    },
    {
      title: "ကာလာ",
      dataIndex: "item_color",
    },
    {
      title: "ဝယ်ဈေး",
      dataIndex: "buy_price",
    },
    {
      title: "ရောင်းဈေး",
      dataIndex: "sale_price",
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_) => (
        <Space direction="horizontal">
          <Button type="primary">Edit</Button>
          <Button type="primary" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Row gutter={[16, 16]}>
          <Col span={18}>
            <Title level={3}>အဝယ်ပစ္စည်းစာရင်း</Title>
          </Col>
          <Col span={3}>
            <Button
              style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white-color)",
                borderRadius: "5px",
              }}
              size="middle"
              onClick={() => navigate("/admin/create-buy-items")}
            >
              <PlusSquareOutlined />
              New
            </Button>
          </Col>
          <Col span={3}>
            <Button
              style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white-color)",
                borderRadius: "5px",
              }}
              size="middle"
            >
              <ExportOutlined />
              Export
            </Button>
          </Col>
        </Row>
        <Table
          bordered
          columns={columns}
          pagination={{ defaultPageSize: 10 }}
        />
      </Space>
    </Layout>
  );
};


export default ShowBuyItems;