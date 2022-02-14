import React, { useRef, useState } from 'react';
import {
  selectCompany,
  newCompanyAccount,
  updataCompPass,
  forbidCompany,
  selectJobList,
  forbidJob,
  compJobDetail,
} from '@/services/ant-design-pro/api';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Modal, Form, Input, message, Row, Col } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import styles from './index.less';
const { confirm } = Modal;
const CompanyManager: React.FC = () => {
  const tableRef = useRef<ActionType>();
  const tableSonRef = useRef<ActionType>();
  const [visible, setVisible] = useState<boolean>(false);
  const [jobInfo, setJobInfo] = useState<any>();
  const [flag, setFlag] = useState<boolean>(false);
  const [form] = Form.useForm();

  //禁用公司账号
  const changeStatus = async (row: any) => {
    try {
      confirm({
        title: '提示',
        icon: <ExclamationCircleOutlined />,
        content: '确定这么做吗?',
        maskClosable: true,
        onOk: async () => {
          const { id } = row;
          await forbidCompany({ id });
          message.success('操作成功');
          tableRef.current?.reload();
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  const changePassword = async (row: any) => {
    try {
      confirm({
        title: '提示',
        icon: <ExclamationCircleOutlined />,
        content: '确定这么做吗?',
        maskClosable: true,
        onOk: async () => {
          const { id, companyName } = row;
          await updataCompPass({ id, companyName });
          message.success('操作成功');
          tableRef.current?.reload();
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  //
  const onFinish = async (values: any) => {
    try {
      await newCompanyAccount({ ...values });
      form.resetFields();
      message.success('添加成功');
      setVisible(false);
      tableRef.current?.reload();
    } catch (error) {
      console.error(error);
    }
  };
  const cancelSubmit = () => {
    setVisible(false);
    form.resetFields();
  };
  const changeJobStatus = async (row: any) => {
    console.log(row);
    try {
      confirm({
        title: '提示',
        icon: <ExclamationCircleOutlined />,
        content: '确定这么做吗?',
        maskClosable: true,
        onOk: async () => {
          const { id, jobId } = row;
          await forbidJob({ id, jobId });
          message.success('操作成功');
          tableSonRef.current?.reload();
        },
      });
    } catch (error) {
      console.error(`${error}`);
    }
  };
  //查看职位详情
  const getJobInfo = async (row: any) => {
    try {
      const { id, jobId } = row;
      const { results: res } = await compJobDetail({ id, jobId });
      if (res) {
        setFlag(true);
        setJobInfo([
          {
            label: '职位名称：',
            value: res.jobName,
          },
          {
            label: '职位类型：',
            value: res.jobType || '不限',
          },
          {
            label: '结算类型：',
            value: res.calculate,
          },
          {
            label: '招聘人数：',
            value: res.recruitingNumber,
          },
          {
            label: '薪资：',
            value: `${res.salary} 元/天`,
          },
          {
            label: '创建时间：',
            value: res.createTime,
          },
          {
            label: '更新时间：',
            value: res.updateTime,
          },
          {
            label: '工作详情：',
            value: res.details,
          },
          {
            label: '状态：',
            value: res.status ? '已上线' : '已下线',
          },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //定义列(公司)
  const columns: ProColumns<API.HistoryListItem>[] = [
    {
      title: '账号',
      dataIndex: 'companyAccount',
      search: false,
      width: 200,
    },
    {
      title: '公司名',
      dataIndex: 'companyName',
      width: 300,
    },
    {
      title: '地址',
      dataIndex: 'address',
      width: 400,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'date',
      width: 200,
    },
    {
      title: '状态',
      dataIndex: 'status',
      hideInTable: true,
      valueEnum: {
        '': { text: '全部' },
        true: { text: '禁用' },
        false: { text: '启用' },
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      width: 400,
      search: false,
      render: (_, row) => {
        return (
          <div className={styles.action}>
            <a onClick={() => changeStatus(row)}>{row.status ? '禁用' : '启用'}</a>
            <a onClick={() => changePassword(row)}>重置密码</a>
          </div>
        );
      },
    },
  ];
  const columnsJob: ProColumns<API.HistoryListItem>[] = [
    {
      title: '职位名称',
      dataIndex: 'jobName',
      width: 300,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 300,
    },
    {
      title: '操作',
      dataIndex: 'action',
      search: false,
      render: (_, row) => {
        return (
          <div className={styles.action}>
            <a onClick={() => changeJobStatus(row)}>{row.adminStatus ? '禁用' : '启用'}</a>
            <a onClick={() => getJobInfo(row)}>查看</a>
          </div>
        );
      },
    },
  ];
  const expandedRowRender = (row: any) => {
    return (
      <ProTable
        rowKey="jobId"
        columns={columnsJob}
        headerTitle={false}
        actionRef={tableSonRef}
        params={row}
        request={async (params: any) => {
          const { pageSize, current, id } = params;
          const res = await selectJobList({ page: current, size: pageSize, id });
          res.results.forEach((vals: any) => {
            vals.id = id;
          });
          const matterResults: API.HistoryListItem[] = res.results;
          return {
            data: matterResults,
            success: true,
            total: res.totalCount,
          };
        }}
        search={false}
        options={false}
      />
    );
  };
  return (
    <PageContainer>
      <ProTable
        actionRef={tableRef}
        rowKey="id"
        columns={columns}
        request={async (params: any) => {
          const { pageSize, current, ...data } = params;
          const res = await selectCompany({ page: current, size: pageSize, ...data });
          const matterResults: API.HistoryListItem[] = res.results;
          return {
            data: matterResults,
            success: true,
            total: res.totalCount,
          };
        }}
        headerTitle={
          <Button
            key="primary"
            type="primary"
            onClick={() => {
              setVisible(true);
            }}
          >
            添加
          </Button>
        }
        expandable={{ expandedRowRender }}
      />
      <Modal
        visible={visible}
        title="公司账号"
        width={548}
        onCancel={() => setVisible(false)}
        footer={false}
        className={styles.applyModal}
      >
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="公司名称"
            name="companyName"
            rules={[{ required: true, message: '请输入公司名!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="邮箱" name="email" rules={[{ required: true, type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="公司地址"
            name="address"
            rules={[{ required: true, message: '请输入公司地址!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="公司简介"
            name="details"
            rules={[{ required: true, message: '请输入公司简介!' }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 16, span: 16 }}>
            <Button onClick={cancelSubmit} style={{ marginRight: '10px' }}>
              取消
            </Button>
            <Button type="primary" htmlType="submit">
              添加
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        visible={flag}
        title="职位详情"
        width={548}
        onCancel={() => setFlag(false)}
        className={styles.applyModal}
        footer={
          <Button type="primary" onClick={() => setFlag(false)}>
            关闭
          </Button>
        }
      >
        {jobInfo?.map((job: any) => {
          return (
            <Row className={styles.fixedItem} key={job.label}>
              <Col span={6} className={styles.itemLabel}>
                {job.label}
              </Col>
              <Col span={16}>{job.value}</Col>
            </Row>
          );
        })}
      </Modal>
    </PageContainer>
  );
};

export default CompanyManager;
