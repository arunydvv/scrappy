import { useContext } from "react";
import { FlowValidationContext } from "../context/FlowValidationContext";

export default function useFlowValidation() {
    const context = useContext(FlowValidationContext);

    if (!context) {
        const message =
            "useFlowValidation must be used within <FlowValidationContextProvider />";

        if (process.env.NODE_ENV !== "production") {
            console.error(message);
        }

        throw new Error(message);
    }

    return context;
}
