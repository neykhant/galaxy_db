import React, { useEffect } from "react";
import { Typography, Space, Row, Col, Button, Table } from "antd";
import Layout from "antd/lib/layout/layout";
import { PlusSquareOutlined, ExportOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const { Title } = Typography;

const ShowSupplier = () => {
  const suppliers = useSelector((state) => state.SupplierReducer);

  const result = suppliers.map((sub) => ({
    id: sub.id,
    key: sub.id,
    code: sub.code,
    name: sub.name,
    company_name: sub.company_name,
    phone: sub.phone,
    other: sub.other
  }));

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = (record) => {
    navigate(`/admin/edit-supplier/${record.id}`);
  };

  const handleDelete = (record) => {
    dispatch({ type: "DELETE_SUPPLIERS", payload: record.id });
  };

  const columns = [
    {
      key: "code",
      title: "ကုတ်",
      dataIndex: "code"
    },
    {
      key: "name",
      title: "အမည်",
      dataIndex: "name"
    },
    {
      key: "company_name",
      title: "ကုမ္ပဏီအမည်",
      dataIndex: "company_name"
    },
    {
      key: "phone",
      title: "ဖုန်းနံပါတ်",
      dataIndex: "phone"
    },
    {
      key: "other",
      title: "အခြား",
      dataIndex: "other"
    },
    {
      key: "action",
      title: "Actions",
      dataIndex: "action",
      render: (_, record) => (
        <Space direction="horizontal">
          <Button type="primary" onClick={() => handleClick(record)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </Space>
      )
    }
  ];

  return (
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Row gutter={[16, 16]}>
          <Col span={18}>
            <Title level={3}>Supplier စာရင်း</Title>
          </Col>
          <Col span={3}>
            <Button
              style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white-color)",
                borderRadius: "5px"
              }}
              size="middle"
              onClick={() => navigate("/admin/create-supplier")}
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
                borderRadius: "5px"
              }}
              size="middle"
            >
              <ExportOutlined />
              Export
            </Button>
          </Col>
        </Row>
        <Table
          rowkey="title"
          bordered
          columns={columns}
          dataSource={result}
          pagination={{ defaultPageSize: 10 }}
        />
      </Space>
    </Layout>
  );
};

export default ShowSupplier;
