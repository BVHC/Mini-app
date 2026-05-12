import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { StockProvider } from "./contexts/StockContext.jsx";
import { TaskProvider } from "./contexts/TaskContext";

ReactDOM.createRoot(document.getElementById("root")).render(
	// <React.StrictMode>
		<TaskProvider>
			<StockProvider>
				<App />
			</StockProvider>
		</TaskProvider>
	// </React.StrictMode>,
);
