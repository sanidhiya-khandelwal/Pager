import React from 'react'
import './Form.css'

function Form() {
    const [name, setName] = React.useState('')
    const [message, setMessage] = React.useState('')

    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, " : ", message);

        const formName = name.trim()
        const formMesssage = message.trim()

        if (formName === '' || formMesssage === '') {
            alert('Please fill all the details')
            return;
        }
        if (formName.length < 3) {
            alert('Name must be atleast 3 characters long')
            return;
        }
        if (formMesssage.length < 5) {
            alert('Message should be atleast 10 characters long')
            return;
        }

        //POST MESSAGE
        fetch('https://project-pager-da180-default-rtdb.asia-southeast1.firebasedatabase.app/message.json',
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json;charset=UTF-8"
                },
                body: JSON.stringify(
                    {
                        userName: name,
                        userMessage: message
                    }),
            }).then(      //we did this so that after mssg is sent the input fields could become empty (promises me then use hota h)
                (response) => {
                    if (response.status === 200) {
                        alert('Message Sent')
                        setName('')                         //also do value={name} while taking input i.e inital name from useState
                        setMessage('')                      //also do value={message} while taking input  i.e initail mssg from useState
                    }
                }
            )
        console.log('submitted');
    }
    return (
        <div className='form-container'>
            <div className="form-header">
                Send message to Sanidhya
            </div>
            <div className='form-input'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                <input type="text" placeholder='john doe' onChange={handleNameChange} value={name} />
            </div>
            <div className='form-input'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
                <input type="text" placeholder='say something about me :)' onChange={handleMessageChange} value={message} />
            </div>
            <div className='form-btn'>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}
export default Form