import HomeScreen from '@/components/layout/HomeScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DetailsScreen from '@/components/layout/DetailsScreen';

import {StackParamList} from '@/types';

const Stack = createNativeStackNavigator<StackParamList>();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{headerTitle: 'Get The News'}}
      />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}
