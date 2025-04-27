import React, { useRef, useState } from 'react';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Collapse, message, Space, Tag } from 'antd';
import {
  deleteQuestion,
  listQuestionByPage,
} from '@/services/onlinejudge-backend/questionController';
import { ClockCircleOutlined, DatabaseOutlined, DeploymentUnitOutlined } from '@ant-design/icons';
import Typography from 'antd/lib/typography';
import './index.css';
import { history } from '@umijs/max';
import TagInput from '@/pages/Question/AddQuestion/components/TagInput';

interface questionParams {
  title?: string;
  tags?: string[];
}

/**
 * 题目管理页面 （管理员）
 * @constructor
 */
const QuestionManage = () => {
  const actionRef = useRef<ActionType>();
  const [questionParams, setQuestionParams] = useState<questionParams>({
    title: '',
    tags: [],
  });

  /**
   * 删除题目
   * @param row
   */
  const handleDelete = async (row: API.Question) => {
    const hide = message.loading('正在删除');
    if (!row) {
      return true;
    }
    try {
      await deleteQuestion({
        id: row.id,
      });
      hide();
      message.success('删除成功');
      //重新加载表格
      actionRef.current?.reload();
      return true;
    } catch (error: any) {
      hide();
      message.error('删除失败' + error.message);
      return false;
    }
  };

  /**
   * 表格列配置
   */
  const columns: ProColumns<API.Question>[] = [
    {
      title: '题目ID',
      dataIndex: 'id',
      valueType: 'index',
      hideInSearch: true,
    },
    {
      title: '题目',
      dataIndex: 'title',
      valueType: 'text',
    },
    {
      title: '标签',
      dataIndex: 'tags',
      render: (_, record) => {
        if (record?.tags) {
          const cleanTags = record?.tags.replace(/[\\[\]"]/g, '');
          const tags = cleanTags
            .split(',')
            .map((tag) => tag.trim())
            .filter(Boolean);
          if (tags.length === 0) return '-';
          return (
            <Space size={4}>
              {tags.map((tag, index) => (
                <Tag key={index} color={'green'} style={{ margin: '2px 4px 2px 0' }}>
                  {tag.trim()}
                </Tag>
              ))}
            </Space>
          );
        }
        return null;
      },
      renderFormItem: () => {
        return <TagInput />;
      },
    },
    {
      title: '通过数',
      dataIndex: 'acceptedNum',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '提交数',
      dataIndex: 'submitNum',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '判题配置',
      dataIndex: 'judgeConfig',
      render: (_, record) => {
        if (record.judgeConfig !== undefined) {
          const limits = JSON.parse(record.judgeConfig);
          return (
            <Space size={6} direction="vertical">
              <Tag icon={<ClockCircleOutlined />} color="blue">
                时间: {limits.timeLimit}ms
              </Tag>
              <Tag icon={<DatabaseOutlined />} color="geekblue">
                内存: {limits.memoryLimit}kb
              </Tag>
              <Tag icon={<DeploymentUnitOutlined />} color="cyan">
                堆栈: {limits.stackLimit}kb
              </Tag>
            </Space>
          );
        }
        return <Tag color="error">数据格式错误</Tag>;
      },
      hideInSearch: true,
    },
    {
      title: '判题用例',
      dataIndex: 'judgeCase',
      render: (_, record) => {
        if (record.judgeCase !== undefined) {
          const cases = JSON.parse(record.judgeCase);
          return (
            <Collapse ghost size="small">
              {cases.map((item: any, index: number) => (
                <Collapse.Panel key={index} header={<Tag color="#2db7f5">用例{index}</Tag>}>
                  <Space direction="vertical" style={{ width: '100%' }}>
                    <div className="io-block input-block">
                      <Tag color="blue">输入</Tag>
                      <pre>{item.input}</pre>
                    </div>
                    <div className="io-block output-block">
                      <Tag color="#87d068">输出</Tag>
                      <pre>{item.output}</pre>
                    </div>
                  </Space>
                </Collapse.Panel>
              ))}
            </Collapse>
          );
        }
        return <Tag color="error">格式错误</Tag>;
      },
      hideInSearch: true,
    },
    {
      title: '创建人',
      dataIndex: 'userId',
      valueType: 'text',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => (
        <Space size={'middle'}>
          <Typography.Link
            key={'update'}
            onClick={() => {
              history.push(`/update/question/${record.id}`);
            }}
          >
            修改
          </Typography.Link>
          <Typography.Link
            type={'danger'}
            key={'delete'}
            onClick={() => {
              handleDelete(record).then();
            }}
          >
            删除
          </Typography.Link>
        </Space>
      ),
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.Question, API.QuestionQueryRequest>
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        pagination={{
          pageSize: 10,
        }}
        params={questionParams}
        onSubmit={(params) => {
          const { title, tags } = params;
          setQuestionParams((prevState) => {
            return {
              ...prevState,
              title: title || '',
              tags: tags || ([] as string[]),
            };
          });
          actionRef.current?.reload();
        }}
        request={async (params) => {
          const res = await listQuestionByPage(params);
          if (res.data) {
            return {
              data: res.data.records,
              success: true,
              total: res.data.total,
            };
          } else {
            return {
              data: [],
              success: false,
              total: 0,
            };
          }
        }}
        columns={columns}
      />
    </PageContainer>
  );
};

export default QuestionManage;
