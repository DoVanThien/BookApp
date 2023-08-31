import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";
import MyBooksProvider from "./context/MyBooksProvider";
import { ThemeProvider } from './context/ThemeContextProvider';
import { lightTheme } from './constants/Theme';

const API_KEY =
  "tocancipa::stepzen.net+1000::354d1ea945ad0ab1c1fd52bdceb698321cdf54720e79e51e0c1700ac7eeabb68";

const client = new ApolloClient({
  uri: "https://tocancipa.stepzen.net/api/tailored-markhor/__graphql",
  headers: {
    Authorization: `Apikey ${API_KEY}`,
  },
  cache: new InMemoryCache(),
});

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <ApolloProvider client={client}>
        <ThemeProvider initialTheme={lightTheme}>
          <MyBooksProvider>
            <Navigation colorScheme={colorScheme} />
          </MyBooksProvider>
          </ThemeProvider>
        </ApolloProvider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
