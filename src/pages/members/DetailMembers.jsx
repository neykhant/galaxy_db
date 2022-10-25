import React, { useState, useEffect } from "react";
import { Form, Input, Typography, Space, Button, Select, message, Spin } from "antd";
import Layout from "antd/lib/layout/layout";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { connect } from "react-redux";
import {
  editMembers,
  getShops,
  getMember,
  getMembers
} from "../../store/actions";

const { Title } = Typography;
const { Option } = Select;

const DetailMembers = ({ editMembers, getShops, getMember, getMembers }) => {
  const param = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const member = useSelector((state) => state.member.member);
  const shops = useSelector((state) => state.shop.shops);
  const status = useSelector((state) => state.status);
  const errors = useSelector((state) => state.error);

  useEffect(() => {
    const fetchData = async () => {
      await getShops();
      await getMember(param?.id);
      await getMembers();
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getShops, getMember, getMembers]);
  const result = shops.find((shop) => shop.id == member.shop_id);

  useEffect(() => {
    form.setFieldsValue({ code: member?.code });
    form.setFieldsValue({ name: member?.name });
    form.setFieldsValue({ phone: member?.phone });
    form.setFieldsValue({ address: member?.address });
    form.setFieldsValue({ shop_id: result?.name });
  }, [member, shops]);

  useEffect(() => {
    errors.message !== null && message.error(errors.message);
    return () => errors.message;
  }, [errors.message]);


  const onFinish = async (values) => {
    await editMembers(param?.id, values);
    navigate("/admin/show-members");
  };

  return (
    <Spin spinning={status.loading}>
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Title style={{ textAlign: "center" }} level={3}>
          Member Detail စာမျက်နှာ
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
          initialValues={{}}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            name="code"
            label="မန်ဘာကုတ်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ မန်ဘာကုတ်ထည့်ပါ"
              }
            ]}
          >
            <Input
              placeholder="မန်ဘာကုတ်ထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px", width: "100%" }}
              size="large"
              readOnly={true}
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
              readOnly={true}
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
              style={{ borderRadius: "10px", width: "100%" }}
              size="large"
              readOnly={true}
            />
          </Form.Item>
          <Form.Item
            name="address"
            label="နေရပ်လိပ်စာ"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ နေရပ်လိပ်စာထည့်ပါ"
              }
            ]}
          >
            <Input
              placeholder="နေရပ်လိပ်စာထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px" }}
              size="large"
              readOnly={true}
            />
          </Form.Item>
          <Form.Item
            name="shop_id"
            label="ဆိုင်အမည်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ဆိုင်အမည်ထည့်ပါ"
              }
            ]}
          >
            <Input
              placeholder="ဆိုင်အမည်ထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px" }}
              size="large"
              readOnly={true}
            />
          </Form.Item>
        </Form>
      </Space>
    </Layout>
    </Spin>
  );
};

const mapStateToProps = (store) => ({
  shop: store.shop
});

export default connect(mapStateToProps, {
  editMembers,
  getShops,
  getMember,
  getMembers
})(DetailMembers);
