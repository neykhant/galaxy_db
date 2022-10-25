import React, { useEffect } from "react";
import {
  Form,
  Typography,
  Space,
  Button,
  InputNumber,
  Select,
  Spin,
  message
} from "antd";
import Layout from "antd/lib/layout/layout";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { useSelector, connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getStocks, editOwners, getOwner } from "../../store/actions";
import dateFormat from "dateformat";
import { successEditMessage } from "../../uitls/messages";

const { Title } = Typography;
const { Option } = Select;

const EditOwners = ({ getStocks, getOwner, editOwners, owner }) => {
  const status = useSelector((state) => state.status);
  const errors = useSelector((state) => state.error);

  const param = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    const fetchData = async () => {
      await getStocks();
      await getOwner(param?.id);
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getStocks, getOwner]);

  useEffect(() => {
    errors.message !== null && message.error(errors.message);
    return () => errors.message;
  }, [errors.message]);

  useEffect(() => {
    if (status.success) {
      message.success(successEditMessage);
    }
    return () => status.success;
  }, [status.success]);

  const stocks = useSelector((state) => state.stock.stocks);

  useEffect(() => {
    form.setFieldsValue({ quantity: owner.owner?.quantity });
    form.setFieldsValue({ stock_id: owner.owner?.stock?.id });
  }, [owner]);

  const onFinish = async (values) => {
    const now = new Date();
    const date = dateFormat(now, "yyyy-mm-dd");

    const data = {
      date: date,
      ...values
    };
    await editOwners(param?.id, data);
    navigate("/admin/show-owner");
  };

  return (
    <Spin spinning={status.loading}>
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Title style={{ textAlign: "center" }} level={3}>
          လုပ်ငန်းရှင်မှပစ္စည်းထုတ်သုံးခြင်းစာမျက်နှာ
        </Title>
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
              showSearch
              placeholder="ကျေးဇူးပြု၍ ပစ္စည်းကုတ်/အမည်ရွေးပါ"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              allowClear={true}
              size="large"
              style={{ borderRadius: "10px" }}
            >
              {stocks.map((stock) => (
                <Option key={stock.id} value={stock.id}>
                  {stock.item.name}({stock?.quantity})
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

const mapStateToProps = (store) => ({
  owner: store.owner
});

export default connect(mapStateToProps, { getStocks, editOwners, getOwner })(
  EditOwners
);
