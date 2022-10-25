import React, { useEffect, useState } from "react";
import { Typography, Space, Row, Col, Button, Table, Spin, Select } from "antd";
import Layout from "antd/lib/layout/layout";
import { useNavigate } from "react-router-dom";
import { getStocks } from "../../store/actions";
import { connect } from "react-redux";
import { useSelector } from "react-redux";
import { ExportToExcel } from "../../excel/ExportToExcel";
import Text from "antd/lib/typography/Text";

const { Title } = Typography;
const { Option } = Select;

const OutStock = ({ stock, getStocks }) => {
  const navigate = useNavigate();
  const stockAll = stock.stocks;
  const status = useSelector((state) => state.status);
  //   const user = useSelector((state) => state.auth.user);
  const outStock = stockAll.filter((s) => Number(s?.quantity) == 0);

  const itemsUnique = [];
  outStock.forEach((i) => itemsUnique.push(i?.item?.name));
  let unique = [...new Set(itemsUnique)];
  //   console.log("uu", unique);

  const fileName = "Stocks"; // here enter filename for your excel file
  const result = outStock.map((stock) => ({
    Quantity: stock.quantity,
    Code: stock.item.code,
    Buy_Price: stock.item.buy_price,
    Sale_Price: stock.item.sale_price,
    Name: stock.item.name
  }));

  useEffect(() => {
    const fetchData = async () => {
      await getStocks();
    };

    fetchData();
    return () => {
      fetchData();
    };
  }, [getStocks]);

  const [showBuyMerchant, setshowBuyMerchant] = useState(null);

  const onChange = (value) => {
    if (value === undefined) {
      setshowBuyMerchant(outStock);
    } else {
      // const filterBuyMerchant = items.filter((mer) => console.log(mer));
      const filterBuyMerchant = outStock.filter(
        (mer) => mer.item.name === value
      );
      setshowBuyMerchant(filterBuyMerchant);
    }
  };

  //   console.log("show", showBuyMerchant);

  const columns = [
    {
      title: "ပစ္စည်းပုံ",
      dataIndex: "item",
      render: (_, record) => (
        <img src={record.item.image} alt="ပစ္စည်းပုံ" width={80} height={80} />
      )
    },
    {
      title: "ပစ္စည်းကုတ်",
      dataIndex: "item",
      render: (_, record) => {
        if (record.quantity < 10)
          return <span style={{ color: "red" }}>{record.item.code}</span>;
        else return <span>{record.item.code}</span>;
      }
    },
    {
      title: "ပစ္စည်းအမည်",
      dataIndex: "item",
      render: (_, record) => {
        if (record.quantity < 10)
          return <span style={{ color: "red" }}>{record.item.name}</span>;
        else return <span>{record.item.name}</span>;
      }
    },

    {
      title: "ဝယ်ဈေး",
      dataIndex: "buy_price",
      render: (_, record) => {
        if (record.quantity < 10)
          return <span style={{ color: "red" }}>{record.item.buy_price}</span>;
        else return <span>{record.item.buy_price}</span>;
      }
    },
    {
      title: "ရောင်းဈေး",
      dataIndex: "sale_price",
      render: (_, record) => {
        if (record.quantity < 10)
          return <span style={{ color: "red" }}>{record.item.sale_price}</span>;
        else return <span>{record.item.sale_price}</span>;
      }
    },
    {
      title: "	အရေအတွက်",
      render: (_, record) => {
        if (record.quantity < 10)
          return <span style={{ color: "red" }}>{record.quantity}</span>;
        else return <span>{record.quantity}</span>;
      }
    }
  ];

  return (
    <Spin spinning={status.loading}>
      <Layout style={{ margin: "20px" }}>
        <Space direction="vertical" size="middle">
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Title level={3}>ပစ္စည်းပြတ်စာရင်း</Title>
            </Col>
            <Col span={8}>
              <Space
                direction="horizontal"
                style={{
                  width: "100%",
                  marginBottom: "10px"
                }}
                size="large"
              >
                <Text type="secondary">ပစ္စည်းအမည်ရွေးပါ</Text>
                <Select
                  showSearch
                  placeholder="ကျေးဇူးပြု၍ ပစ္စည်းအမည်ရွေးပါ"
                  optionFilterProp="children"
                  onChange={onChange}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                  allowClear={true}
                  size="large"
                  style={{ borderRadius: "10px" }}
                >
                  {unique.map((item) => (
                    <Option key={Math.random() * 100} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Space>
            </Col>
            <Col span={4}>
              <ExportToExcel apiData={result} fileName={fileName} />
            </Col>
          </Row>
          <Table
            bordered
            columns={columns}
            dataSource={showBuyMerchant != null ? showBuyMerchant : outStock}
            pagination={{ defaultPageSize: 6 }}
          />
        </Space>
      </Layout>
    </Spin>
  );
};

const mapStateToProps = (store) => ({
  stock: store.stock
});

export default connect(mapStateToProps, { getStocks })(OutStock);
