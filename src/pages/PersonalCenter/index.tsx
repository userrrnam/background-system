import React, { useEffect, useState } from 'react';
import { Card, Form, Input, Button, Modal, message } from 'antd';
import {
  getAdminInfo,
  updateAdmin,
  validatorOldPass,
  updatePassword,
} from '@/services/ant-design-pro/api';
import md5 from 'js-md5';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;
const PersonalCenter: React.FC = () => {
  const [activeTabKey1, setActiveTabKey1] = useState<string>('tab1');
  const [form] = Form.useForm();
  const [forms] = Form.useForm();
  useEffect(() => {
    (async () => {
      const { results: res } = await getAdminInfo();
      if (res) {
        form.setFieldsValue(res);
      }
    })();
  }, []);
  const tabList = [
    {
      key: 'tab1',
      tab: '基本信息',
    },
    {
      key: 'tab2',
      tab: '修改密码',
    },
  ];
  const onFinish = (vals: any) => {
    try {
      const { adminAccount, phone, email } = vals;
      confirm({
        title: '提示',
        icon: <ExclamationCircleOutlined />,
        content: '确定修改吗?',
        maskClosable: true,
        onOk: async () => {
          await updateAdmin({ adminAccount, phone, email });
          message.success('修改成功');
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  const changePass = async (vals: any) => {
    try {
      const { oldPassword, newPassword } = vals;
      const { results: res } = await validatorOldPass({ password: md5(oldPassword) });
      if (res) {
        await updatePassword({ password: md5(newPassword) });
        message.success('修改成功');
        forms.resetFields();
      } else {
        message.error('原密码错误');
      }
    } catch (error) {}
  };
  const contentList = {
    tab1: (
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 10 }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item label="账号" name="adminAccount" rules={[{ required: true }]}>
          <Input disabled />
        </Form.Item>
        <Form.Item label="邮箱" name="email" rules={[{ required: true, type: 'email' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="电话" name="phone" rules={[{ required: true, message: '请输入手机号!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="创建时间" name="createTime">
          <Input disabled />
        </Form.Item>
        <Form.Item label="登录时间" name="loginTime">
          <Input disabled />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit">
            修改
          </Button>
        </Form.Item>
      </Form>
    ),
    tab2: (
      <Form
        name="basic"
        form={forms}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 10 }}
        onFinish={changePass}
        autoComplete="off"
      >
        <Form.Item
          label="原密码"
          name="oldPassword"
          rules={[
            {
              required: true,
              message: '请输入原密码!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="新密码"
          name="newPassword"
          rules={[
            {
              required: true,
              message: '请输入新密码!',
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="二次确认"
          name="checkPassword"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: '输入二次确认密码!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('与新密码不匹配!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
          <Button type="primary" htmlType="submit">
            修改
          </Button>
        </Form.Item>
      </Form>
    ),
  };
  const onTab1Change = (key: any) => {
    setActiveTabKey1(key);
  };
  return (
    <>
      <Card
        style={{ width: '100%' }}
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={(key) => {
          onTab1Change(key);
        }}
      >
        {contentList[activeTabKey1]}
      </Card>
    </>
  );
};

export default PersonalCenter;
