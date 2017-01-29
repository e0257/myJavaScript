;(function() {
  "use strict";

  const ws = io("http://178.62.203.188:8888");
  let $messagesContainer = document.getElementById("messages-container");

  ws.on("chat message", data => {

    if(data.type === "TEXT" && data.name) {
      let $p = document.createElement("p");
      $p.textContent = data.message;
      $p.setAttribute("data-name", data.name);
      $messagesContainer.appendChild($p);

       storadgeContent(data.name);
    }

    if(data.type === "IMAGE" && data.name) {
      let $p = document.createElement("p"),
          $img = document.createElement("img");
      
      fetch("http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC").
        then(res => res.json()).
        then(res => {
            let result = res.data.map(image => ({
                 id: image.id,
                 url: image.images.fixed_height.url
              })).find( el =>
                  el.id === data.message);
            $img.src = result.url;
            $p.appendChild($img);
            $p.setAttribute("data-name", data.name);
            $messagesContainer.appendChild($p);

            storadgeContent(data.name);
        });  
 
     }
  
  });

  let storageData = JSON.parse(localStorage.getItem("data"));
    if (!storageData) storageData = {};

  let $container = document.getElementById("messages-container");
  let $chatForm = document.getElementById("chat-form");
  let $loginForm = document.getElementById("login-form");
  let $chatMessageInput = document.getElementById("chat-message");
  let userName = document.getElementById("login");
  let $gifsContainer = document.getElementById("gifs-container");
  let login = storageData.name;


//if already login
  if (login) {
    $loginForm.hidden = true;
    $chatForm.hidden = false;
    $chatMessageInput.disabled = false;
  };
// if previous content exists
  if(storageData.content) $container.insertAdjacentHTML('beforeEnd', storageData.content);


  $chatForm.addEventListener("submit", onSendMessage);
  $loginForm.addEventListener("submit", onLogin);
  $gifsContainer.addEventListener("click", onSendImage);

  function onSendImage(ev) {
    if(ev.target.nodeName !== "IMG") return;

    let imageId = ev.target.dataset.imageId,
        imageURL= ev.srcElement.currentSrc;

    ws.emit("chat message", { message: imageId, name: login, type: "IMAGE"});
  }

  function onLogin(ev) {
    ev.preventDefault();
    
    let name = userName.value.trim();

    if(!name || name.length > 30) return;

    login = name;
    userName.value = "";
    $loginForm.hidden = true;
    $chatForm.hidden = false;
    $chatMessageInput.disabled = false;
    document.querySelector(".chat-container").style = "justify-content: space-between"
  }

  function onSendMessage(ev) {
    ev.preventDefault();

    let message = $chatMessageInput.value.trim();

    if(!message) return;

    ws.emit("chat message", { message, name: login, type: "TEXT" });
    $chatMessageInput.value = "";
  }

  fetch("http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC").
    then(res => res.json()).
    then(res => {
      let result = res.data.map(image => ({
        id: image.id,
        url: image.images.fixed_height.url
      }));

      renderImages(result);
    });

  function renderImages(images) {
    let $container = document.getElementById("gifs-container"),
        fragment = document.createDocumentFragment();

    images.forEach(image => {
      let $img = document.createElement("img");

      $img.src = image.url;
      $img.setAttribute("data-image-id", image.id);
      fragment.appendChild($img);
    });

    $container.appendChild(fragment);
  }

  function storadgeContent(name){
      let content = $container.innerHTML;
      let data = {
        name: name,
        content: content
      };
      
      localStorage.setItem("data", JSON.stringify(data));
  }

})();















