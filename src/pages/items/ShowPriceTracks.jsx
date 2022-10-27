import React, { useEffect } from "react";
import {
  Typography,
  Space,
  Row,
  Col,
  Button,
  Table,
  message,
  Spin
} from "antd";
import Layout from "antd/lib/layout/layout";
import { PlusSquareOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { getPriceTrackItems } from "../../store/actions";
import { successDeleteMessage } from "../../uitls/messages";
import { ExportToExcel } from "../../excel/ExportToExcel";
import dayjs from "dayjs";

const { Title } = Typography;

const ShowPriceTracks = ({ status, error, item, getPriceTrackItems }) => {
  const navigate = useNavigate();

  useEffect(() => {
    getPriceTrackItems();

    return () => getPriceTrackItems();
  }, [getPriceTrackItems]);

  useEffect(() => {
    error.message !== null && message.error(error.message);

    return () => error.message;
  }, [error.message]);

  useEffect(() => {
    if (status.success) {
      message.success(successDeleteMessage);
    }

    return () => status.success;
  }, [status.success]);

  const columns = [
    {
      title: "ပစ္စည်းပုံ",
      dataIndex: "item",
      render: (item) => (
        <img src={item.image} alt="ပစ္စည်းပုံ" width={70} height={70} />
      )
    },
    {
      title: "ပစ္စည်းကုတ်",
      dataIndex: "item",
      render: (item) => item.code
    },
    {
      title: "ပစ္စည်းအမည်",
      dataIndex: "item",
      render: (item) => item.name
    },

    {
      title: "ဝယ်ဈေး",
      dataIndex: "buy_price"
    },
    {
      title: "ရောင်းဈေး",
      dataIndex: "sale_price"
    },
    {
      title: "Date",
      dataIndex: "updated_at",
      render: (value) => dayjs(value).format("YYYY-MM-DD")
      // render: (value) => console.log(value)
    }
  ];

  const exportPriceTrackItem = item.priceTracks.map((priceTrack) => {
    return {
      id: priceTrack.id,
      code: priceTrack.item.code,
      name: priceTrack.item.name,

      buy_price: priceTrack.buy_price,
      sale_price: priceTrack.sale_price,
      image: priceTrack.item.image,
      date: dayjs(priceTrack.updated_at).format("YYYY-MM-DD")
    };
  });

  return (
    <Spin spinning={status.loading}>
      <Layout style={{ margin: "20px" }}>
        <Space direction="vertical" size="middle">
          <Row gutter={[16, 16]}>
            <Col xl={{ span: 18 }}>
              <Title level={3}>ဈေးနှုန်းအပြောင်းလဲစာရင်း</Title>
            </Col>
            {/* <Col xl={{ span: 3 }}>
              <Button
                style={{
                  backgroundColor: "var(--secondary-color)",
                  color: "var(--white-color)",
                  borderRadius: "5px"
                }}
                size="middle"
                onClick={() => navigate("/admin/create-items")}
              >
                <PlusSquareOutlined />
                အသစ်ထည့်မည်
              </Button>
            </Col> */}
            <Col xl={{ span: 3 }}>
              <ExportToExcel
                apiData={exportPriceTrackItem}
                fileName="ဈေးနှုန်းအပြောင်းလဲများ"
              />
            </Col>
          </Row>
          <Table
            bordered
            columns={columns}
            pagination={{ defaultPageSize: 10 }}
            dataSource={item.priceTracks}
          />
        </Space>
      </Layout>
    </Spin>
  );
};

const mapStateToProps = (store) => ({
  status: store.status,
  error: store.error,
  item: store.item
});

export default connect(mapStateToProps, { getPriceTrackItems })(
  ShowPriceTracks
);
