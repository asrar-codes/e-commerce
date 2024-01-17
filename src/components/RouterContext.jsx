import { withRouter } from "react-router-dom";

const MyContextProvider = withRouter(MyContext.Provider);

function App() {
  return (
    <MyContextProvider>{/* Your component code here */}</MyContextProvider>
  );
}
