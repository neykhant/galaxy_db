import React, { useEffect, useState } from "react";
import {
  Space,
  Typography,
  Form,
  Button,
  InputNumber,
  Select,
  Table,
  message,
  Checkbox,
  Alert,
  Spin
} from "antd";
import Layout from "antd/lib/layout/layout";
import {
  EditOutlined,
  SaveOutlined,
  PlusSquareOutlined
} from "@ant-design/icons";
import { saveBadItems, getStocks, clearAlert } from "../../store/actions";
import { connect, useSelector } from "react-redux";
import dateFormat from "dateformat";
import store from "../../store";
import { successCreateMessage } from "../../uitls/messages";

const now = new Date();

const { Title } = Typography;
const { Option } = Select;
const CreateBadItem = ({ getStocks, saveBadItems, clearAlert, bad_item }) => {
  const stocks = useSelector((state) => state.stock.stocks);
  const status = useSelector((state) => state.status);
  const errors = useSelector((state) => state.error);

  const allStocks = stocks.map((stock) => {
    return {
      id: stock.id,
      name: stock.item.name,
      quantity: stock.quantity
    };
  });

  const [bads, setBads] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      await getStocks();
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getStocks]);

  useEffect(() => {
    store.dispatch(clearAlert());
  }, []);

  useEffect(() => {
    errors.message !== null && message.error(errors.message);
    return () => errors.message;
  }, [errors.message]);

  useEffect(() => {
    if (status.success) {
      message.success(successCreateMessage);
    }
    return () => status.success;
  }, [status.success]);

  const onFinish = (values) => {
    const stock = allStocks.find((stock) => stock.id === values.stock_id);
    const addedBadItem = bads.find((item) => item.stock_id === values.stock_id);

    if (addedBadItem === undefined) {
      if (stock.quantity >= values.quantity) {
        setBads([
          ...bads,
          {
            ...values,
            name: stock.name,
            date: dateFormat(now, "yyyy-mm-dd"),
            key: bads.length + 1
          }
        ]);
        form.resetFields();
      } else {
        message.error("လက်ကျန်အရေအတွက်ထက်များနေပါသည်။");
      }
    } else {
      message.error("ထည့်ပြီးသောပစ္စည်းဖြစ်နေပါသည်။");
    }
  };

  const handleDelete = (record) => {
    const filterBads = bads.filter((bad) => bad !== record);
    setBads(filterBads);
  };

  const handleSave = async () => {
    if (bads.length === 0) {
      message.error("ကျေးဇူးပြု၍ Itemထည့်ပါ");
    } else {
      const savedBads = bads.map((bad) => {
        return {
          date: bad.date,
          stock_id: bad.stock_id,
          quantity: bad.quantity,
          is_sale: bad.is_sale === undefined ? false : true
        };
      });
      // console.log(savedBads);
      await saveBadItems({ damage_items: savedBads });
      setBads([]);
    }
  };

  const columns = [
    {
      title: "ပစ္စည်းအမည်/ကုတ်",
      dataIndex: "name"
    },
    {
      title: "အရေအတွက်",
      dataIndex: "quantity"
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
    <Spin spinning={status.loading}>
      <Layout style={{ margin: "20px" }}>
        <Space direction="vertical" size="middle">
          <Title style={{ textAlign: "center" }} level={3}>
            ချို့ယွင်းချက်ရှိပစ္စည်းများ
          </Title>
          <Space
            direction="horizontal"
            style={{
              width: "100%",
              justifyContent: "center",
              marginBottom: "10px"
            }}
            size="large"
          ></Space>

          <Form
            colon={false}
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
              name="stock_id"
              label="ပစ္စည်းကုတ်/အမည်"
              rules={[
                {
                  required: true,
                  message: "ကျေးဇူးပြု၍ ပစ္စည်းကုတ်/အမည်ထည့်ပါ"
                }
              ]}
            >
              <Select
                // showSearch
                placeholder="ကျေးဇူးပြု၍ ပစ္စည်းကုတ်/အမည်ရွေးပါ"
                // optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                allowClear={true}
                size="large"
                style={{ borderRadius: "10px" }}
              >
                {allStocks.map((stock) => (
                  <Option key={stock.id} value={stock.id}>
                    {stock.name} ({stock.quantity})
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
              name="is_sale"
              valuePropName="checked"
              wrapperCol={{ offset: 3, span: 16 }}
            >
              <Checkbox>ရောင်းပြီးသားပစ္စည်းလာလဲခြင်းလား</Checkbox>
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
            dataSource={bads}
            pagination={{ position: ["none", "none"] }}
          />

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
    </Spin>
  );
};

const mapStateToProps = (store) => ({
  bad_item: store.bad_item
});

export default connect(mapStateToProps, {
  saveBadItems,
  getStocks,
  clearAlert
})(CreateBadItem);
