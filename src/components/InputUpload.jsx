import React, { useState } from "react";
import { Upload, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const uploadButton = (
  <div>
    <PlusOutlined />
    <div style={{ marginTop: "8px", color: "#666" }}>Upload</div>
  </div>
);

const InputUpload = ({ fileList, setFileList }) => {
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");

  const handleChange = ({ fileList }) => {
    setFileList([...fileList]);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("Please insert png or .jpg or jpeg");
      return false;
    }

    const isLt4M = file.size / 1024 / 1024 / 1024 / 1024 < 4;
    if (!isLt4M) {
      message.error("Image must smaller than 4MB!");
    }

    return false;
  };

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file) => {
    // console.log("input", file)
    setPreviewImage(file.thumbUrl);
    setPreviewVisible(true);
    setPreviewTitle(file.name);
  };

  return (
    <>
      <Upload
        accept={".jpg,.jpeg,.png"}
        listType="picture-card"
        fileList={fileList}
        beforeUpload={beforeUpload}
        onPreview={handlePreview}
        onChange={(event) => handleChange(event)}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      <Modal
        visible={previewVisible}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt={previewTitle} style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </>
  );
};

export default InputUpload;
