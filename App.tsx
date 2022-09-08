import 'react-native-gesture-handler';
import React,{useEffect} from 'react';
import { View, Text } from 'react-native';
import { DataProvider } from './src/hooks';
import AppNavigation from './src/navigation/App';
import SplashScreen from 'react-native-splash-screen'
export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <DataProvider>
      <AppNavigation />
    </DataProvider> 
  );
}
 