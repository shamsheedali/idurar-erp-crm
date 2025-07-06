import { useState, useEffect } from 'react';
import { Divider, Button, Row, Col, Descriptions, Statistic } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import {
  EditOutlined,
  FilePdfOutlined,
  CloseCircleOutlined,
  RetweetOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import useLanguage from '@/locale/useLanguage';
import { erp } from '@/redux/erp/actions';
import { generate as uniqueId } from 'shortid';
import { selectCurrentItem } from '@/redux/erp/selectors';
import { DOWNLOAD_BASE_URL } from '@/config/serverApiConfig';
import { useMoney, useDate } from '@/settings';
import useMail from '@/hooks/useMail';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const Item = ({ item, currentErp }) => {
  const { moneyFormatter } = useMoney();
  return (
    <Row gutter={[12, 0]} key={item._id}>
      <Col className="gutter-row" span={11}>
        <p style={{ marginBottom: 5 }}>
          <strong>{item.itemName}</strong>
        </p>
        <p>{item.description}</p>
      </Col>
      <Col className="gutter-row" span={4}>
        <p style={{ textAlign: 'right' }}>
          {moneyFormatter({ amount: item.price, currency_code: currentErp.currency })}
        </p>
      </Col>
      <Col className="gutter-row" span={4}>
        <p style={{ textAlign: 'right' }}>{item.quantity}</p>
      </Col>
      <Col className="gutter-row" span={5}>
        <p style={{ textAlign: 'right', fontWeight: '700' }}>
          {moneyFormatter({ amount: item.total, currency_code: currentErp.currency })}
        </p>
      </Col>
      <Divider dashed style={{ marginTop: 0, marginBottom: 15 }} />
    </Row>
  );
};

export default function ReadQuery({ config, selectedItem }) {
  const translate = useLanguage();
  const { entity, ENTITY_NAME } = config;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { moneyFormatter } = useMoney();
  const { send, isLoading: mailInProgress } = useMail({ entity });
  const { result: currentResult } = useSelector(selectCurrentItem);
  const { dateFormat } = useDate();

  const resetErp = {
    status: '',
    client: { name: '', email: '', phone: '', address: '' },
    subTotal: 0,
    taxTotal: 0,
    taxRate: 0,
    total: 0,
    credit: 0,
    number: 0,
    year: 0,
  };

  const [itemslist, setItemsList] = useState([]);
  const [currentErp, setCurrentErp] = useState(selectedItem ?? resetErp);
  const [client, setClient] = useState({});

  useEffect(() => {
    if (currentResult) {
      const { items, invoice, ...others } = currentResult;
      if (items) {
        setItemsList(items);
        setCurrentErp(currentResult);
      } else if (invoice?.items) {
        setItemsList(invoice?.items);
        setCurrentErp({ ...invoice.items, ...others, ...invoice });
      }
    }
    return () => {
      setItemsList([]);
      setCurrentErp(resetErp);
    };
  }, [currentResult]);

  useEffect(() => {
    if (currentErp?.client) {
      setClient(currentErp.client);
    }
  }, [currentErp]);

  const onDelete = (queryId, noteId) => {
    dispatch(erp.delete({ entity: entity + `/${queryId}/notes`, id: noteId }));
    setCurrentErp((prev) => ({
      ...prev,
      notes: prev.notes?.filter((note) => note.noteId !== noteId),
    }));
  };

  return (
    <>
      <PageHeader
        onBack={() => navigate(`/${entity.toLowerCase()}`)}
        title={`${ENTITY_NAME} # ${currentErp.number}/${currentErp.year || ''}`}
        ghost={false}
        tags={[
          <span key="status">{currentErp.status && translate(currentErp.status)}</span>,
          currentErp.paymentStatus && (
            <span key="paymentStatus">{translate(currentErp.paymentStatus)}</span>
          ),
        ]}
        extra={[
          <Button
            key="close"
            onClick={() => navigate(`/${entity.toLowerCase()}`)}
            icon={<CloseCircleOutlined />}
          >
            {translate('Close')}
          </Button>,
          <Button
            key="pdf"
            onClick={() =>
              window.open(`${DOWNLOAD_BASE_URL}${entity}/${entity}-${currentErp._id}.pdf`, '_blank')
            }
            icon={<FilePdfOutlined />}
          >
            {translate('Download PDF')}
          </Button>,
          <Button
            key="email"
            loading={mailInProgress}
            onClick={() => send(currentErp._id)}
            icon={<MailOutlined />}
          >
            {translate('Send by Email')}
          </Button>,
          <Button
            key="convert"
            onClick={() => dispatch(erp.convert({ entity, id: currentErp._id }))}
            icon={<RetweetOutlined />}
            style={{ display: entity === 'quote' ? 'inline-block' : 'none' }}
          >
            {translate('Convert to Invoice')}
          </Button>,
          <Button
            key="edit"
            onClick={() => {
              dispatch(erp.currentAction({ actionType: 'update', data: currentErp }));
              navigate(`/${entity.toLowerCase()}/update/${currentErp._id}`);
            }}
            type="primary"
            icon={<EditOutlined />}
          >
            {translate('Edit')}
          </Button>,
        ]}
        style={{ padding: '20px 0px' }}
      >
        <Row>
          <Statistic title="Status" value={currentErp.status} />
          <Statistic
            title={translate('date')}
            value={dayjs(currentErp.created).format(dateFormat)}
            style={{ margin: '0 32px' }}
          />
        </Row>
      </PageHeader>

      <Divider dashed />

      <Descriptions title={`Client : ${currentErp.client.name}`}>
        <Descriptions.Item label={translate('Address')}>{client.address}</Descriptions.Item>
        <Descriptions.Item label={translate('email')}>{client.email}</Descriptions.Item>
        <Descriptions.Item label={translate('Phone')}>{client.phone}</Descriptions.Item>
      </Descriptions>

      <Divider />

      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Descriptions
            title={translate('Query Details')}
            layout="vertical"
            bordered
            column={1}
            style={{ marginBottom: '32px' }}
          >
            <Descriptions.Item label={translate('Description')}>
              {currentErp.description || '-'}
            </Descriptions.Item>

            <Descriptions.Item label={translate('Resolution')}>
              {currentErp.resolution || '-'}
            </Descriptions.Item>

            <Descriptions.Item label={translate('Notes')}>
              {currentErp.notes?.length > 0 ? (
                <ul style={{ paddingLeft: '16px', margin: 0 }}>
                  {currentErp.notes.map((note) => (
                    <li
                      key={note.noteId}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span>
                        <strong>{dayjs(note.createdAt).format(dateFormat)}:</strong> {note.text}
                      </span>
                      <Button
                        danger
                        size="small"
                        onClick={() => onDelete(currentErp._id, note.noteId)}
                        style={{ marginLeft: '8px' }}
                      >
                        {translate('Delete')}
                      </Button>
                    </li>
                  ))}
                </ul>
              ) : (
                <span>{translate('No notes')}</span>
              )}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </>
  );
}
