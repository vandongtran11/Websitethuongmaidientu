import { createStore } from "redux";
import rootReduxcers from "./reducer";

const store = createStore(rootReduxcers);

export default store;