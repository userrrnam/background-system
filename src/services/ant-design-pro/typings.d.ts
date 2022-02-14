// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    name?: string;
    loginTime?: string;
    adminAccount?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  type LoginResult = {
    results?: {
      token?: string;
    };
    status?: string;
    type?: string;
    currentAuthority?: string;
    flag?: number;
  };
  type StudentParams = {
    page: number;
    size: number;
    time?: string;
    studentAccount?: string;
    status?: boolean;
    phone?: string;
    email?: string;
  };
  type StudentResults = {
    results?: {
      studentAccount?: string;
      name?: string;
      operationDescription?: string;
      time?: string;
    };
    totalCount?: number;
  };
  type CompanyParams = {
    page: number;
    size: number;
    time?: string;
  };
  type CompanyJobParams = {
    page?: number;
    size?: number;
    id?: number;
  };
  type CompanyResults = {
    results?: {
      companyAccount?: string;
      companyName?: string;
      operationDescription?: string;
      time?: string;
    };
    totalCount?: number;
  };
  type JobParams = {
    page: number;
    size: number;
    time?: string;
  };
  type JobResults = {
    results?: {
      companyAccount?: string;
      companyName?: string;
      operationDescription: string;
      time?: string;
      jobName?: string;
      jobId?: number;
      id?: number; //(公司id）
    };
  };
  type JobDetailParams = {
    id?: number;
    jobId?: number;
  };
  type JobDetailResult = {
    results: {
      companyName?: string;
      id?: number;
      jobName?: string;
      jobId?: number;
      updateTime?: string;
      status?: boolean;
      city: string;
    };
  };
  type UpdateStudentParams = {
    id?: number;
    studentAccount?: string;
  };
  type HistoryListItem = {
    studentAccount?: string;
    comanyAccount?: string;
    companyName?: string;
    name?: string;
    operationDescription?: string;
    status?: boolean;
    adminStatus?: boolean;
  };
  type AdminInfo = {
    adminAccount?: string;
    phone?: string;
    email?: string;
    createTime?: string;
    loginTime?: string;
  };
  type AdminParams = {
    adminAccount?: string;
    phone?: string;
    email?: string;
  };
  type PageParams = {
    current?: number;
    pageSize?: number;
  };
  type RegisterResult = {
    status?: string;
  };
  type Register = {
    username?: string;
    password?: string;
  };
  type RegisterParams = {
    username?: string;
    password?: string;
  };
  type SelectName = {
    username?: string;
  };
  type SelectNameResult = {
    status?: string;
  };
  type PassWrodParams = {
    password?: string;
  };
  type SelectNameParams = {
    username?: string;
  };
  type AddCompanyParams = {
    companyName?: string;
    details?: string;
    address?: string;
    email?: string;
  };
  type ActionParams = {
    id?: number;
    companyName?: string;
  };
  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };

  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    adminAccount?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
