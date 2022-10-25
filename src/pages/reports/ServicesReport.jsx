import React, { useEffect } from "react";
import { Typography, Space, Row, Col, Button, Table, DatePicker } from "antd";
import Layout from "antd/lib/layout/layout";
import { PlusSquareOutlined, ExportOutlined } from "@ant-design/icons";
import { getReadableDateDisplay } from "../../uitls/convertToHumanReadableTime";
import { useLocation, useNavigate } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import { getBestService } from "../../store/actions";
import queryString from "query-string";
import dayjs from "dayjs";
const { Title } = Typography;

const ServicesReport = () => {
  const { RangePicker } = DatePicker;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const services = useSelector((state) => state.service.services);
  const result = services.map((s) => ({
    ...s,
    key: Math.random() * 100
  }));

  useEffect(() => {
    const fetchData = async () => {
      dispatch(getBestService(queryString.parse(location.search)));
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getBestService, location]);

  let columns;

  if (!queryString.parse(location.search).best) {
    columns = [
      {
        title: "စဉ်",
        dataIndex: "order",
        render: (_, record) => record.id
      },
      {
        title: "ရက်စွဲ",
        dataIndex: "invoice.created_at",
        render: (_, record) =>
          getReadableDateDisplay(record.invoice?.created_at)
      },
      {
        title: "ဝန်ဆောင်မှုအမည်",
        dataIndex: "service.category",
        render: (_, record) => record.service?.category
      },

      {
        title: "အရေအတွက်",
        dataIndex: "quantity"
      },
      {
        title: "စုစုပေါင်း",
        dataIndex: "subtotal"
      }
    ];
  } else {
    columns = [
      {
        title: "ဝန်ဆောင်မှုအမည်",
        dataIndex: "service.category",
        render: (_, record) => record.service.category
      },

      {
        title: "အရေအတွက်",
        dataIndex: "total_qty"
      },
      {
        title: "စုစုပေါင်း",
        render: (_, record) => record.service.price * record.total_qty
      }
    ];
  }

  return (
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Row gutter={[16, 16]}>
          <Col span={18}>
            <Title level={3}>ဝန်ဆောင်မှု မှတ်တမ်းစာမျက်နှာ</Title>
          </Col>
          <Col span={3}></Col>
          <Col span={3}></Col>
        </Row>

        <Space direction="vertical" size={12}></Space>

        <Row>
          <Col span={5}>
            {/* <Button
              style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white-color)",
                borderRadius: "5px"
              }}
              block
            >
              Sort by ( ဝန်ဆောင်မှုအမည် )
            </Button> */}
            <RangePicker
              onChange={(val) => {
                //alert(dayjs(val[0]).format("YYYY-MM-DD"))
                if (queryString.parse(location.search).best) {
                  window.location = `/admin/service-report?best=true&start_date=${dayjs(
                    val[0]
                  ).format("YYYY-MM-DD")}&end_date=${dayjs(val[1]).format(
                    "YYYY-MM-DD"
                  )}`;
                } else {
                  window.location = `/admin/service-report?start_date=${dayjs(
                    val[0]
                  ).format("YYYY-MM-DD")}&end_date=${dayjs(val[1]).format(
                    "YYYY-MM-DD"
                  )}`;
                }
              }}
            />
          </Col>
          <Col span={14}></Col>
          <Col span={5}>
            <Button
              onClick={() => {
                window.location = "/admin/service-report?best=true";
              }}
              style={{
                backgroundColor: "var(--primary-color)",
                color: "var(--white-color)",
                borderRadius: "5px"
              }}
              block
            >
              အရောင်းရဆုံးဝန်ဆောင်မှုများ
            </Button>
          </Col>
        </Row>

        <Table
          bordered
          columns={columns}
          pagination={{ defaultPageSize: 10 }}
          dataSource={result}
        />
      </Space>
    </Layout>
  );
};

export default ServicesReport;
