import { NavigationContainer, useIsFocused } from '@react-navigation/native';
import BottomNavigation from './BottomNavigation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PollingStation from './modals/PollingStation';
import TabNavigation from './TabNavigation';
import ContactList from './modals/ContactList';
import Dlno from './modals/Dlno';
import DlnoDetails from './modals/DlnoDetails';
import Aco from './modals/Aco';
import Impo from './modals/Impo';
import { StatusBar } from 'react-native';

import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';

SplashScreen.preventAutoHideAsync();

export function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

const Stack = createNativeStackNavigator()

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }} onLayout={onLayoutRootView}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='TabNavigation' component={TabNavigation} options={{headerShown:false}} />
        <Stack.Screen name='PollingStation' component={PollingStation} options={{headerShown:false}} />
        <Stack.Screen name='Aco' component={Aco} options={{headerShown:false}} />
        <Stack.Screen name='ContactList' component={ContactList} options={{headerShown:false}} />
        
        <Stack.Screen name='Dlno' component={Dlno} options={{headerShown:false}} />
        <Stack.Screen name='Impo' component={Impo} options={{headerShown:false}} />
        <Stack.Screen name='DlnoDetails' component={DlnoDetails} options={{headerShown:false}} />
      </Stack.Navigator>
    </NavigationContainer>
    </SafeAreaView>
  );
}
