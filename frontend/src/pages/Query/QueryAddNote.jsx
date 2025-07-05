import useLanguage from '@/locale/useLanguage';
import QueryAddNoteModule from '@/modules/QueryModule/QueryAddNoteModule';
import { selectCurrentItem } from '@/redux/erp/selectors';
import { useSelector } from 'react-redux';

export default function InvoiceRecord() {
  const entity = 'query';
  const translate = useLanguage();
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
  const { result: currentResult } = useSelector(selectCurrentItem);
  return <QueryAddNoteModule config={configPage} currentItem={currentResult} />;
}
