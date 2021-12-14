import React, { useContext} from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { navigationRef } from "./src/core/navigator";
import { AuthProvider, AuthContext } from "./src/context/AuthContext";
import { EstateProvider } from "./src/context/EstateContext";
import { FavoriteProvider } from "./src/context/FavoriteContext";
import LoginScreen from "./src/screens/LoginScreen";
import HomeScreen from "./src/screens/HomeScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";
import EstateDetailsScreen from "./src/screens/EstateDetailsScreen";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  const { signOut } = useContext(AuthContext);
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Sair"
        onPress={() => signOut()}
      />
    </DrawerContentScrollView>
  );
}

function CustomDrawer() {
  return (
    <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Favorites" component={FavoritesScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <FavoriteProvider>
        <EstateProvider>
          <NavigationContainer ref={navigationRef}>
              <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen}/>
                <Stack.Screen 
                  name="HomeStack" 
                  component={CustomDrawer}
                  options={{ headerShown: false }}
                />
                <Stack.Screen name="EstateDetailsScreen" component={EstateDetailsScreen}/>
              </Stack.Navigator>
          </NavigationContainer>
        </EstateProvider>
      </FavoriteProvider>
    </AuthProvider>
  );
}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/
