import React from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import useLanguage from '@/locale/useLanguage';

export default function AddNoteForm() {
  const translate = useLanguage();
  const { TextArea } = Input;

  return (
    <>
      <Row>
        <Col span={24}>
          <h4>{translate('Notes')}</h4>
        </Col>
      </Row>

      <Form.List name="notes">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <Row gutter={[8, 8]} key={field.key} align="middle">
                <Col span={22}>
                  <Form.Item
                    {...field}
                    name={[field.name, 'text']}
                    fieldKey={[field.fieldKey, 'text']}
                    rules={[{ required: true, message: translate('Note is required') }]}
                  >
                    <TextArea rows={2} placeholder={translate('Enter a note')} />
                  </Form.Item>
                </Col>
                <Col span={2}>
                  <Button
                    type="text"
                    danger
                    icon={<MinusCircleOutlined />}
                    onClick={() => remove(field.name)}
                  />
                </Col>
              </Row>
            ))}

            <Row>
              <Col span={24}>
                <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />} block>
                  {translate('Add Note')}
                </Button>
              </Col>
            </Row>
          </>
        )}
      </Form.List>
    </>
  );
}
