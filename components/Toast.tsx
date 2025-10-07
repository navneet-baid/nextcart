import { useEffect } from "react";
import styles from "@/styles/Toast.module.css";

interface ToastProps {
    message: string;
    show: boolean;
    duration?: number;
    onClose: () => void;
}

export default function Toast({ message, show, duration = 3000, onClose }: ToastProps) {
    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => onClose(), duration);
            return () => clearTimeout(timer);
        }
    }, [show, duration, onClose]);

    if (!show) return null;

    return (
        <div className={styles.toast}>
            {message}
        </div>
    );
}
