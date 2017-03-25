let id = +location.pathname.replace("/book/","");
console.log(id);

fetch("get/"+id).
  then(res => res.json()).
  then(res => {
    console.log(res);
    document.querySelector("#book-title").innerText = res.title;
    document.querySelector("#book-desc").innerText = res.desc;
    document.querySelector("#author").innerText = res.author;
    document.querySelector("#published").innerText = res.published;

}).catch(e => console.error(e));


 function deleteBook(){
    fetch(`/${id}`, {
    method: "DELETE"
  }).
  then(res => res.json()).
  then(res => location.href = '/').
  catch(e => console.error(e));
};