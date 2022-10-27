import React, { useEffect, useState } from "react";
import {
  Space,
  Typography,
  Form,
  Input,
  Button,
  InputNumber,
  Select,
  Table,
  Row,
  Col,
  message,
  notification
} from "antd";
import Layout from "antd/lib/layout/layout";
import {
  EditOutlined,
  SaveOutlined,
  PlusSquareOutlined
} from "@ant-design/icons";
import { connect, useSelector } from "react-redux";
import {
  getMerchants,
  getItems,
  savePurchases,
  getPurchase
} from "../../store/actions";
import { useNavigate, useParams } from "react-router-dom";
import dateFormat from "dateformat";

const { Title, Text } = Typography;
const { Option } = Select;

const EditBuyMerchants = ({
  item,
  merchant,
  getMerchants,
  getItems,
  savePurchases,
  getPurchase,
  purchase
}) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const param = useParams();
  const [buyMerchant, setBuyMerchant] = useState(null);

  console.log(purchase.purchase.purchase_items)


  useEffect(() => {
    const fetchData = async () => {
      await getPurchase(param?.id);
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getPurchase]);

  useEffect(() => {}, [purchase]);

  const [buys, setBuys] = useState([]);
  const [paid, setPaid] = useState(0);
  const allItems = item.items;

  useEffect(() => {
    const fetchData = async () => {
      await getMerchants();
    };

    const merchant_items =
      purchase.purchase.purchase_items === undefined
        ? []
        : purchase.purchase.purchase_items.map((purchase_item) => {
            return {
              ...purchase_item,
              key: purchase_item.id
            };
          });
    setBuys(merchant_items);
    setPaid(purchase.purchase.paid);

    fetchData();
    return () => {
      fetchData();
    };
  }, [getMerchants]);


  useEffect(() => {
    const fetchData = async () => {
      await getItems();
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getItems]);

  const now = new Date();
  const date = dateFormat(now, "yyyy-mm-dd");

  const onFinish = (values) => {
    setBuys([
      ...buys,
      {
        ...values,
        subtotal: values.quantity * values.price,
        key: buys.length + 1,
        data: date
      }
    ]);
    form.resetFields();
  };

  const total =
    buys.length > 0
      ? buys.map((buy) => buy.subtotal).reduce((a, b) => a + b)
      : 0;

  const credit = total - paid;

  const onChange = (value) => {
    if (value === undefined) {
      setBuyMerchant(null);
    } else {
      const filterBuyMerchant = merchant.merchants.find(
        (mer) => mer.id === value
      );
      setBuyMerchant(filterBuyMerchant);
    }
  };

  const handleDelete = (record) => {
    const filterBuys = buys.filter((buy) => buy !== record);
    setBuys(filterBuys);
  };

  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: "Saved Your Data",
      description: "Your data have been saved.",
      duration: 3
    });
  };

  const handleSave = async () => {
    if (buyMerchant === null) {
      message.error("ကျေးဇူးပြု၍ ကုန်သည်အချက်အလက်ထည့်ပါ");
    } else if (buys.length === 0) {
      message.error("ကျေးဇူးပြု၍ ဝယ်ရန်ထည့်ပါ");
    } else if (paid === null) {
      message.error("ကျေးဇူးပြု၍ ပေးငွေထည့်ပါ");
    } else {
      const purchase_items = buys.map((buy) => {
        return {
          item_id: buy.item_id,
          quantity: buy.quantity,
          price: buy.price,
          subtotal: buy.subtotal
        };
      });

      const saveBuy = {
        purchase_items: purchase_items,
        merchant_id: buyMerchant.id,
        paid: paid,
        credit: credit,
        whole_total: total,
        date: date
      };
      await savePurchases(saveBuy);
      openNotificationWithIcon("success");
      // console.log("save", saveBuy)
    }
    navigate("/admin/show-buy-merchants");
  };

  const columns = [
    {
      title: "ပစ္စည်းအမည်",
      dataIndex: "item",
      render: (_, record) => {
        console.log("rr", record)
        return record.item.name;
      }
    },
    {
      title: "အရေအတွက်",
      dataIndex: "quantity"
    },
    {
      title: "တစ်ခုဈေးနှုန်း",
      dataIndex: "price"
    },
    {
      title: "စုစုပေါင်းပမာဏ",
      dataIndex: "subtotal"
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_, record) => (
        <Button type="primary" danger onClick={() => handleDelete(record)}>
          Delete
        </Button>
      )
    }
  ];

  return (
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Title style={{ textAlign: "center" }} level={3}>
          အဝယ်စာရင်းသွင်းရန် edit
        </Title>
        <Space
          direction="horizontal"
          style={{
            width: "100%",
            justifyContent: "center",
            marginBottom: "10px"
          }}
          size="large"
        >
          <Text type="secondary">ကုန်သည်အမည်ရွေးပါ</Text>
          <Select
            showSearch
            placeholder="ကျေးဇူးပြု၍ ကုန်သည်အမည်ရွေးပါ"
            optionFilterProp="children"
            onChange={onChange}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            defaultValue={
              purchase.purchase.merchant !== undefined &&
              purchase.purchase.merchant.id
            }
            allowClear={true}
            size="large"
            style={{ borderRadius: "10px" }}
          >
            {merchant.merchants.map((mer) => (
              <Option key={mer.id} value={mer.id}>
                {mer.name}
              </Option>
            ))}
          </Select>
        </Space>
        <Space
          direction="horizontal"
          style={{ width: "100%", justifyContent: "center" }}
          size="large"
        >
          <Title level={4}>ကုန်သည်လုပ်ငန်းအမည် - </Title>
          <Title level={4}>
            {purchase.purchase.merchant !== undefined &&
              purchase.purchase.merchant.company_name}
          </Title>
        </Space>
        <Form
          labelCol={{
            xl: {
              span: 3
            }
          }}
          wrapperCol={{
            span: 24
          }}
          initialValues={{
            remember: true
          }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            name="item_id"
            label="ပစ္စည်း"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ပစ္စည်းအမည်ထည့်ပါ"
              }
            ]}
          >
            <Select
              showSearch
              placeholder="ကျေးဇူးပြု၍ ပစ္စည်းအမည်ထည့်ပါ"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              allowClear={true}
              size="large"
              style={{ borderRadius: "10px" }}
            >
              {allItems.map((item) => (
                <Option key={item.id} value={item.id}>
                  {item.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="quantity"
            label="အရေအတွက်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ အရေအတွက်ထည့်ပါ"
              }
            ]}
          >
            <InputNumber
              placeholder="အရေအတွက်ထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px", width: "100%" }}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="price"
            label="တစ်ခုဈေးနှုန်း"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ တစ်ခုဈေးနှုန်းထည့်ပါ"
              }
            ]}
          >
            <InputNumber
              placeholder="တစ်ခုဈေးနှုန်းထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px", width: "100%" }}
              size="large"
            />
          </Form.Item>

          <Form.Item style={{ textAlign: "right" }}>
            <Button
              style={{
                backgroundColor: "var(--secondary-color)",
                color: "var(--white-color)",
                borderRadius: "10px"
              }}
              size="large"
              htmlType="submit"
            >
              <PlusSquareOutlined />
              အသစ်ထည့်မည်
            </Button>
          </Form.Item>
        </Form>
        <Table
          bordered
          columns={columns}
          dataSource={buys}
          pagination={{ position: ["none", "none"] }}
        />
        <Row>
          <Col span={17} style={{ textAlign: "right" }}>
            <Title level={4}>စုစုပေါင်း</Title>
          </Col>
          <Col span={2}></Col>
          <Col span={5}>
            <Title level={4}>{total} Ks</Title>
          </Col>
        </Row>
        <Row>
          <Col span={17} style={{ textAlign: "right" }}>
            <Title level={4}>ပေးငွေ</Title>
          </Col>
          <Col span={2}></Col>
          <Col span={5}>
            <InputNumber
              placeholder="ပေးငွေ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px", width: "100%" }}
              size="large"
              value={paid}
              onChange={(value) => setPaid(value)}
            />
          </Col>
        </Row>
        <Row>
          <Col span={17} style={{ textAlign: "right" }}>
            <Title level={4}>ပေးရန်ကျန်ငွေ</Title>
          </Col>
          <Col span={2}></Col>
          <Col span={5}>
            <Title level={4}>{credit} Ks</Title>
          </Col>
        </Row>
        <Space
          direction="horizontal"
          style={{ width: "100%", justifyContent: "right" }}
        >
          <Button
            style={{
              backgroundColor: "var(--primary-color)",
              color: "var(--white-color)",
              borderRadius: "10px"
            }}
            size="large"
            onClick={handleSave}
          >
            <SaveOutlined />
            သိမ်းမည်
          </Button>
        </Space>
      </Space>
    </Layout>
  );
};

const mapStateToProps = (store) => ({
  merchant: store.merchant,
  item: store.item,
  purchase: store.purchase
});

export default connect(mapStateToProps, {
  getMerchants,
  getItems,
  savePurchases,
  getPurchase
})(EditBuyMerchants);
