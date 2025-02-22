import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { useState } from "react";
import useWeatherStore from "../store/weatherStore";
import { fetchWeather } from "@/utils/fetchWeather";
import type { WeatherResponse } from "../store/weatherStore";

const HomeScreen = () => {
  const { city, setCity, setResult, result } = useWeatherStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchWeather = async () => {
    if (!city || city.trim() === "") {
      Alert.alert("Validation Error", "Input cannot be empty.");
      return;
    }

    const regex = /^[a-zA-Z\s]*$/;
    if (!regex.test(city)) {
      Alert.alert("Validation Error", "Only alphabets are allowed.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetchWeather(city);

      if ("message" in res) {
        Alert.alert("Error", res.message);
        setResult(null);
        return;
      }

      setResult(res as WeatherResponse);
      setCity(null);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch weather data");
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="h-full w-screen">
      <View className="p-1 flex-1 justify-start items-center">
        <Text className="text-6xl mt-10  text-center text-white tracking-widest font-bold">
          WeatherNow
        </Text>
        <Text className="text-2xl text-white text-center tracking-widest font-bold">
          check the weather of your city
        </Text>
        <Text className="text-xl text-white text-center tracking-widest font-bold">
          Enter city name to get started
        </Text>
        <Image
          source={require("../assets/images/icon.png")}
          style={{ width: 200, height: 200 }}
        />
        <View className=" w-full  justify-center items-center">
          <TextInput
            value={city ?? ""}
            onChangeText={setCity}
            placeholder="Enter city name"
            className="w-3/4 bg-white placeholder:text-center rounded-lg p-3 shadow-sm text-gray-600"
          />
          <TouchableOpacity
            onPress={handleFetchWeather}
            className={`w-2/4 mt-4 rounded-lg py-3 ${
              !city?.trim() || isLoading ? "bg-gray-300" : "bg-gray-700"
            }`}
            disabled={!city?.trim() || isLoading}
          >
            <Text className="text-center text-white text-2xl">
              {isLoading ? "Loading..." : "Get Weather"}
            </Text>
          </TouchableOpacity>

          {result && (
            <View className="mt-10">
              <Text className="text-4xl font-bold text-center">
                {result.name}
              </Text>
              <Text className="text-2xl font-bold text-center">
                Temperature: {result.main.temp}°C
              </Text>
              <Text className="text-2xl font-bold text-center">
                Weather: {result.weather[0].description}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
