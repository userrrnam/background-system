import React, { useRef, useState } from 'react';
import ProTable from '@ant-design/pro-table';
import { PageContainer } from '@ant-design/pro-layout';
import { Row, message, Col, Modal, Button } from 'antd';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {
  selectStudent,
  updataStudentStatus,
  selectStudentInfo,
  resetPassword,
} from '@/services/ant-design-pro/api';
import styles from './index.less';
const { confirm } = Modal;
const StudentManager: React.FC = () => {
  const [studentInfo, setStudentInfo] = useState<any>();
  const tableRef = useRef<ActionType>();
  const [visible, setVisible] = useState<boolean>(false);
  // 查看详情
  const getInfoDetail = async (row: any) => {
    try {
      const res = await selectStudentInfo({ id: row.id });
      if (res.results) {
        setVisible(true);
        const { results: stu } = res;
        setStudentInfo([
          {
            label: '账号:',
            value: stu.studentAccount,
          },
          {
            label: '姓名:',
            value: stu.name,
          },
          {
            label: '性别:',
            value: stu.name ? '女' : '男',
          },
          {
            label: '年龄:',
            value: stu.age,
          },
          {
            label: '电话:',
            value: stu.phone,
          },
          {
            label: '邮箱:',
            value: stu.email,
          },
          {
            label: '账号注册时间:',
            value: stu.createTime,
          },
          {
            label: '最后登录时间:',
            value: stu.loginTime,
          },
          {
            label: '期望职业类型:',
            value: stu.occupation,
          },
          {
            label: '期望结算类型:',
            value: stu.calculate,
          },
          {
            label: '账号状态:',
            value: stu.status ? '已启用' : '已禁用',
          },
          {
            label: '个人介绍:',
            value: stu.details,
          },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  //禁用/启用
  const changeStatus = async (row: any) => {
    try {
      confirm({
        title: '提示',
        icon: <ExclamationCircleOutlined />,
        content: '确定这么做吗?',
        maskClosable: true,
        onOk: async () => {
          await updataStudentStatus({ id: row.id });
          message.success('修改成功');
          tableRef.current?.reload();
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  //重置密码
  const changePassword = async (row: any) => {
    try {
      confirm({
        title: '提示',
        icon: <ExclamationCircleOutlined />,
        content: '确定这么做吗?',
        maskClosable: true,
        onOk: async () => {
          const res = await resetPassword({ id: row.id, studentAccount: row.studentAccount });
          if (res) {
            message.success('操作成功');
          }
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  // 定义列
  const columns: ProColumns<API.HistoryListItem>[] = [
    {
      title: '学生账号',
      dataIndex: 'studentAccount',
      width: 200,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: '电话',
      dataIndex: 'phone',
      width: 200,
    },
    {
      title: '登录时间',
      dataIndex: 'loginTime',
      search: false,
      width: 300,
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
            <a onClick={() => getInfoDetail(row)}>查看</a>
          </div>
        );
      },
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.HistoryListItem>
        actionRef={tableRef}
        rowKey="id"
        columns={columns}
        request={async (params: any) => {
          const { pageSize, current, ...data } = params;
          const res = await selectStudent({ page: current, size: pageSize, ...data });
          const matterResults: API.HistoryListItem[] = res.results;
          return {
            data: matterResults,
            success: true,
            total: res.totalCount,
          };
        }}
        toolBarRender={false}
      />
      <Modal
        visible={visible}
        title="学生个人信息"
        width={548}
        onCancel={() => setVisible(false)}
        footer={
          <Button type="primary" onClick={() => setVisible(false)}>
            关闭
          </Button>
        }
        className={styles.applyModal}
      >
        {studentInfo?.map((job: any) => {
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
export default StudentManager;
