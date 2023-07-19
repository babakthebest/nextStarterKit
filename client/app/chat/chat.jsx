'use client'
import { useEffect, useState } from 'react'
import { socket } from '../layout'

export default function Chat() {
  const [message, setMessage] = useState('')
  const [messageRecieved, setMessageRecieved] = useState([])
  const [sentMessages, setSentMessages] = useState([])
  const sendMessage = () => {
    socket.emit('send_message', { message })
    setSentMessages(pre => [...pre, message])
  }
  console.log(sentMessages)
  useEffect(() => {
    socket.on('received_message', data => {
      // alert(data.message)
      setMessageRecieved(pre => [...pre, data.message])
    })
  }, [socket])
  return (
    <div className='item-center flex h-[95vh] w-[100vw] flex-col gap-6'>
      <div className='drak:bg-slate-900 mt-5 flex h-10 items-center justify-center dark:text-white'>
        <input
          type='text'
          name='message'
          id='message'
          value={message}
          onChange={e => setMessage(e.target.value)}
          className='w-1/2 rounded-lg border-2 p-2 focus:outline-none'
        />
        <button
          className='ml-3 rounded-lg bg-sky-400 px-3 py-2 text-lg '
          onClick={() => sendMessage()}
        >
          send
        </button>
      </div>
      <div className='flex h-[80vh] w-full  justify-center gap-4 px-4'>
        <div className=' flex w-full flex-col'>
          <div>sent</div>
          <div className='h-1/2 overflow-auto rounded-lg bg-slate-500'>
            <ul>
              {sentMessages?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className='flex w-full flex-col'>
          <div>recieved</div>
          <div className='h-1/2   overflow-auto rounded-lg bg-slate-500 '>
            <ul>
              {messageRecieved?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
