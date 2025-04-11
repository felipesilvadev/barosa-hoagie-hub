import './global.css';
import { StatusBar } from 'expo-status-bar';

import { Routes } from '~/navigation';
import { AppProvider } from '~/providers';

export default function App() {
  return (
    <AppProvider>
      <Routes />
      <StatusBar style="auto" />
    </AppProvider>
  );
}
