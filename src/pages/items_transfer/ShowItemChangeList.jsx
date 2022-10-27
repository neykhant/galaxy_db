import React, { useEffect } from "react";
import { Typography, Space, Row, Col, Button, Table } from "antd";
import Layout from "antd/lib/layout/layout";
import { ExportOutlined, PlusSquareOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import {getItemTransfers, item_transfer} from "../../store/actions";

const { Title } = Typography;

const ShowItemChangeList = ({getItemTransfers, item_transfer}) => {
  console.log(item_transfer)
  useEffect(() => {
    const fetchData = async () => {
      await getItemTransfers();
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getItemTransfers]);

  const navigate = useNavigate();

  const columns = [
    {
      title: "ရက်စွဲ",
      dataIndex: "date"
    },
    {
      title: "ဘောင်ချာနံပါတ်",
      dataIndex: "voucher_number"
    },
    {
      title: "အမည်",
      dataIndex: "name"
    },
    {
      title: "ပစ္စည်းအမည်",
      dataIndex: "item_name"
    },

    {
      title: "	အရေအတွက်",
      dataIndex: "number"
    }
  ];

  return (
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Title level={3}>ပစ္စည်းလဲခြင်း စာရင်း</Title>
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

const mapStateToProps = (store) => ({
  item_transfer: store.item_transfer
});

export default connect(mapStateToProps, { getItemTransfers })(ShowItemChangeList);
