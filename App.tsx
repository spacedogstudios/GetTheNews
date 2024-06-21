import './global.css';

import ProviderWrapper from '@/components/ui/ProviderWrapper';
import StackNavigator from '@/components/layout/StackNavigator';

export default function App() {
  return (
    <ProviderWrapper>
      <StackNavigator />
    </ProviderWrapper>
  );
}
