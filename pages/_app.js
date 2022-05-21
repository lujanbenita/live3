import DateFnsUtils from "@date-io/date-fns";
import axios from "axios";
import jsCookie from "js-cookie";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer, Slide } from "react-toastify";

import withAuth from "hoc/withAuth";
import { useStore } from "redux/store";
import Background from "components/common/atoms/Background";
import MarkerIoConfig from "../components/markerIo/markerIoConfig";

// Styles
import "styles/main.scss";
import "react-toastify/dist/ReactToastify.css";
import "rsuite/dist/styles/rsuite-default.css";
import "antd/dist/antd.css";

// Axios defaults initialization
const token = jsCookie.get("token");

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common.Accept = "application/json, text/plain, */*";
axios.defaults.timeout = 59000;

if (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate persistor={store.__PERSISTOR} loading={null}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Background />
            <MarkerIoConfig />
            <Component {...pageProps} />
            <ToastContainer
              closeButton={false}
              position="bottom-center"
              hideProgressBar
              newestOnTop={false}
              draggable={false}
              pauseOnVisibilityChange
              closeOnClick
              pauseOnHover
              transition={Slide}
            />
          </MuiPickersUtilsProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

export default withAuth(MyApp);
