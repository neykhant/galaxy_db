import React, { useEffect } from "react";
import {
  Space,
  Typography,
  Form,
  Button,
  InputNumber,
  Table,
  Row,
  Col,
  Select,
  Input
} from "antd";
import Layout from "antd/lib/layout/layout";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { connect, useSelector } from "react-redux";
import {
  getDailyStaffs,
  getDailyStaff,
  saveDailyStaffs,
  deleteDailyStaffs,
  editDailyStaffs,
  getStaff,
  saveBonus
} from "../../store/actions";
import { useNavigate, useParams } from "react-router-dom";
import Text from "antd/lib/typography/Text";

const { Option } = Select;
const { Title } = Typography;

const BonusStaff = ({
  getDailyStaffs,
  getDailyStaff,
  saveDailyStaffs,
  deleteDailyStaffs,
  editDailyStaffs,
  getStaff,
  saveBonus
}) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const param = useParams();

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       await getStaff(param?.id);
  //     };
  //     fetchData();
  //     return () => {
  //       fetchData();
  //     };
  //   }, [getStaff]);

  // console.log(param.id);

  //   const DailyStaffs = useSelector((state) => state.daily.dailys);
  //   const DailyStaffOne = useSelector((state) => state.daily.daily);
  // console.log("aa", DailyStaffs);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       await getDailyStaffs();
  //     };
  //     form.setFieldsValue({
  //       month: DailyStaffOne?.month ? DailyStaffOne?.month : null
  //     });
  //     form.setFieldsValue({
  //       year: DailyStaffOne?.year ? DailyStaffOne?.year : null
  //     });
  //     form.setFieldsValue({
  //       amount: DailyStaffOne?.amount ? DailyStaffOne?.amount : null
  //     });
  //     fetchData();
  //     return () => {
  //       fetchData();
  //     };
  //   }, [getDailyStaffs, DailyStaffOne]);

  const onFinish = async (values) => {
    await saveBonus({ ...values, staff_id: param?.id });
    //   if (DailyStaffOne == null) {
    //     const result = {
    //       month: values.month,
    //       year: values.year,
    //       amount: values.amount,
    //       staff_id: param?.id
    //     };
    //     await saveDailyStaffs(result);
    //   }

    //   if (DailyStaffOne) {
    //     const resultUpdate = {
    //       month: values.month,
    //       year: values.year,
    //       amount: values.amount,
    //       staff_id: DailyStaffOne?.staff?.id
    //     };
    //     await editDailyStaffs(DailyStaffOne?.id, resultUpdate);
    //   }

    //   form.resetFields();
    //   window.location.reload();
  };

  const handleDelete = async (record) => {
    await deleteDailyStaffs(record.id);
  };

  const handleClick = async (record) => {
    await getDailyStaff(record.id);
    // setStaff(DailyStaffOne);
    // navigate(`/admin/editDailyAttendance-staff/${record.id}`);
  };

  const columns = [
    {
      title: "ခုနှစ်",
      dataIndex: "year",
      render: (_, record) => record.year
    },
    {
      title: "လ",
      dataIndex: "month",
      render: (_, record) => record.month
    },
    {
      title: "ပေးခဲ့သည့်ရက်မှန်ကြေး",
      dataIndex: "amount"
    },
    {
      title: "ဝန်ထမ်းအမည်",
      dataIndex: "name",
      render: (_, record) => record?.staff?.name
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (_, record) => (
        <Space direction="horizontal">
          <Button type="primary" danger onClick={() => handleDelete(record)}>
            <DeleteOutlined />
          </Button>
          <Button type="primary" onClick={() => handleClick(record)}>
            <EditOutlined />
          </Button>
        </Space>
      )
    }
  ];

  return (
    <Layout style={{ margin: "20px" }}>
      <Space direction="vertical" size="middle">
        <Title style={{ textAlign: "center" }} level={3}>
          ဘောနပ်စ်ပေးရန်စာမျက်နှာ
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
            name="month"
            label="လ"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ လထည့်ပါ"
              }
            ]}
          >
            <Select
              showSearch
              placeholder="လထည့်ပါ"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              allowClear={true}
              size="large"
              style={{ borderRadius: "10px" }}
            >
              <Option value="01">01</Option>
              <Option value="02">02</Option>
              <Option value="03">03</Option>
              <Option value="04">04</Option>
              <Option value="05">05</Option>
              <Option value="06">06</Option>
              <Option value="07">07</Option>
              <Option value="08">08</Option>
              <Option value="09">09</Option>
              <Option value="10">10</Option>
              <Option value="11">11</Option>
              <Option value="12">12</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="year"
            label="ခုနှစ်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ခုနှစ်ထည့်ပါ"
              }
            ]}
          >
            <InputNumber
              placeholder="ခုနှစ်ထည့်ပါ  ဥပမာ(2022)"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px", width: "100%" }}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="sale"
            label="ရောင်းရသည့်ဘောနပ်စ်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ရောင်းရသည့် ဘောနပ်စ်ပမာဏထည့်ပါ"
              }
            ]}
          >
            <Input
              placeholder="ရောင်းရသည့် ဘောနပ်စ်ပမာဏထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px", width: "100%" }}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="commission"
            label="ကော်မရှင်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ကော်မရှင်ထည့်ပါ"
              }
            ]}
          >
            <Input
              placeholder="ကော်မရှင်ထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px", width: "100%" }}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="bonus"
            label="ဘောနပ်စ်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍ ဘောနပ်စ်ထည့်ပါ"
              }
            ]}
          >
            <Input
              placeholder="ဘောနပ်စ်ထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px", width: "100%" }}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="food_expense"
            label="စားစရိတ်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍  စားစရိတ်ထည့်ပါ"
              }
            ]}
          >
            <Input
              placeholder="စားစရိတ်ထည့်ပါ"
              prefix={<EditOutlined />}
              style={{ borderRadius: "10px", width: "100%" }}
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="travel_expense"
            label="သွားလာစရိတ်"
            rules={[
              {
                required: true,
                message: "ကျေးဇူးပြု၍  သွားလာစရိတ်ထည့်ပါ"
              }
            ]}
          >
            <Input
              placeholder="သွားလာစရိတ်ထည့်ပါ"
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
              style={{
                width: "100%",
                justifyContent: "right",
                marginBottom: "10px"
              }}
              size="large"
            >
              <Button
                style={{
                  backgroundColor: "var(--primary-color)",
                  color: "var(--white-color)",
                  borderRadius: "5px"
                }}
                onClick={() => navigate("/admin/show-staff")}
              >
                ပြန်သွားရန်
              </Button>
            </Space>
          </Col>
        </Row>

        <Table
          bordered
          columns={columns}
          //   dataSource={DailyStaffs}
          pagination={{ defaultPageSize: 10 }}
        />
      </Space>
    </Layout>
  );
};

const mapStateToProps = (store) => ({
  purchase: store.purchase
});

export default connect(mapStateToProps, {
  //   getDailyStaffs,
  //   getDailyStaff,
  //   saveDailyStaffs,
  //   deleteDailyStaffs,
  //   editDailyStaffs
  getStaff,
  saveBonus
})(BonusStaff);
