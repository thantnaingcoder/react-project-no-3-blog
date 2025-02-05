
import ReactDOM from "react-dom/client";
import App from "./app.tsx";
import "./index.css";
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
 
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
	
		<QueryClientProvider client={queryClient}>
			<ThemeProvider
				defaultTheme="dark"
				storageKey="app-ui-theme">
				<App />
				<Toaster  />
			</ThemeProvider>

			{/* <ReactQueryDevtools initialIsOpen={false} /> */}
		</QueryClientProvider>
	
);
