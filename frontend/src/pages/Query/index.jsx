import dayjs from 'dayjs';
import { Tag } from 'antd';
import useLanguage from '@/locale/useLanguage';
import { tagColor } from '@/utils/statusTagColor';

import { useMoney, useDate } from '@/settings';
import CrudModule from '@/modules/CrudModule/CrudModule';
import QueryForm from '@/forms/QueryForm';
import QueryDataTableModule from '@/modules/QueryModule/QueryDataTableModule';

export default function Query() {
  const translate = useLanguage();
  const { dateFormat } = useDate();
  const entity = 'query';
  const { moneyFormatter } = useMoney();

  const searchConfig = {
    entity: 'client',
    displayLabels: ['name'],
    searchFields: 'name',
  };
  const deleteModalLabels = ['number', 'client.name'];
  const dataTableColumns = [
    {
      title: translate('Number'),
      dataIndex: 'number',
    },
    {
      title: translate('Client'),
      dataIndex: ['client', 'name'],
    },
    {
      title: translate('Description'),
      dataIndex: 'description',
      render: (text) => text?.substring(0, 30) + '...',
    },
    {
      title: translate('Date'),
      dataIndex: 'created',
      render: (date) => {
        return dayjs(date).format(dateFormat);
      },
    },
    {
      title: translate('Status'),
      dataIndex: 'status',
    },
    {
      title: translate('Resolution'),
      dataIndex: 'resolution',
      render: (text) => text?.substring(0, 30) + '...',
    },
  ];

  const Labels = {
    PANEL_TITLE: translate('query'),
    DATATABLE_TITLE: translate('query_list'),
    ADD_NEW_ENTITY: translate('add_new_query'),
    ENTITY_NAME: translate('query'),

    RECORD_ENTITY: translate('record_payment'),
  };

  const configPage = {
    entity,
    ...Labels,
  };
  const config = {
    ...configPage,
    dataTableColumns,
    searchConfig,
    deleteModalLabels,
  };

  return <QueryDataTableModule config={config} />;
}
