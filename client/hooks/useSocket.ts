import { useEffect,useState } from "react";

export const useSocket = () => {
    const [socket, setSocket] = useState<WebSocket | null> (null);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:8000");
        ws.onopen = () => {
            console.log("connected")
            setSocket(ws);
        }

        ws.close = () => {
            console.log("Disconnected");
            setSocket(null)
        }

        return () => {
            ws.close();
        }

    },[])

    return socket;
}
