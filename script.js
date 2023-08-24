const sendChatBtn = document.querySelector(".chat_input span");
const chatInput = document.querySelector(".chat_input textarea");
const chatbox = document.querySelector(".chatbox");

let userInput;
const API_KEY = "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";

const createChat = (message,className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing"? `<p>${message}</p>`:`<span class="material-symbols-outlined">robot_2</span>
    <p>${message}</p>`;
    chatLi.innerHTML=chatContent;
    return chatLi;
}

const generateResponse = (incomingChat) =>{
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChat.querySelector("p");

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "Authorization" : `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userInput}]
        })
    }

    fetch(API_URL, requestOptions).then(res => res.json()).then(data=>{
        messageElement.textContent = data.choices[0].message.content;
        // console.log(data);
    }).catch((error)=>{
        messageElement.textContent = "Oops! Something went wrong.";

    })
}

const sendChat = () => {
    userInput = chatInput.value.trim();
    if(!userInput){
        return;
    }
    let newChat = createChat(userInput,"outgoing");
    chatbox.appendChild(newChat);

    
    setTimeout(()=>{
        const incomingChat = createChat("...", "incoming")
        chatbox.appendChild(incomingChat);
        generateResponse(incomingChat);
    }, 300); 
}

sendChatBtn.addEventListener("click", sendChat);