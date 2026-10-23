
import {
    createContext,
    useCallback,
    useContext,
    useState,
    type ReactNode,
} from 'react';

import CustomToast from '../components/common/CustomToast';

type ToastType = 'success' | 'error';

interface ToastContextType {
    showToast: (
        type: ToastType,
        title: string,
        description: string
    ) => void;
}

interface ToastState {
    visible: boolean;
    type: ToastType;
    title: string;
    description: string;
}

const ToastContext = createContext<ToastContextType | undefined>(
    undefined
);

interface ToastProviderProps {
    children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
    const [toast, setToast] = useState<ToastState>({
        visible: false,
        type: 'error',
        title: '',
        description: '',
    });

    const showToast = useCallback(
        (type: ToastType, title: string, description: string) => {
            setToast({
                visible: true,
                type,
                title,
                description,
            });
        },
        []
    );

    const hideToast = useCallback(() => {
        setToast(previous => ({
            ...previous,
            visible: false,
        }));
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            <CustomToast
                type={toast.type}
                messageTitle={toast.title}
                messageDescription={toast.description}
                visible={toast.visible}
                onHide={hideToast}
            />
        </ToastContext.Provider>
    );
};

export const useToast = () => {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error(
            'useToast must be used inside ToastProvider'
        );
    }

    return context;
};
