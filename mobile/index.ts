import { registerRootComponent } from 'expo';
import { TailwindProvider } from 'nativewind';
import App from './App';

// Register the main component
registerRootComponent(() => (
  <TailwindProvider>
    <App />
  </TailwindProvider>
));