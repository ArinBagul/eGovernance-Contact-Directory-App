import { NavigationContainer } from '@react-navigation/native';
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

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
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
