import { create } from "zustand";

export interface WeatherResponse {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  sys: {
    country: string;
  };
}

interface WeatherState {
  city: string | null;
  setCity: (city: string | null) => void;
  result: WeatherResponse | null;
  setResult: (result: WeatherResponse | null) => void;
}

const useWeatherStore = create<WeatherState>((set) => ({
  city: null,
  setCity: (city) => set({ city }),
  result: null,
  setResult: (result) => set({ result }),
}));

export default useWeatherStore;
