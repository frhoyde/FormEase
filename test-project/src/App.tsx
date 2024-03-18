import { BrowserRouter } from "react-router-dom";
import { AppRouteComponent } from "./components/app-route.component";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRouteComponent />
      </BrowserRouter>
    </>
  );
}

export default App;
