import React, { useEffect, useState } from "react";
import {
  Space,
  Typography,
  Form,
  Button,
  InputNumber,
  Table,
  Row,
  Col,
  Spin,
  message
} from "antd";
import Layout from "antd/lib/layout/layout";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { connect, useSelector } from "react-redux";
import {
  getPurchase,
  getPurchases,
  savePurchaseCredits,
  deletePurchaseCredits
} from "../../store/actions";
import { useNavigate, useParams } from "react-router-dom";
import { getReadableDateDisplay } from "../../uitls/convertToHumanReadableTime";
import Text from "antd/lib/typography/Text";
import { successDeleteMessage } from "../../uitls/messages";

const { Title } = Typography;

const ShowPurchases = ({
  getPurchase,
  getPurchases,
  savePurchaseCredits,
  deletePurchaseCredits
}) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const param = useParams();
  const allPurchases = useSelector(
    (state) => state.purchase.purchase.purchase_credits
  );
  const allCredits = useSelector((state) => state.purchase.purchase);
  const getTotalCredit = useSelector((state) => state.purchase.purchases);
  const status = useSelector((state) => state.status);
  const errors = useSelector((state) => state.error);

  useEffect(() => {
    const fetchData = async () => {
      await getPurchase(param?.id);
      await getPurchases();
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getPurchase, getPurchases]);

  useEffect(() => {
    errors.message !== null && message.error(errors.message);
    return () => errors.message;
  }, [errors.message]);

  useEffect(() => {
    if (status.success) {
      message.success(successDeleteMessage);
    }
    return () => status.success;
  }, [status.success]);

  const result = allPurchases?.map((purchase) => ({
    key: purchase.id,
    amount: purchase.amount,
    date: purchase.created_at,
    id: purchase.id
  }));

  let allCredit = [];
  result?.forEach((re) => allCredit.push(parseInt(re.amount)));
  const finalCredit = allCredit.reduce((a, b) => a + b, 0);
  // console.log("allCredit", allCredit);

  const onFinish = async (values) => {
    const result = {
      purchase_id: param.id,
      amount: values.amount
    };
    await savePurchaseCredits(result);
    form.resetFields();
    window.location.reload();
  };

  const handleDelete = async (record) => {
    await deletePurchaseCredits(record.id);
    window.location.reload();
  };

  const columns = [
    {
      title: "ရက်စွဲ",
      dataIndex: "date",
      render: (_, record) => getReadableDateDisplay(record.date)
    },
    {
      title: "ပေးခဲ့သည့်ငွေပမာဏ",
      dataIndex: "amount"
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_, record) => (
        <Space direction="horizontal">
          <Button type="primary" danger onClick={() => handleDelete(record)}>
            <DeleteOutlined />
          </Button>
        </Space>
      )
    }
  ];

  return (
    <Spin spinning={status.loading}>
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Title style={{ textAlign: "center" }} level={3}>
          အကြွေးပေးချေရန်
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
          <Form.Item
            name="amount"
            label="ပေးချေမည့်ပမာဏ"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ပေးချေမည့်ပမာဏထည့်ပါ"
              }
            ]}
          >
            <InputNumber
              placeholder="ပေးချေမည့်ပမာဏထည့်ပါ"
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
              သိမ်းမည်
            </Button>
          </Form.Item>
        </Form>
        <Row>
          <Col span={24}>
            <Space
              direction="horizontal"
              style={{ width: "100%", justifyContent: "right", marginBottom: "10px" }}
              size="large"
            >
              <Text
                style={{
                  backgroundColor: "var(--primary-color)",
                  padding: "10px",
                  color: "var(--white-color)",
                  borderRadius: "5px",
                }}
              >
                ကနဦးပေးချေခဲ့သည့်ပမာဏ = {allCredits?.paid} Ks
              </Text>
            </Space>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Space
              direction="horizontal"
              style={{ width: "100%", justifyContent: "right", marginBottom: "10px" }}
              size="large"
            >
              <Text
                style={{
                  backgroundColor: "var(--primary-color)",
                  padding: "10px",
                  color: "var(--white-color)",
                  borderRadius: "5px"
                }}
              >
                ပေးချေခဲ့ပြီးပမာဏ = {finalCredit} Ks
              </Text>
            </Space>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Space
              direction="horizontal"
              style={{ width: "100%", justifyContent: "right", marginBottom: "10px" }}
              size="large"
            >
              <Text
                style={{
                  backgroundColor: "var(--primary-color)",
                  padding: "10px",
                  color: "var(--white-color)",
                  borderRadius: "5px"
                }}
              >
                ပေးရန်ကျန်ငွေ = {allCredits?.credit} Ks
              </Text>

              {/* <Title level={4}>ပေးရန်ကျန်ငွေ - </Title>
              <Title level={4}>{allCredits.credit} Ks</Title> */}
            </Space>
          </Col>
        </Row>
        <Table
          bordered
          columns={columns}
          dataSource={result}
          pagination={{ defaultPageSize: 10 }}
        />
      </Space>
    </Layout>
    </Spin>
  );
};

const mapStateToProps = (store) => ({
  purchase: store.purchase
});

export default connect(mapStateToProps, {
  getPurchase,
  getPurchases,
  savePurchaseCredits,
  deletePurchaseCredits
})(ShowPurchases);
