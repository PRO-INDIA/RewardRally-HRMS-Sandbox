import "./App.css";
import Layout from "./Layout/Layout/Layout";
import { AuthProvider } from "./Context/AuthContext";


function App() {
	return (
		<AuthProvider>
			<div className="app-body">
				<Layout />
			</div>
		</AuthProvider>
	);
}

export default App;
