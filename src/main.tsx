import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import BubbleLoader from "@/components/BubbleLoader";

const MIN_LOADING_MS = 2000; // minimum time to show the loader in ms
const App = lazy(() => Promise.all([import("@/App"), new Promise((res) => setTimeout(res, MIN_LOADING_MS))]).then(([module]) => module));

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Suspense fallback={<BubbleLoader />}>
            <App />
        </Suspense>
    </StrictMode>,
);
