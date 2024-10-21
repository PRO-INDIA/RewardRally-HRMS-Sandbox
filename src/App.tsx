import { initializeClientCredentials } from "@stagetheproindia/react-rewardrally";
import "./App.css";
import Layout from "./Layout/Layout/Layout";
import { environment } from "./Environments/Environment";

function App() {
  initializeClientCredentials(environment.clientId, environment.clientSecret);
  return (
    <div className="app-body">
      <Layout />
    </div>
  );
}

export default App;
