import { useState } from "react";
import { createContext } from "react";
import Toast from "./Toast";

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState(null);

    const showToast = (message, type = 'info', duration = 3000) => {
        setToast({ message, type, duration });
    };

    const ToastContainer = () => <Toast toast={toast} setToast={setToast} />;

    return (
        <ToastContext.Provider value={{ showToast, ToastContainer }}>
            {children}
        </ToastContext.Provider>
    );
};