import HomeScreen from '@/components/layout/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailsScreen from '@/components/layout/DetailsScreen';
import ModalScreen from '@/components/layout/ModalScreen';

import {StackParamList} from '@/types';

const Stack = createNativeStackNavigator<StackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Group>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerTitle: 'Get The News'}}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Group>
      <Stack.Group screenOptions={{presentation: 'modal'}}>
        <Stack.Screen name="Modal" component={ModalScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
