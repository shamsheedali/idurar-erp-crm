import useLanguage from '@/locale/useLanguage';
import ReadQueryModule from '@/modules/QueryModule/ReadQueryModule';

export default function QuoteRead() {
  const translate = useLanguage();

  const entity = 'query';

  const Labels = {
    PANEL_TITLE: translate('query'),
    DATATABLE_TITLE: translate('query_list'),
    ADD_NEW_ENTITY: translate('add_new_query'),
    ENTITY_NAME: translate('query'),
  };

  const configPage = {
    entity,
    ...Labels,
  };
  return <ReadQueryModule config={configPage} />;
}
