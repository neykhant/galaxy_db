import React, { useState, useEffect, useRef } from "react";

// ant design styles
import {
  Layout,
  Row,
  Col,
  Typography,
  Button,
  Table,
  Image,
  Divider
} from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { call } from "../../services/api";
import { getDate } from "../../uitls/convertToDate";
import Logo from "./../../assets/images/logo.png";
import { connect, useSelector } from "react-redux";
import { getAccounts } from "../../store/actions";

const { Header } = Layout;
const { Title } = Typography;

const PrintSale = ({ getAccounts }) => {
  const navigate = useNavigate();
  const componentRef = useRef();
  const [sales, setSales] = useState([]);
  const [sale, setSale] = useState();
  // const user = useSelector((state) => state.auth.user);
  const accounts = useSelector((state) => state.account.accounts);
  // console.log(accounts);

  const param = useParams();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });

  useEffect(() => {
    const fetchData = async () => {
      await getAccounts();
    };

    fetchData();
    return () => {
      fetchData();
    };
  }, [getAccounts]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await call("get", `invoices/${param.id}`);

      if (response.status === "success") {
        const data = response.data;
        // console.log(data);

        setSale(data);

        const transformSales = [];

        data.items.forEach((item) => {
          // console.log("items", item);
          transformSales.push({
            key: transformSales.length + 1,
            id: transformSales.length + 1,
            code: item.stock.item.code,
            name: item.stock.item.name,
            price: item.price,
            quantity: item.quantity,
            subtotal: item.subtotal
          });
        });

        // data.services.forEach((service) => {
        //   transformSales.push({
        //     key: transformSales.length + 1,
        //     id: transformSales.length + 1,
        //     code: service.service.code,
        //     name: service.service.category,
        //     price: service.price,
        //     quantity: service.quantity,
        //     subtotal: service.subtotal
        //   });
        // });

        setSales(transformSales);
        // console.log(transformSales);
      }
    };

    fetchData();
    return () => {
      fetchData();
    };
  }, [param]);


  const columns = [
    {
      title: "စဥ်",
      dataIndex: "id"
    },
    {
      title: "ကုတ်နံပါတ်",
      dataIndex: "code"
    },
    {
      title: "ပစ္စည်း",
      dataIndex: "name"
    },
    {
      title: "ဈေးနှုန်း",
      dataIndex: "price",
      align: "right"
    },
    {
      title: "အရေအတွက်",
      dataIndex: "quantity",
      align: "right"
    },
    {
      title: "ကျသင့်ငွေ",
      dataIndex: "subtotal",
      align: "right"
    }
  ];

  if (!sale) {
    return (
      <Layout>
        <Header style={{ backgroundColor: "var(--primary-color)" }}>
          <Title
            style={{
              color: "var(--white-color)",
              textAlign: "center",
              marginTop: "13px"
            }}
            level={3}
          >
            Loading
          </Title>
        </Header>
      </Layout>
    );
  }

  const discountAmount = sale.total * (sale.discount / 100);

  const handleDashboard = () => {
    navigate("/admin/sale");
  };

  return (
    <Layout>
      <Header style={{ backgroundColor: "var(--primary-color)" }}>
        <Title
          style={{
            color: "var(--white-color)",
            textAlign: "center",
            marginTop: "13px"
          }}
          level={3}
        >
          အရောင်း‌ဘောင်ချာ print ထုတ်ခြင်း
        </Title>
      </Header>
      <Row>
        <Col span={10}></Col>
        <Col span={2} style={{ textAlign: "center" }}>
          <Button
            style={{
              backgroundColor: "var(--primary-color)",
              color: "var(--white-color)"
            }}
            size="large"
            onClick={handlePrint}
          >
            <PrinterOutlined />
            Print
          </Button>
        </Col>
        <Col span={2}>
          <Button
            style={{
              backgroundColor: "var(--primary-color)",
              color: "var(--white-color)"
            }}
            size="large"
            onClick={handleDashboard}
          >
            အရောင်းစာမျက်နှာ
          </Button>
        </Col>
        <Col span={10}></Col>
      </Row>
      {/* <div style={{ width: "909px", margin: "30px 0px" }} ref={componentRef}> */}
      <div style={{ margin: "30px 0px" }} ref={componentRef}>
        <Row gutter={16}>
          <Col className="gutter-row" span={6}></Col>
          <Col
            className="gutter-row"
            span={12}
            // style={{ textAlign: "center", marginBottom: "20px" }}
            style={{ textAlign: "center", marginBottom: "0px" }}
          >
            <Title level={2} style={{ fontSize: "16px" }}>
              Galaxy Liquor Shop
            </Title>
            <Image width={100} height={50} src={Logo} />
          </Col>
          <Col className="gutter-row" span={6}></Col>
        </Row>
        <Row>
          <Col span={1}></Col>
          <Col span={22}>
            <Divider
              style={{
                height: "2px",
                color: "gray",
                borderWidth: "0",
                backgroundColor: "gray",
                marginBottom: "3px",
                marginTop: "2px"
              }}
            />
          </Col>
          <Col span={1}></Col>
        </Row>
        <Row>
          <Col span={10}></Col>
          <Col span={4}>
            <Title
              level={2}
              style={{
                marginBottom: "5px",
                marginTop: "1px",
                textAlign: "center",
                fontSize: "20px"
              }}
            >
              Invoice{" "}
            </Title>
          </Col>
          <Col span={10}></Col>
        </Row>
        <Row>
          <Col span={1}></Col>
          <Col span={11}>
            <Row>
              <Col span={9}>
                <Title level={5} style={{ fontSize: "11.5px" }}>
                  Customer Phone:
                </Title>
              </Col>
              <Col span={1}></Col>
              <Col span={14}>
                <Title level={5} style={{ fontSize: "11.5px" }}>
                  {sale.customer_phone_no}
                </Title>
              </Col>
            </Row>
            <Row>
              <Col span={9}>
                <Title level={5} style={{ fontSize: "11.5px" }}>
                  Customer Name:
                </Title>
              </Col>
              <Col span={1}></Col>
              <Col span={14}>
                <Title level={5} style={{ fontSize: "11.5px" }}>
                  {sale.customer_name}
                </Title>
              </Col>
            </Row>
            <Row>
              <Col span={9}>
                <Title level={5} style={{ fontSize: "11.5px" }}>
                  Sale Agent:
                </Title>
              </Col>
              <Col span={1}></Col>
              <Col span={14}>
                <Title level={5} style={{ fontSize: "11.5px" }}>
                  {sale.staff.name}
                </Title>
              </Col>
            </Row>
          </Col>
          <Col span={11}>
            <Row>
              <Col span={9}>
                <Title level={5} style={{ fontSize: "11.5px" }}>
                  Date:
                </Title>
              </Col>
              <Col span={1}></Col>
              <Col span={14}>
                <Title level={5} style={{ fontSize: "11.5px" }}>
                  {getDate(sale.created_at)}
                </Title>
              </Col>
            </Row>
            <Row>
              <Col span={9}>
                <Title level={5} style={{ fontSize: "11.5px" }}>
                  Voucher Code:
                </Title>
              </Col>
              <Col span={1}></Col>
              <Col span={14}>
                <Title level={5} style={{ fontSize: "11.5px" }}>
                  {sale.voucher_code}
                </Title>
              </Col>
            </Row>
            <Row>
              <Col span={9}>
                <Title level={5} style={{ fontSize: "11.5px" }}>
                  Payment Method:
                </Title>
              </Col>
              <Col span={1}></Col>
              <Col span={14}>
                <Title level={5} style={{ fontSize: "11.5px" }}>
                  {sale.payment_method}
                </Title>
              </Col>
            </Row>
          </Col>
          <Col span={1}></Col>
        </Row>
        <Table
          bordered
          columns={columns}
          dataSource={sales}
          // pagination={{ position: ["none", "none"] }}
          pagination={{ defaultPageSize: 20, position: ["none", "none"] }}
          style={{ margin: "10px 20px" }}
          size="small"
        />
        <Row gutter={[16, 16]}>
          <Col span={17} style={{ textAlign: "right" }}>
            <Title level={5} style={{ fontSize: "11.5px" }}>
              စုစုပေါင်း
            </Title>
          </Col>
          <Col span={1}></Col>
          <Col span={5} style={{ textAlign: "right" }}>
            <Title level={5} style={{ fontSize: "11.5px" }}>
              {sale.total}
            </Title>
          </Col>
          <Col span={1}></Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={17} style={{ textAlign: "right" }}>
            <Title level={5} style={{ fontSize: "11.5px" }}>
              လျော့ဈေး
            </Title>
          </Col>
          <Col span={2} style={{ textAlign: "left" }}>
            <Title level={5} style={{ fontSize: "11.5px" }}>
              {sale.discount}%
            </Title>
          </Col>
          <Col span={4} style={{ textAlign: "right" }}>
            <Title level={5} style={{ fontSize: "11.5px" }}>
              {discountAmount}
            </Title>
          </Col>
          <Col span={1}></Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={17} style={{ textAlign: "right" }}>
            <Title level={5} style={{ fontSize: "11.5px" }}>
              မဲလဲပိုက်ဆံပြန်အမ်းပေးငွေ
            </Title>
          </Col>
          <Col span={2} style={{ textAlign: "left" }}>
            {/* <Title level={5} style={{ fontSize: "11.5px" }}>
              {sale.lucky_price}
            </Title> */}
          </Col>
          <Col span={4} style={{ textAlign: "right" }}>
            <Title level={5} style={{ fontSize: "11.5px" }}>
              {sale.lucky_price}
            </Title>
          </Col>
          <Col span={1}></Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={17} style={{ textAlign: "right" }}>
            <Title level={5} style={{ fontSize: "11.5px" }}>
              ပေးချေရမည့်စုစုပေါင်း
            </Title>
          </Col>
          <Col span={1}></Col>
          <Col span={5} style={{ textAlign: "right" }}>
            <Title level={5} style={{ fontSize: "11.5px" }}>
              {sale.final_total}
            </Title>
          </Col>
          <Col span={1}></Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={17} style={{ textAlign: "right" }}>
            <Title level={5} style={{ fontSize: "11.5px" }}>
              ပေးငွေ
            </Title>
          </Col>
          <Col span={1}></Col>
          <Col span={5} style={{ textAlign: "right" }}>
            <Title level={5} style={{ fontSize: "11.5px" }}>
              {sale.paid}
            </Title>
          </Col>
          <Col span={1}></Col>
        </Row>
        <Row gutter={[16, 16]}>
          <Col span={17} style={{ textAlign: "right" }}>
            <Title level={5} style={{ fontSize: "11.5px" }}>
              ပေးရန်ကျန်ငွေ
            </Title>
          </Col>
          <Col span={1}></Col>
          <Col span={5} style={{ textAlign: "right" }}>
            <Title level={5} style={{ fontSize: "11.5px" }}>
              {sale.credit}
            </Title>
          </Col>
          <Col span={1}></Col>
        </Row>
      </div>
    </Layout>
  );
};

export default connect(null, { getAccounts })(PrintSale);
