import React, { useRef, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Row, Col, Modal, Button } from 'antd';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import moment from 'moment';
import { getStudent, getJob, getCompany, jobDetail } from '@/services/ant-design-pro/api';
import styles from './Welcome.less';

const Welcome: React.FC = () => {
  const tableRef = useRef<ActionType>();
  const [flag, setFlag] = useState<boolean>(false);
  const [companyFlag, setCompanyFlag] = useState<boolean>(false);
  const [jobFlag, setJobFlag] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [jobInfo, setJobInfo] = useState<{ label: string; value: string | number | undefined }[]>();
  const getInfoDetail = async (row: any) => {
    try {
      const { id, jobId } = row;
      const res = await jobDetail({ id, jobId });
      setJobInfo([
        {
          label: '职位名称：',
          value: res.results.jobName,
        },
        {
          label: '职位id：',
          value: res.results.jobId,
        },
        {
          label: '公司名：',
          value: res.results.companyName,
        },
        {
          label: '公司id：',
          value: res.results.id,
        },
        {
          label: '状态：',
          value: res.results.status ? '已上线' : '已下线',
        },
        {
          label: '职位更新时间：',
          value: moment(res.results.updateTime).format('YYYY-MM-DD'),
        },
      ]);
      setVisible(true);
    } catch (error) {
      console.error('getInfoDetail error=', error);
    }
  };
  // 定义列
  const columns: ProColumns<API.HistoryListItem>[] = [
    {
      title: '学生账号',
      dataIndex: 'studentAccount',
      search: false,
      width: 300,
      hideInTable: flag,
    },
    {
      title: '公司账号',
      dataIndex: 'companyAccount',
      search: false,
      width: 300,
      hideInTable: companyFlag,
    },
    {
      title: '职位名称',
      dataIndex: 'jobName',
      search: false,
      width: 300,
      hideInTable: jobFlag,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      search: false,
      width: 300,
      hideInTable: flag,
    },
    {
      title: '公司名',
      dataIndex: 'companyName',
      search: false,
      width: 500,
      hideInTable: companyFlag,
    },
    {
      title: '操作记录',
      dataIndex: 'operationDescription',
      search: false,
      width: 300,
    },
    {
      title: '操作时间',
      dataIndex: 'time',
      valueType: 'date',
      width: 300,
    },
    {
      title: '类别',
      dataIndex: 'type',
      valueEnum: {
        '1': { text: '学生' },
        '2': { text: '公司' },
        '3': { text: '职位' },
      },
      initialValue: '学生',
      hideInTable: true,
    },
    {
      title: '操作',
      dataIndex: 'opt',
      width: 240,
      key: 'action',
      valueType: 'option',
      render: (_, row) => {
        return (
          <div>
            <a onClick={() => getInfoDetail(row)}>查看</a>
          </div>
        );
      },
      hideInTable: jobFlag,
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.HistoryListItem>
        actionRef={tableRef}
        rowKey="time"
        columns={columns}
        request={async (params: any) => {
          const { pageSize, current, time, type } = params;
          let res: API.StudentResults = {};
          if (type === '学生' || type === '1') {
            setCompanyFlag(true);
            setJobFlag(true);
            setFlag(false);
            res = await getStudent({ page: current, size: pageSize, time });
          } else if (type === '2') {
            setCompanyFlag(false);
            setJobFlag(true);
            setFlag(true);
            res = await getCompany({ page: current, size: pageSize, time });
          } else if (type === '3') {
            setFlag(true);
            setJobFlag(false);
            setCompanyFlag(false);
            res = await getJob({ page: current, size: pageSize, time });
          }
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
        title="职位详情"
        width={548}
        onCancel={() => setVisible(false)}
        footer={
          <Button type="primary" onClick={() => setVisible(false)}>
            关闭
          </Button>
        }
        className={styles.applyModal}
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

export default Welcome;
