import axios from "axios";

const API_KEY = process.env.EXPO_PUBLIC_API_URL as string;
const BASE_URL = process.env.EXPO_PUBLIC_BASE_URL as string;

interface WeatherResponse {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
}

interface WeatherError {
  message: string;
  code?: string;
}

export const fetchWeather = async (
  city: string | null
): Promise<WeatherResponse | WeatherError> => {
  try {
    // Input validation
    if (!city || city.trim().length < 3) {
      return {
        message: "Please enter a valid city name (minimum 3 characters)",
        code: "INVALID_INPUT",
      };
    }

    // Make the API call
    const response = await axios.get<WeatherResponse>(BASE_URL, {
      params: {
        q: `${city.trim()},`, // Adding comma to force exact city match
        appid: API_KEY,
        units: "metric",
      },
    });

    // Validate the response
    if (response.data.name.toLowerCase() !== city.trim().toLowerCase()) {
      return {
        message: `No exact match found for "${city}". Did you mean "${response.data.name}, ${response.data.sys.country}"?`,
        code: "NO_EXACT_MATCH",
      };
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return {
          message: `City "${city}" not found. Please check the spelling and try again.`,
          code: "CITY_NOT_FOUND",
        };
      }
      return {
        message: "Unable to fetch weather data. Please try again later.",
        code: "API_ERROR",
      };
    }
    return {
      message: "An unexpected error occurred",
      code: "UNKNOWN_ERROR",
    };
  }
};
