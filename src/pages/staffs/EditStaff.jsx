import React, { useState, useEffect } from "react";
import { Form, Input, Typography, Space, Button, message, Spin } from "antd";
import Layout from "antd/lib/layout/layout";
import { EditOutlined, SaveOutlined } from "@ant-design/icons";
import InputUpload from "../../components/InputUpload";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editStaffs, getStaff } from "../../store/actions";
import { connect } from "react-redux";
import { successEditMessage } from "../../uitls/messages";

const { Title, Text } = Typography;

const EditStaff = ({ editStaffs, getStaff }) => {
  const param = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [fileList, setFileList] = useState([]);
  const AllStaffs = useSelector((state) => state.staff.staffs);
  const status = useSelector((state) => state.status);
  const errors = useSelector((state) => state.error);
  const staff = useSelector((state) => state.staff.staff);

  const currentStaff = AllStaffs.find(
    (staff) => staff.id === parseInt(param?.id)
  );

  useEffect(() => {
    const fetchData = async () => {
      await getStaff(param?.id);
    };
    fetchData();
    return () => {
      fetchData();
    };
  }, [getStaff]);

  useEffect(() => {
    if (currentStaff) {
      form.setFieldsValue({ dob: currentStaff.dob });
      form.setFieldsValue({ name: currentStaff.name });
      form.setFieldsValue({ code: currentStaff.code });
      form.setFieldsValue({ start_work: currentStaff.start_work });
      form.setFieldsValue({ phone: currentStaff.phone });
      form.setFieldsValue({ salary: currentStaff.salary });
      form.setFieldsValue({ address: currentStaff.address });
      form.setFieldsValue({ position: currentStaff.position });
      setFileList([
        {
          uid: currentStaff.image.uid,
          name: currentStaff.image.name,
          status: "done",
          url: currentStaff.image
        }
      ]);
    }
  }, [currentStaff]);

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

  useEffect(() => {
    form.setFieldsValue({ code: staff?.code });
    form.setFieldsValue({ name: staff?.name });
    form.setFieldsValue({ dob: staff?.dob });
    form.setFieldsValue({ start_work: staff?.start_work });
    form.setFieldsValue({ phone: staff?.phone });
    form.setFieldsValue({ salary: staff?.salary });
    form.setFieldsValue({ address: staff?.address });
    form.setFieldsValue({ position: staff?.position });
    form.setFieldsValue({ other: staff?.other });
    setFileList([
      {
        uid: staff?.uid,
        name: staff?.name,
        status: "done",
        url: staff?.image
      }
    ]);
  }, [staff]);

  const onFinish = async (values) => {
    if (fileList.length === 0) {
      message.error("ကျေးဇူးပြု၍၀န်ထမ်:ပုံထည့်ပါ");
    }
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("code", values.code);
    formData.append("dob", values.dob);
    formData.append("start_work", values.start_work);
    formData.append("phone", values.phone);
    formData.append("salary", values.salary);
    formData.append("address", values.address);
    formData.append("position", values.position);
    formData.append("other", values.other);
    if (fileList[0].status !== "done") {
      formData.append("image", fileList[0].originFileObj);
    }
    await editStaffs(param?.id, formData);
    navigate("/admin/show-staff");
  };

  return (
    <Spin spinning={status.loading}>
      <Layout style={{ margin: "20px" }}>
        <Space direction="vertical" size="middle">
          <Title style={{ textAlign: "center" }} level={3}>
            ၀န်ထမ်းစာရင်းးပြုပြင်ရန်စာမျက်နှာ
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
            >
              <InputUpload fileList={fileList} setFileList={setFileList} />
              <Text type="secondary">ကျေးဇူးပြု၍၀န်ထမ်းဓါတ်ပုံထည့်ပါ</Text>
            </Space>
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
              name="code"
              label="ကုတ်"
              rules={[
                {
                  required: true,
                  message: "ကျေးဇူးပြု၍ ကုတ် ထည့်ပါ"
                }
              ]}
            >
              <Input
                placeholder=" ကုတ် ထည့်ပါ"
                prefix={<EditOutlined />}
                style={{ borderRadius: "10px" }}
                size="large"
              />
            </Form.Item>
            <Form.Item
              format="DD/MM/YYYY"
              name="dob"
              label="မွေးသက္ကရာဇ်"
              rules={[
                {
                  required: true,
                  message: "ကျေးဇူးပြု၍ မွေးသက္ကရာဇ်ထည့်ပါ"
                }
              ]}
            >
              <Input
                placeholder="မွေးသက္ကရာဇ်ထည့်ပါ"
                prefix={<EditOutlined />}
                style={{ borderRadius: "10px" }}
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="start_work"
              label="အလုပ်စဝင်သောနေ့"
              rules={[
                {
                  required: true,
                  message: "ကျေးဇူးပြု၍ အလုပ်စဝင်သောနေ့ထည့်ပါ"
                }
              ]}
            >
              <Input
                placeholder="အလုပ်စဝင်သောနေ့ထည့်ပါ"
                prefix={<EditOutlined />}
                style={{ borderRadius: "10px", width: "100%" }}
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
                style={{ borderRadius: "10px", width: "100%" }}
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="salary"
              label="လခ"
              rules={[
                {
                  required: true,
                  message: "ကျေးဇူးပြု၍ လခထည့်ပါ"
                }
              ]}
            >
              <Input
                placeholder="လခထည့်ပါ"
                prefix={<EditOutlined />}
                style={{ borderRadius: "10px", width: "100%" }}
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="address"
              label="လိပ်စာ"
              rules={[
                {
                  required: true,
                  message: "ကျေးဇူးပြု၍ လိပ်စာထည့်ပါ"
                }
              ]}
            >
              <Input
                placeholder="လိပ်စာထည့်ပါ"
                prefix={<EditOutlined />}
                style={{ borderRadius: "10px", width: "100%" }}
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="position"
              label="ရာထူး"
              rules={[
                {
                  required: true,
                  message: "ကျေးဇူးပြု၍ ရာထူးထည့်ပါ"
                }
              ]}
            >
              <Input
                placeholder="ရာထူးထည့်ပါ"
                prefix={<EditOutlined />}
                style={{ borderRadius: "10px", width: "100%" }}
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

export default connect(null, { editStaffs, getStaff })(EditStaff);
