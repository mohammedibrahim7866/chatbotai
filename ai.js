const chatbox = document.getElementById("chat-bot")
const userinput = document.getElementById("user-input")
const api_key ="AIzaSyB5cYbCzViFPLg6U8MF6XL1AG5MKQk5170"
async function sendmessage() {
    const message = userinput.value.trim();
    if(!message) return;
    chatbox.innerHTML+=`<div class="user-msg">${message}</div>`;
    console.log(message)
    userinput.value= "";

    chatbox.innerHTML += `<div class="ai-msg" id="loading">Thinking...</div>`;
    chatbox.scrollTop = chatbox.scrollHeight;
    
try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${api_key}`,
        {
            method: "POST",
            headers: {"content-type":"application/json"},
            body: JSON.stringify({
                contents:[{parts:[{text: message}]}]
            })
        }
    );

    const data = await response.json()
    document.getElementById("loading").remove();

    const aitext = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
    chatbox.innerHTML += `<div class ="ai-msg">${aitext}</div>`
    chatbox.scrollTop = chatbox.scrollHeight;
} catch (error) {
    document.getElementById
    chatbox.innerHTML += `<div class="ai-msg"> Error:${error.message}</div>`
}
    
    
}