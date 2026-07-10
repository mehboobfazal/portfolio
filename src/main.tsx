import { StrictMode, Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import BubbleLoader from "./components/BubbleLoader";

const App = lazy(() => import("./App"));

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <Suspense fallback={<BubbleLoader />}>
            <App />
        </Suspense>
    </StrictMode>,
);
