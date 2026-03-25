import { useEffect, useState, useRef } from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr';

export const useSignalR = (url, eventName, onEventTriggered) => {
    const [connectionStatus, setConnectionStatus] = useState('Desconectado');
    const callbackRef = useRef(onEventTriggered);

    useEffect(() => {
        callbackRef.current = onEventTriggered;
    }, [onEventTriggered]);

    useEffect(() => {
        const connection = new HubConnectionBuilder()
            .withUrl(url)
            .configureLogging(LogLevel.Warning)
            .withAutomaticReconnect([0, 2000, 10000, 30000, 60000])
            .build();

        connection.onreconnecting(() => {
            setConnectionStatus('Reconectando');
        });

        connection.onreconnected(() => {
            setConnectionStatus('Conectado');
            if (callbackRef.current) callbackRef.current();
        });

        connection.onclose(() => {
            setConnectionStatus('Desconectado');
        });

        const startConnection = async () => {
            try {
                await connection.start();
                setConnectionStatus('Conectado');

                connection.on(eventName, () => {
                    if (callbackRef.current) callbackRef.current();
                });
            } catch (err) {
                setConnectionStatus('Error');
                setTimeout(startConnection, 5000);
            }
        };

        startConnection();

        return () => {
            connection.off(eventName);
            connection.stop();
        };
    }, [url, eventName]);

    return { connectionStatus };
};