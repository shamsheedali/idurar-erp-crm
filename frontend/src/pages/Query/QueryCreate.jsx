import useLanguage from '@/locale/useLanguage';
import CreateQueryModule from '@/modules/QueryModule/CreateQueryModule';

export default function InvoiceCreate() {
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
  return <CreateQueryModule config={configPage} />;
}
