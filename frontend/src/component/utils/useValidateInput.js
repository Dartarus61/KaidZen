import { useState } from "react";

export const useValidateInput = (callback) => {
    const [error, setError] = useState(false);
    const validateError = () => setError(callback())
    return {
        error,
        validateError,
    }
}