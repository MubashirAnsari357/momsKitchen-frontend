import { NativeWindStyleSheet } from "nativewind";
import { Provider } from 'react-redux';
import store from './redux/store';
import Main from "./Main";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

