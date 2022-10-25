import React, { useEffect } from "react";
import {
  Form,
  Input,
  Typography,
  Space,
  Button,
  Select,
  message,
  Spin
} from "antd";
import Layout from "antd/lib/layout/layout";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { connect, useSelector } from "react-redux";
import { editMerchants, getShops, getMerchant } from "../../store/actions";
import { useNavigate, useParams } from "react-router-dom";
import { successEditMessage } from "../../uitls/messages";

const { Title } = Typography;
const { Option } = Select;

const EditMerchants = ({ editMerchants, getShops, getMerchant }) => {
  const [form] = Form.useForm();
  const param = useParams();
  const navigate = useNavigate();
  const status = useSelector((state) => state.status);
  const errors = useSelector((state) => state.error);
  const merchant = useSelector((state) => state.merchant.merchant);
  // console.log(status);

  useEffect(() => {
    const fetchData = async () => {
      await getShops();
      await getMerchant(param?.id);
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getShops, getMerchant]);

  useEffect(() => {
    errors.message !== null && message.error(errors.message);

    return () => errors.message;
  }, [errors.message]);

  useEffect(() => {
    if (status.success) {
      form.resetFields();
      message.success(successEditMessage);
    }

    return () => status.success;
  }, [status.success]);

  useEffect(() => {
    form.setFieldsValue({ code: merchant?.code });
    form.setFieldsValue({ name: merchant?.name });
    form.setFieldsValue({ phone: merchant?.phone });
    form.setFieldsValue({ company_name: merchant?.company_name });
    form.setFieldsValue({ other: merchant?.other });
  }, [merchant]);

  const onFinish = async (values) => {
    await editMerchants(param?.id, values);
    // form.resetFields();
    navigate("/admin/show-merchants");
  };

  return (
    <Spin spinning={status.loading}>
      <Layout style={{ margin: "20px" }}>
        <Space direction="vertical" size="middle">
          <Title style={{ textAlign: "center" }} level={3}>
            ကုန်သည်အချက်အလက်ပြုပြင်ရန်စာမျက်နှာ
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
              // ["shop_id"]: currentId ,
              remember: true
            }}
            onFinish={onFinish}
            form={form}
          >
            <Form.Item
              name="code"
              label="ကုတ်"
              rules={[
                {
                  required: true,
                  message: "ကျေးဇူးပြု၍ ကုတ်ထည့်ပါ"
                }
              ]}
            >
              <Input
                placeholder="ကုတ်ထည့်ပါ"
                prefix={<EditOutlined />}
                style={{ borderRadius: "10px" }}
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="name"
              label="အမည်"
              rules={[
                {
                  required: true,
                  message: "ကျေးဇူးပြု၍ အမည်ထည့်ပါ"
                }
              ]}
            >
              <Input
                placeholder="အမည်ထည့်ပါ"
                prefix={<EditOutlined />}
                style={{ borderRadius: "10px" }}
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="phone"
              label="ဖုန်းနံပါတ်"
              rules={[
                {
                  required: true,
                  message: "ကျေးဇူးပြု၍ ဖုန်းနံပါတ်ထည့်ပါ"
                }
              ]}
            >
              <Input
                placeholder="ဖုန်းနံပါတ်ထည့်ပါ"
                prefix={<EditOutlined />}
                style={{ borderRadius: "10px" }}
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="company_name"
              label="ကုမ္ပဏီအမည်"
              rules={[
                {
                  required: true,
                  message: "ကျေးဇူးပြု၍ ကုမ္ပဏီအမည်ထည့်ပါ"
                }
              ]}
            >
              <Input
                placeholder="ကုမ္ပဏီအမည်ထည့်ပါ"
                prefix={<EditOutlined />}
                style={{ borderRadius: "10px" }}
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="other"
              label="အခြားအချက်လက်"
              rules={[
                {
                  required: true,
                  message: "ကျေးဇူးပြု၍ အခြားအချက်လက်ထည့်ပါ"
                }
              ]}
            >
              <Input
                placeholder="အခြားအချက်လက်ထည့်ပါ"
                prefix={<EditOutlined />}
                style={{ borderRadius: "10px" }}
                size="large"
              />
            </Form.Item>

            {/* <Form.Item
            name="shop_id"
            label="ဆိုင်အမည်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ဆိုင်အမည်ရွေးပါ"
              }
            ]}
          >
            <Select
              showSearch
              placeholder="ကျေးဇူးပြု၍ ဆိုင်အမည်ရွေးပါ"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              allowClear={true}
              size="large"
              style={{ borderRadius: "10px" }}
              // defaultValue={currentId}
            >
              {shops.map((shop) => (
                <Option  value={shop.id} key={shop.id}>{shop.name}</Option>
              ))}
              
            </Select>
          </Form.Item> */}
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

export default connect(null, { editMerchants, getShops, getMerchant })(
  EditMerchants
);
