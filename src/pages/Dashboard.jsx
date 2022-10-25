import React from "react";
import { Space, Typography } from "antd";
import Layout from "antd/lib/layout/layout";
const { Title } = Typography;

const Dashboard = () => {
  return (
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Title style={{ textAlign: "center" }} level={3}>
          Dashboard
        </Title>
      </Space>
    </Layout>
  );
};

export default Dashboard;
