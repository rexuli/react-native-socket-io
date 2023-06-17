import React, { useEffect, useState } from 'react';
import { socket } from '../socket';

export function MyForm() {
  const [value, setValue] = useState('');
  const [to, setTo] = useState('');
  const [from, setFrom] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    console.log("send message",  {to: to, message: value})
    socket.timeout(1000).emit('chat message', {to: to, message: value}, () => {
      setIsLoading(false);
    });
  }

  function connect() {
    socket.connect();
    setIsLoading(true);
    socket.timeout(1000).emit('storeClientInfo', {customerId: from}, () => {
      setIsLoading(false);
    });
  }

  function disconnect() {
    socket.disconnect();
  }


  return (
    <>
      <form onSubmit={ onSubmit }>
      From:
      <input onChange={ e => setFrom(e.target.value) } />
      To:
      <input onChange={ e => setTo(e.target.value) } />
      Text:
      <input onChange={ e => setValue(e.target.value) } />
      <button type="submit" disabled={ isLoading }>Submit</button>
      </form>
        <button onClick={ connect }>Connect</button>
        <button onClick={ disconnect }>Disconnect</button>
      </>
  );
}