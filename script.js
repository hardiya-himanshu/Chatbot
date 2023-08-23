const sendChatBtn = document.querySelector(".chat_input span");
const chatInput = document.querySelector(".chat_input textarea");
const chatbox = document.querySelector(".chatbox");

let userInput;

const createChat = (message,className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing"? `<p>${message}</p>`:`<span class="material-symbols-outlined">robot_2</span>
    <p>${message}</p>`;
    chatLi.innerHTML=chatContent;
    return chatLi;
}

const sendChat = () => {
    userInput = chatInput.value.trim();
    if(!userInput){
        return;
    }
    let newChat = createChat(userInput,"outgoing");
    chatbox.appendChild(newChat);

    
    setTimeout(()=>{
        chatbox.appendChild(createChat("...", "incoming"));
    }, 500);
}

sendChatBtn.addEventListener("click", sendChat);