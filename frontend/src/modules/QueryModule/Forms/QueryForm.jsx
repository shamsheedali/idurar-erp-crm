import { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Select, DatePicker, Button, Row, Col } from 'antd';
import dayjs from 'dayjs';
import { PlusOutlined } from '@ant-design/icons';

import AutoCompleteAsync from '@/components/AutoCompleteAsync';
import useLanguage from '@/locale/useLanguage';
import { useDate } from '@/settings';

export default function QueryForm({ current = null }) {
  const translate = useLanguage();
  const { dateFormat } = useDate();

  const [currentDate, setCurrentDate] = useState(dayjs());
  const [currentNumber, setCurrentNumber] = useState(1);

  useEffect(() => {
    if (current) {
      setCurrentNumber(current.number || 1);
      setCurrentDate(dayjs(current.created) || dayjs());
    }
  }, [current]);

  return (
    <>
      <Row gutter={[12, 0]}>
        <Col span={8}>
          <Form.Item
            name="client"
            label={translate('Client')}
            rules={[{ required: true }]}
          >
            <AutoCompleteAsync
              entity="client"
              displayLabels={['name']}
              searchFields="name"
              redirectLabel={translate('Add New Client')}
              withRedirect
              urlToRedirect="/customer"
            />
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item
            label={translate('Number')}
            name="number"
            initialValue={currentNumber}
            rules={[{ required: true }]}
          >
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            name="status"
            label={translate('Status')}
            initialValue="Open"
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { label: 'Open', value: 'Open' },
                { label: 'Inprogress', value: 'Inprogress' },
                { label: 'Closed', value: 'Closed' },
              ]}
            />
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item
            name="created"
            label={translate('Created Date')}
            initialValue={currentDate}
            rules={[{ required: true, type: 'object' }]}
          >
            <DatePicker style={{ width: '100%' }} format={dateFormat} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[12, 0]}>
        <Col span={24}>
          <Form.Item
            name="description"
            label={translate('Description')}
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            name="resolution"
            label={translate('Resolution')}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Col>
      </Row>

      <Row justify="start">
        <Col span={4}>
          <Form.Item>
            <Button type="primary" htmlType="submit" icon={<PlusOutlined />} block>
              {translate('Save')}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
}
