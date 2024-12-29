import { X } from "lucide-react";
import { useEffect } from "react";
import { toastTypes } from "../../constants";

const Toast = ({ toast, setToast }) => {
    useEffect(() => {
        if (!toast) return;

        const timer = setTimeout(() => {
            setToast(null);
        }, toast.duration);

        return () => clearTimeout(timer);
    }, [toast, setToast]);

    if (!toast) return null;

    const { icon: Icon, bgColor, textColor } = toastTypes[toast.type];

    return (
        <div className={`fixed bottom-4 right-4 z-50 flex items-center p-4 rounded shadow-lg ${bgColor} ${textColor} animate-slide-in`}>
            <Icon className="w-6 h-6 mr-3" />
            <span className="flex-grow">{toast.message}</span>
            <button onClick={() => setToast(null)} className="ml-4 hover:opacity-75">
                <X className="w-5 h-5" />
            </button>
        </div>
    );
};

export default Toast;