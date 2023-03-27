import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, View, Dimensions, ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import { Fontisto } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const API_KEY = "b0ca46d82121daf4817821563c95e694";
const icons = {
  Clouds: "cloudy",
  Rain: "rain",
  Clear: "day-sunny",
};

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }

    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync({ latitude, longitude }, { useGoogleMaps: false });

    setCity(location[0].city);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&units=metric&appid=${API_KEY}`);
    const json = await response.json();
    setDays(json.daily);
  };
  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.weather} horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator color="white" size="large" />
          </View>
        ) : (
          days.map((day, index) => (
            <View style={styles.day} key={index}>
              <View style={styles.tempWrap}>
                <Text style={styles.temp}>{parseFloat(day.temp.day).toFixed(1)}</Text>
                <Fontisto name={icons[day.weather[0].main]} size={68} color="white" />
              </View>

              <Text style={styles.description}>{day.weather[0].main}</Text>
              <Text style={styles.tinyText}>{day.weather[0].description}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 50,
    color: "#fff",
    fontWeight: 500,
  },
  day: {
    width: SCREEN_WIDTH,
    paddingHorizontal: 10,
    color: "#fff",
  },
  tempWrap: {
    flexDirection: "row",
    alignContent: "center",
    width: "100%",
    justifyContent: "space-between",
  },
  temp: {
    fontSize: 100,
    color: "#fff",
  },
  description: {
    marginTop: -10,
    fontSize: 30,
    color: "#fff",
  },
  tinyText: {
    fontSize: 20,
    color: "#fff",
  },
});
