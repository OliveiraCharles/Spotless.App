import { Box, Center, Heading, Toast, VStack } from "native-base";
import React, { useState } from "react";
import { View } from "react-native";
import ButtonCustom from "../../Components/Button";
import Header from "../../Components/Header";
import InputCustom from "../../Components/Input/Index";
import { useNavigation } from "@react-navigation/native";
import { UserLogin } from "../../Types";
import { handleChange, handleLogin } from "../../Utils/Index";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAsync } from "../../Store/userSlice";
import { RootState } from "../../Store";

const Login: React.FC = () => {
	const navigation = useNavigation();
	const [userLogin, setUserLogin] = useState<UserLogin>({
		email: "",
		password: "",
		// name: ""
	});
	const dispatch = useDispatch();
	const loggedInUser = useSelector(
		(state: RootState) => state.user.loggedInUser
	);

	return (
		<Box flex={1} bg="#0D27AB" justifyContent={"center"}>
			<Center>
				<VStack alignItems="center" space={60}>
					<Header text />
					<VStack space={30}>
						{" "}
						<InputCustom
							placeholder={"E-mail"}
							w={"90%"}
							value={userLogin.email}
							onChangeText={handleChange("email", setUserLogin)} //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<AQUI
						/>
						<InputCustom
							bg={"#FFFFFF"}
							placeholder={"Senha"}
							secureTextEntry={true}
							w={"90%"}
							value={userLogin.password}
							onChangeText={handleChange("password", setUserLogin)}
						/>
					</VStack>
					<VStack space={15}>
						<ButtonCustom
							label={"ENTRAR"}
							onPress={() => {
								dispatch(
									loginUserAsync({
										email: userLogin.email,
										password: userLogin.password,
										// name: ""
									})
								);
								if (loggedInUser) {
									navigation.navigate("Home");
									Toast.show({
										render: () => (
											<Box
												px={10}
												py={"1%"}
												rounded={"md"}
												bg={"#50C878"}
												justifyContent={"center"}>
												<Heading color={"#FFFFFF"}>
													Bem Vindo {userLogin.name}
												</Heading>
											</Box>
										),
									});
								} else {
									Toast.show({
										render: () => (
											<Box
												px={10}
												py={"1%"}
												rounded={"md"}
												bg={"#FF5733"}
												justifyContent={"center"}>
												<Heading color={"#FFFFFF"}>
													Usuário/Senha inválido
												</Heading>
											</Box>
										),
									});
								}
							}}
						/>
						<View alignItems={"center"}>
							<Heading fontSize={18} color={"#FFFFFF"}>
								Não possui uma conta?
							</Heading>
							<Heading
								fontSize={18}
								color={"#F7C425"}
								onPress={() => navigation.navigate("Sign")}>
								Cadastre-se
							</Heading>
						</View>
					</VStack>
				</VStack>
			</Center>
		</Box>
	);
};

export default Login;
