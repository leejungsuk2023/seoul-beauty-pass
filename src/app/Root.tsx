import { LanguageProvider } from './contexts/LanguageContext';
import { Layout } from './components/Layout';

export function Root() {
  return (
    <LanguageProvider>
      <Layout />
    </LanguageProvider>
  );
}
