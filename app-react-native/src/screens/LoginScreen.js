import React, { useContext, useState } from "react";
import { Text, Input, Button, Switch } from "react-native-elements";
import { View, Image } from "react-native";
import { AuthContext } from "../context/AuthContext";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [switchValue, setSwitchValue] = useState(false);
  const toggleSwitch = () => setSwitchValue(previousState => !previousState);
  const { authState, signIn, signUp } = useContext(AuthContext);

  return (
    <View style={{ justifyContent: "center", flex: 1, alignItems: "center", padding: 16 }}>
        <Image
            source={require('../../assets/logo.png')}
            style={{ width: 200, height: 125 }}
        />

        <View height={16}></View>

        <Input
            placeholder="Email"
            onChangeText={(value) => setEmail(value)}
            value={email}
            autoCapitalize="none"
        />

        <Input
            placeholder="Senha"
            onChangeText={(value) => setPassword(value)}
            value={password}
            secureTextEntry={true}
            autoCapitalize="none"
        />

        <View style={{flexDirection: "row", flexWrap: "wrap", alignItems: "center"}}>
            <Text>Logar</Text>
            <Switch color='#59617d' value={switchValue} onValueChange={toggleSwitch} />
            <Text>Cadastrar</Text>
        </View>

        <View height={16}></View>

        <View style={{width: '100%'}}>
            <Button
                title={ switchValue ? "Cadastrar" : "Entrar" }
                buttonStyle={{backgroundColor: '#59617d'}}
                onPress={() => {
                    switchValue ? signUp({ email, password }) : signIn({ email, password });
                }}
            />
        </View>

        {authState.message ? <Text>{authState.message}</Text> : null}
    </View>
  );
};

export default LoginScreen;
