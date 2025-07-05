import { useEffect, useState } from 'react';
import { Form, Input, InputNumber, Select, DatePicker, Button, Row, Col } from 'antd';
import dayjs from 'dayjs';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

import AutoCompleteAsync from '@/components/AutoCompleteAsync';
import useLanguage from '@/locale/useLanguage';
import { useDate } from '@/settings';
import { useSelector } from 'react-redux';
import { selectFinanceSettings } from '@/redux/settings/selectors';

export default function QueryForm({ current = null }) {
  const translate = useLanguage();
  const { dateFormat } = useDate();
  const { last_query_number } = useSelector(selectFinanceSettings) || {};

  const [currentDate, setCurrentDate] = useState(dayjs());
  const [currentNumber, setCurrentNumber] = useState(1);

  useEffect(() => {
    if (current) {
      setCurrentNumber(current.number || 1);
      setCurrentDate(dayjs(current.created) || dayjs());
    } else {
      if (last_query_number !== undefined) {
        setCurrentNumber(last_query_number + 1);
      }
    }
  }, [current, last_query_number]);

  return (
    <>
      <Row gutter={[12, 0]}>
        <Col span={8}>
          <Form.Item name="client" label={translate('Client')} rules={[{ required: true }]}>
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

        {!current && (
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
        )}
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
          <Form.Item name="resolution" label={translate('Resolution')}>
            <Input.TextArea rows={4} />
          </Form.Item>
        </Col>
      </Row>

      {/* Notes Section */}
      <Row gutter={[12, 0]}>
        <Col span={24}>
          <Form.List name="notes">
            {(fields, { add, remove }) => (
              <>
                <Row>
                  <Col span={24}>
                    <h4>{translate('Notes')}</h4>
                  </Col>
                </Row>

                {fields.map((field) => (
                  <Row key={field.key} gutter={12} align="middle">
                    <Col span={22}>
                      <Form.Item
                        {...field}
                        name={[field.name, 'text']}
                        fieldKey={[field.fieldKey, 'text']}
                        rules={[{ required: true, message: translate('Note is required') }]}
                      >
                        <Input.TextArea rows={2} placeholder={translate('Enter a note')} />
                      </Form.Item>
                    </Col>
                    <Col span={2}>
                      <Button
                        danger
                        icon={<MinusCircleOutlined />}
                        onClick={() => remove(field.name)}
                      />
                    </Col>
                  </Row>
                ))}

                <Row>
                  <Col span={24}>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                      {translate('Add Note')}
                    </Button>
                  </Col>
                </Row>
              </>
            )}
          </Form.List>
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
