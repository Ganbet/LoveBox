import { Message } from '@prisma/client';
import { createRef, useEffect, useState } from 'react';

export default function MessageView() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<null | string>(null);
  const inputRef = createRef<HTMLInputElement>();

  const fetchMessages = async () => {
    fetch('/api/messages')
      .then((res) => res.json())
      .then((messages: Message[]) => {
        setMessages(messages);
      });
  };

  useEffect(() => {
    fetchMessages();

    setTimeout(() => {
      fetchMessages();
      setTimeout(fetchMessages, 5000);
    }, 5000);
  }, []);

  const handleSubmit = async () => {
    const message = inputRef.current?.value;
    if (!message) {
      setError('Falha ao enviar texto');
      return;
    }

    fetch('/api/messages', {
      body: JSON.stringify({ message }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    }).then(() => {
      fetchMessages();
      if (inputRef?.current) inputRef.current.value = '';
    });
  };

  return (
    <div className="relative h-full w-full">
      <div>
        <label>Message</label>
        <input ref={inputRef} type="text"></input>
        <button onClick={handleSubmit}>Submit</button>
        {error && <p>{error}</p>}
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Message</th>
            <th>Lida em</th>
            <th>Recebida em</th>
            <th>Criada em</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message.id}>
              <td>{message.id}</td>
              <td>{message.message}</td>
              <td>
                {message?.readAt
                  ? `${new Date(message.readAt).toLocaleDateString()} ${new Date(
                      message.readAt,
                    ).toLocaleTimeString()}`
                  : '---'}
              </td>
              <td>
                {message?.sentAt
                  ? `${new Date(message.sentAt).toLocaleDateString()} ${new Date(
                      message.sentAt,
                    ).toLocaleTimeString()}`
                  : '---'}
              </td>
              <td>
                {`${new Date(message.createdAt).toLocaleDateString()} ${new Date(
                  message.createdAt,
                ).toLocaleTimeString()}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
