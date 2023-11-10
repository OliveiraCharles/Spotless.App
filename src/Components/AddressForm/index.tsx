import { useNavigation } from "@react-navigation/native";
import {
  Center,
  HStack,
  Heading,
  Input,
  VStack
} from "native-base";
import React, { useState } from "react";
import BackButton from "../../Components/BackButton";
import ButtonCustom from "../../Components/Button";
import Header from "../../Components/Header";
import { Address, ServiceProvider, User } from "../../Types";

interface LocationFormProps {
  setMode: React.Dispatch<React.SetStateAction<boolean>>;
  user?: User;
  serviceProvider?: ServiceProvider;
  setUser?: React.Dispatch<React.SetStateAction<User>>;
  onPress?: ()=> void;
}

const LocationForm: React.FC<LocationFormProps> = ({
  setMode,
  user,
  serviceProvider,
  setUser,
  onPress
}) => {
  const navigation = useNavigation();
  const [address, setAddress] = useState<Address>({});
  const handleAddressinputChange = (field: keyof Address) => (value: string) => {
    setAddress((prevAddress) => ({
      ...prevAddress,
      [field]: value,
    }));
    setUser((prevState) => ({ ...prevState, address: address }));
  };
  return (
    <>
      <BackButton onPress={() => setMode((prevMode) => !prevMode)} />
      <Center mt={15}>
        <VStack space={30} w={"90%"}>
          <Header />
          <Heading color={"#FFFFFF"}>Olá { user ? user.name : serviceProvider. name}</Heading>
          <Heading color={"#FFFFFF"}>
            Para finalizar o seu cadastro, precisamos do seu endereço. Por
            favor, forneça-nos essas informações.
          </Heading>
          <VStack space={30} alignItems={"center"}>
            <Input
              w={"100%"}
              placeholder="Estado"
              bg={"#FFFFFF"}
              _focus={{ bg: "#FFFFFF" }}
              rounded={"md"}
              fontSize={20}
              onChangeText={handleAddressinputChange("state")}
            />
            <Input
              w={"100%"}
              placeholder="Cidade"
              bg={"#FFFFFF"}
              _focus={{ bg: "#FFFFFF" }}
              rounded={"md"}
              fontSize={20}
              onChangeText={handleAddressinputChange("city")}
            />
            <HStack space={"10%"}>
              <Input
                w={"65%"}
                placeholder="Rua"
                bg={"#FFFFFF"}
                _focus={{ bg: "#FFFFFF" }}
                rounded={"md"}
                fontSize={20}
                onChangeText={handleAddressinputChange("street")}
              />
              <Input
                w={"25%"}
                placeholder="Núm"
                bg={"#FFFFFF"}
                _focus={{ bg: "#FFFFFF" }}
                rounded={"md"}
                fontSize={20}
                onChangeText={handleAddressinputChange("houseNumber")}
              />
            </HStack>
            <Input
              w={"100%"}
              placeholder="Complemento"
              bg={"#FFFFFF"}
              _focus={{ bg: "#FFFFFF" }}
              rounded={"md"}
              fontSize={20}
              onChangeText={handleAddressinputChange("additionalObservation")}
            />
            <ButtonCustom
              label={"Cadastrar"}
              onPress={onPress}
            />
          </VStack>
        </VStack>
      </Center>
    </>
  );
};

export default LocationForm;
