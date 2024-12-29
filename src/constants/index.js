import { AlertCircle, CheckCircle, Info } from "lucide-react";

export const toastTypes = {
    success: {
        icon: CheckCircle,
        bgColor: 'bg-green-500',
        textColor: 'text-white'
    },
    error: {
        icon: AlertCircle,
        bgColor: 'bg-red-500',
        textColor: 'text-white'
    },
    info: {
        icon: Info,
        bgColor: 'bg-blue-500',
        textColor: 'text-white'
    },
    warning: {
        icon: AlertCircle,
        bgColor: 'bg-yellow-500',
        textColor: 'text-white'
    }
};