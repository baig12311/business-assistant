
import { useEffect, useState } from 'react';
import NetInfo from '@react-native-community/netinfo';

export const useNetworkStatus = () => {
    const [isOffline, setIsOffline] = useState(false);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            if (
                state.isConnected === false ||
                state.isInternetReachable === false
            ) {
                setIsOffline(true);
            } else if (state.isConnected === true) {
                setIsOffline(false);
            }
        });

        return unsubscribe;
    }, []);

    const checkConnection = async () => {
        const state = await NetInfo.fetch();

        const offline =
            state.isConnected === false ||
            state.isInternetReachable === false;

        setIsOffline(offline);
        return !offline;
    };

    return { isOffline, checkConnection };
};
