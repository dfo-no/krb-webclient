import './App.scss';
import { useTranslation } from 'react-i18next';

function App() {
  const { t } = useTranslation('translations');

  return (
    <div className="App">
      <header className="App-header">{t('app_title')}</header>
    </div>
  );
}

export default App;
