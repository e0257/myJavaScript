const form = document.querySelector("form");

form.addEventListener("submit", (ev) => {
  ev.preventDefault();

  let title = form.querySelector("#title").value;
  let desc = form.querySelector("#desc").value;
  let author = form.querySelector("#author").value;
  let published = form.querySelector("#published").value;
  

  fetch("/add-book", {
    method: "POST",
    body: JSON.stringify({ title, desc, author, published }),
    headers: {
      "content-type": "application/json"
    }
  }).
  then(res => res.json()).
  then(res => {
    console.log(res);
    form.querySelector("#title").value = "";
    form.querySelector("#desc").value = "";
    form.querySelector("#author").value = "";
    form.querySelector("#published").value = "";
    let mes = form.querySelector("#message");
          mes.innerText = "Book added";
          mes.style.display = "block";
    console.log(mes);
  }).
  catch(e => console.error(e));
});