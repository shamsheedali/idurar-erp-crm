import { ErpLayout } from '@/layout';
import { erp } from '@/redux/erp/actions';
import { selectItemById, selectCurrentItem } from '@/redux/erp/selectors';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Divider, Form, Row } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import { CloseCircleOutlined, PlusOutlined } from '@ant-design/icons';

import AddNoteForm from '@/forms/AddNoteForm';
import useLanguage from '@/locale/useLanguage';
import { generate as uniqueId } from 'shortid';

export default function QueryAddNoteModule({ config }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const translate = useLanguage();
  const { entity, ENTITY_NAME } = config;

  const item = useSelector(selectItemById(id));
  const { result: currentResult } = useSelector(selectCurrentItem);

  const [form] = Form.useForm();

  useEffect(() => {
    if (item) {
      dispatch(erp.currentItem({ data: item }));
    } else {
      dispatch(erp.read({ entity, id }));
    }
  }, [id]);

  const currentErp = currentResult;

  const onSubmit = (fieldsValue) => {
    console.log('🚀 ~ onSubmit ~ fieldsValue:', fieldsValue);
    dispatch(erp.create({ entity: entity + `/${id}/notes` , jsonData: fieldsValue }));
    navigate(`/${entity}`)
  };

  return (
    <ErpLayout>
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <PageHeader
            onBack={() => navigate(`/${entity}`)}
            title={`${translate('Add Note for')} ${ENTITY_NAME} #${currentErp?.number ?? ''}`}
            ghost={false}
            extra={[
              <Button
                key={uniqueId()}
                onClick={() => navigate(`/${entity}`)}
                icon={<CloseCircleOutlined />}
              >
                {translate('Cancel')}
              </Button>,
            ]}
            style={{ padding: '20px 0px' }}
          />
          <Divider dashed />
        </Col>
      </Row>

      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Form form={form} layout="vertical" onFinish={onSubmit} style={{ width: '100%' }}>
            <AddNoteForm />
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
                {translate('Save Note')}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </ErpLayout>
  );
}
