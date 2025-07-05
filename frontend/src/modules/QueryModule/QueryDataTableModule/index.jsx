import { ErpLayout } from '@/layout';
import useLanguage from '@/locale/useLanguage';
import ErpPanel from '@/modules/ErpPanelModule';
import { BookOutlined } from '@ant-design/icons';

export default function QueryDataTableModule({ config }) {
  const translate = useLanguage();
  return (
    <ErpLayout>
      <ErpPanel
        config={config}
        extra={[
          {
            label: translate('Add Note'),
            key: 'addNote',
            icon: <BookOutlined />,
          },
        ]}
      ></ErpPanel>
    </ErpLayout>
  );
}
