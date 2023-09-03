import React from 'react';
import { Badge, Button, Card, Col, Descriptions, Input, List, Popover, Radio, Row, Select, Table, Tag, Tooltip, Typography, message } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { AuthData } from '../../../../auth/AuthWrapper';

const ServiceCard = ({ title, desc, icon: Icon, to, color }) => {
  return (
    <Card bordered={false} className='hover:shadow-lg'>
      <Link to={to} className='flex items-center gap-4'>
        <div className={`flex items-center justify-center w-16 h-16 bg-${color || "gray-100"} rounded-full`}>
          <Icon style={{ fontSize: 30, color: '#fff' }} />
        </div>
        <div className="flex flex-col items-center justify-center">
          <Typography.Title level={4} style={{margin:0}}>{title}</Typography.Title>
          <Typography.Text>{desc}</Typography.Text>
        </div>
      </Link>
    </Card>
  )
}


const initialTableParams = {
  data: [],
  loading: false,
  tableParams: {
    pagination: {
      current: 1,
      pageSize: 10,
      total: 0,
      position: ['none', 'bottomCenter'],
      pageSizeOptions: [10, 20, 30, 40, 50, 100]
    },
  },
  search: '',
  draw: 1,
  fieldsAbleToSort: [],
  sort: { draw: 1, active: false, field: null, order: null }
};
const Dashboard = () => {
  const { apiUrl } = AuthData();
  const [numbers, setNumbers] = React.useState({ data:[], loading: true });
  const [companiesData, setCompaniesData] = React.useState(initialTableParams);

  const getNumbers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/GetHomeStats`);
      setNumbers({ data: response.data.data, loading: false });
    } catch (err) {
      message.error('حدث خطأ أثناء تحميل البيانات');
    }
  };
  const getCompanies = async (signal) => {
    const skipItems = companiesData.tableParams.pagination.pageSize * (companiesData.tableParams.pagination.current - 1);
    const takeItems = companiesData.tableParams.pagination.pageSize;
    try {
      setCompaniesData(prev => ({ ...prev, loading: true }));
      await axios.get(`${apiUrl}/GetCompanies?draw=${companiesData.draw}&start=${skipItems}&length=${takeItems}&search=${companiesData.search||""}&sort=${companiesData.sort.field||""}&order=${companiesData.sort.order||""}`, { signal: signal })
        .then((res) => {
          setCompaniesData(prev => ({
            ...prev,
            draw: prev.draw + 1,
            data: res.data?.data,
            fieldsAbleToSort: res.data?.fieldsAbleToSort,
            tableParams: {
              ...prev.tableParams,
              pagination: {
                ...prev.tableParams.pagination,
                // total: res.data.totalCount,
                total: prev.search && prev.search?.trim() != "" ? res.data.totalFiltered : res.data.totalCount,
              },
            },
          }));
        })
    } catch (error) {
      console.log(error.message);
    } finally {
      setCompaniesData(prev => ({ ...prev, loading: false }));
    }
  };


  React.useEffect(() => { getNumbers(); }, []);
  React.useEffect(() => {
    const abortController = new AbortController();
    getCompanies(abortController.signal);
    return () => {
      abortController.abort();
    };
  }, [companiesData.tableParams.pagination.current, companiesData.tableParams.pagination.pageSize, companiesData.search, companiesData.sort.active, companiesData.sort.draw]);

  const columns = [
    {
      title: '#المعرّف',
      dataIndex: 'guid',
      width: '15%',
      render: val => <div style={{direction:"ltr", textAlign:"center"}}><Tag color="default">{val}</Tag></div>
    },
    {
      title: 'إسم الشركة',
      dataIndex: 'name',
      width: '60%',
    },
    {
      title: 'الحالة',
      dataIndex: 'status',
      width: '15%',
      render: val =><div className='text-center'>{val ? <Tag color='success'>فعّالة</Tag> : <Tag color='error'>غير فعّالة</Tag>}</div>
    },
    {
      title: 'الإجراء',
      width: '10%',
      render: () => <Tooltip title="Coming Soon"><Button type='link'>تعديل</Button></Tooltip>,
    },
  ];

  const handleTableChange = (pagination, filters, sorter) => {
    setCompaniesData(prev => ({
      ...prev,
      tableParams: {
        ...prev.tableParams,
        pagination,
      },
    }));
  };


  const onSearch = (value) => {
    setCompaniesData(prev => ({ ...prev, search: value, tableParams: { ...prev.tableParams, pagination: { ...prev.tableParams.pagination, current: 1 } } }));
  };
  const onSort = () => {
    if (!companiesData.sort.field || !companiesData.sort.order || companiesData.sort.field === '' || companiesData.sort.order === '') {
      message.error('يجب إختيار حقل للترتيب');
      return;
    }
    setCompaniesData(prev => ({ ...prev, tableParams: { ...prev.tableParams, pagination: { ...prev.tableParams.pagination, current: 1 } }, sort: { ...prev.sort, active: true, draw: prev.sort.draw+1 } }));
  };

  const tableControles = (
    <div className='flex items-center flex-wrap justify-between gap-2'>
      <Input.Search
        placeholder="أكتب وإبحث"
        enterButton="بحث"
        className="max-w-[350px]"
        allowClear
        onSearch={onSearch}
      />

      <div>
        <Popover
          content={(
            <div className='flex flex-col gap-2'>
              <Radio.Group style={{display:"block"}} value={companiesData.sort.order} onChange={
                (e) => setCompaniesData(prev => ({ ...prev, sort: { ...prev.sort, order: e.target.value } }))
              }>
                <Radio.Button value="asc" className='w-1/2'>تصاعدي</Radio.Button>
                <Radio.Button value="desc" className='w-1/2'>تنازلي</Radio.Button>
              </Radio.Group>
              <Select 
                placeholder="إختر حقل"
                allowClear
                options={companiesData.fieldsAbleToSort.map((item) => ({ label: item, value: item }))} 
                value={companiesData.sort.field}
                onChange={(value) => setCompaniesData(prev => ({ ...prev, sort: { ...prev.sort, field: value } }))}
              />
              <Button type='primary' className='mt-2' onClick={onSort}>ترتيب</Button>
              <Button type='link' size='small' danger onClick={() => {
                setCompaniesData(prev => ({ ...prev, sort: { ...initialTableParams.sort } }));
              }}>إلغاء الترتيب</Button>
            </div>
          )}
          title="ترتيب البيانات"
          trigger="click"
          placement="bottomRight"
        >
          <Button type={companiesData.sort.active ? "primary" : "default"}>
            ترتيب حسب
          </Button>
        </Popover>
        <Tooltip title="Coming Soon">
          <Button type='primary' className='mr-2' disabled>تصدير</Button>
        </Tooltip>
      </div>
    </div>
  );

  
  return (
    <div>
      <div className='mb-8'>
        <Row gutter={[16, 16]}>
          {
            numbers.data.map(({ Count, label, description, color }, index) =>
              <Col xs={24} md={12} lg={8} key={index} className='h-full'>
                {/* <Card bordered={false} className={`border border-gray-200 border-b-4 border-b-${color} hover:border-${color}`}> */}
                <Card bordered={false} className={`border border-gray-200 border-b-4 border-b-sky-500 hover:border-sky-border-b-sky-500`}>
                  <Typography.Text type='secondary'>{label}</Typography.Text>
                  <Typography.Title style={{margin:0}} level={1}>{Count}</Typography.Title>
                  <Typography.Text type='secondary'>{description || " - "}</Typography.Text>
                </Card>
              </Col>
            )
          }
          {
            numbers.loading && <Col span={24}>
              <Card bordered={false}>
                جاري التحميل ...
              </Card>
            </Col>
          }
        </Row>
      </div>



      {/* <div className='mb-8'>
        <Typography.Title level={3}>قائمة الخدمات</Typography.Title>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ServiceCard
            title="إضافة شركة"
            icon={BsBuildingFillAdd}
            to="/new-company"
            color="teal-500"
          />
        </div>
      </div> */}


      <div>
        <Typography.Title level={3}>معلومات الشركات</Typography.Title>
        <div className='overflow-x-auto'>
          <Table
            columns={columns}
            dataSource={companiesData.data}
            pagination={companiesData.tableParams.pagination}
            loading={companiesData.loading}
            rowKey={(record) => record.guid}
            bordered
            size='large'
            onChange={handleTableChange}
            title={() => tableControles}
            expandable={{
              expandedRowRender: (record) => (
                <div className='flex flex-col gap-2'>
                  <Descriptions
                    title={record.name}
                    size='small'
                    bordered
                    layout='vertical'
                    column={{ xxl: 3, xl: 2, lg: 2, md: 2, sm: 1, xs: 1 }}
                  >
                    <Descriptions.Item label="#المعرف">{record.guid || "-"}</Descriptions.Item>
                    <Descriptions.Item label="الهاتف">{record.phone || "-"}</Descriptions.Item>
                    <Descriptions.Item label="العنوان">{record.address || "-"}</Descriptions.Item>
                    <Descriptions.Item label="إسم المفوض">{record.authorized_name || "-"}</Descriptions.Item>
                    <Descriptions.Item label="السمة التجارية">{record.brand || "-"}</Descriptions.Item>
                    <Descriptions.Item label="المحافضة">{record.governorate || "-"}</Descriptions.Item>
                    <Descriptions.Item label="رقم المشغل المرخص">{record.license_number || "-"}</Descriptions.Item>
                    <Descriptions.Item label="العضوية">{record.membership == "1" ? "هيئة عامة أساسية" : record.membership == "2" ? "مجلس إدارة" : record.membership == "3" ? "عضوية فخرية" : "-"}</Descriptions.Item>
                    <Descriptions.Item label="النوع">{record.type || "-"}</Descriptions.Item>
                    <Descriptions.Item label="الحالة">{record.status ? <Badge status="success" text="فعالة" /> : <Badge status="error" text="غير فعالة" />}</Descriptions.Item>
                  </Descriptions>
                  <Row gutter={[16, 16]}>
                    <Col xs={24} lg={12}>
                      <List
                        header={<div>أسماء الأعضاء</div>}
                        bordered
                        dataSource={record.members.map((item) => item.full_name)}
                        renderItem={(item) => <List.Item>{item}</List.Item>}
                      />
                    </Col>
                    <Col xs={24} lg={12}>
                      <List
                        header={<div>أسماء العمال</div>}
                        bordered
                        dataSource={record.workers.map((item) => item.full_name)}
                        renderItem={(item) => <List.Item>{item}</List.Item>}
                        
                      />
                    </Col>
                  </Row>
                </div>
              ),
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard