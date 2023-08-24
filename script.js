const sendChatBtn = document.querySelector(".chat_input span");
const chatInput = document.querySelector(".chat_input textarea");
const chatbox = document.querySelector(".chatbox");
const chatbotToggler = document.querySelector(".toggle_chatbot");
const chatbotCloseBtn = document.querySelector(".title header span");

let userInput;
const API_KEY = "your_API_key";
const inputInitHeight = chatInput.scrollHeight;

const createChat = (message,className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing"? `<p></p>`:`<span class="material-symbols-outlined">robot_2</span>
    <p></p>`;
    chatLi.innerHTML=chatContent;
    chatLi.querySelector("p").textContent = message;
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
        messageElement.classList.add("error");
        messageElement.textContent = "Oops! Something went wrong.";
    }).finally(()=>{
        chatbox.scrollTo(0,chatbox.scrollHeight)
    }); 
}

const sendChat = () => {
    userInput = chatInput.value.trim();
    if(!userInput){
        return;
    }
    chatInput.value="";
    chatInput.style.height=`${inputInitHeight}px`;

    let newChat = createChat(userInput,"outgoing");
    chatbox.appendChild(newChat);
    chatbox.scrollTo(0,chatbox.scrollHeight);
    
    setTimeout(()=>{
        const incomingChat = createChat("...", "incoming")
        chatbox.appendChild(incomingChat);
        chatbox.scrollTo(0,chatbox.scrollHeight);
        generateResponse(incomingChat);
    }, 300); 
}

chatbotToggler.addEventListener("click", ()=>{
    document.body.classList.toggle("show_chatbot")
});

chatbotCloseBtn.addEventListener("click", ()=>{
    document.body.classList.remove("show_chatbot")
});

chatInput.addEventListener("input",()=>{
    chatInput.style.height=`${inputInitHeight}px`;
    chatInput.style.height=`${chatInput.scrollHeight}px`;
})

chatInput.addEventListener("keydown",(e)=>{
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth>800){
        e.preventDefault();
        sendChat();
    }
})

sendChatBtn.addEventListener("click", sendChat);
