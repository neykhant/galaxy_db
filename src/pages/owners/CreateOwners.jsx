import React, { useEffect } from "react";
import {
  Form,
  Typography,
  Space,
  Button,
  InputNumber,
  Select,
  message,
  Spin
} from "antd";
import Layout from "antd/lib/layout/layout";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import dateFormat from "dateformat";
import { saveOwners, getStocks } from "../../store/actions";
import { connect, useSelector } from "react-redux";
import { successCreateMessage } from "../../uitls/messages";

const { Title } = Typography;
const { Option } = Select;

const CreateOwners = ({ saveOwners, getStocks }) => {
  const status = useSelector((state) => state.status);
  const errors = useSelector((state) => state.error);

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const now = new Date();
  const date = dateFormat(now, "yyyy-mm-dd");

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
    errors.message !== null && message.error(errors.message);
    return () => errors.message;
  }, [errors.message]);

  useEffect(() => {
    if (status.success) {
      message.success(successCreateMessage);
    }
    return () => status.success;
  }, [status.success]);

  const stocks = useSelector((state) => state.stock.stocks);
  const allStocks = stocks.map((stock) => {
    return {
      id: stock.id,
      name: stock.item.name,
      quantity: stock.quantity
    };
  });

  const onFinish = async (values) => {
    const stock = allStocks.find((stock) => stock.id === values.stock_id);
    if (stock.quantity >= values.quantity) {
      const data = {
        date: date,
        ...values
      };
      await saveOwners(data);
      form.resetFields();
      navigate("/admin/show-owner");
    } else {
      message.error("လက်ကျန်အရေအတွက်ထက်များနေပါသည်။");
    }
  };

  return (
    <Spin spinning={status.loading}>
      <Layout style={{ margin: "20px" }}>
        <Space direction="vertical" size="middle">
          <Title style={{ textAlign: "center" }} level={3}>
            လုပ်ငန်းရှင်မှပစ္စည်းထုတ်သုံးခြင်းစာမျက်နှာ
          </Title>
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
            <Space
              direction="vertical"
              style={{
                width: "100%",
                alignItems: "center",
                marginBottom: "10px"
              }}
            ></Space>

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

            <Form.Item style={{ textAlign: "right" }}>
              <Button
                style={{
                  backgroundColor: "var(--primary-color)",
                  color: "var(--white-color)",
                  borderRadius: "10px"
                }}
                size="large"
                htmlType="submit"
              >
                <SaveOutlined />
                သိမ်းမည်
              </Button>
            </Form.Item>
          </Form>
        </Space>
      </Layout>
    </Spin>
  );
};

export default connect(null, { saveOwners, getStocks })(CreateOwners);
