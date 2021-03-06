import React from "react";
import { Provider } from "react-redux";
import store from "./js/store/index";
import Application from "./js/components/App";

function App() {
  return (
    <Provider store={store}>
      <Application/>
    </Provider>
  )
}

export default App;
