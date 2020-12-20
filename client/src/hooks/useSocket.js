import React from 'react';
import socket from 'socket.io-client';

// Use socket to fetch request to data 
// Socket server's url and topic in which data is sent
const useSocket = (serverUrl,options ,topic) => {
    const [temp, setTemp] = React.useState(0);
    const [sc,setsc]=React.useState()
    const [isConnected, setConnected] = React.useState(false);
      const send=(msg)=>{
       sc.emit(topic,msg)
      }
    React.useEffect(() => {
        const client = socket.connect(serverUrl,options);
        setsc(client)
        client.on("connect", () => setConnected(true));
        client.on("disconnect", () => setConnected(false));
        client.on(topic, (data) => {
            setTemp(data);
        })
        // return ()=>{
        //             client.emit('disconnect')
        //             client.off()
        //         }
    }, [serverUrl, topic, isConnected]);

    return { temp, isConnected ,send};
}

export default useSocket

