import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';
import "./styles.css";
import App from './app/app';
import reportWebVitals from "../src/reportWebVitals";
import { Provider } from "react-redux";
import store from "../../../libs/store/src/redux/configStore";

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
