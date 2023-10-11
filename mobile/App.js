import { StyleSheet, View } from 'react-native';
import { UserContextProvider, UserContext } from './app/context/userContext';
import Navigation from './app/Navigations/Navigation';


export default function App() {
  return (
      <UserContextProvider>
        <Navigation/>
      </UserContextProvider>
  );
}



