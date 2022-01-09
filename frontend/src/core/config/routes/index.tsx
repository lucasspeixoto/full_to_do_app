import BaseLayout from '@components/layout/BaseLayout';
import { Home } from '@pages/Home';

export const Routes: React.FC = () => {
  return (
    <BaseLayout>
      <Home />
    </BaseLayout>
  );
};
