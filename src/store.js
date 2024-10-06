import createSagaMiddleware from "redux-saga";
import { configureStore } from '@reduxjs/toolkit';
import createblogSaga from "./component/sagamidalware/createblogsaga";
import rootReducer from "./component/reducer/rootReducer";


const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: () => [sagaMiddleware], // Corrected middleware configuration
});

sagaMiddleware.run(createblogSaga);





export default store;
