const container = document.querySelector(".container");

fetch("/books").
  then(res => res.json()).
  then(res => {
    console.log(res);
    res.forEach( el => { 
        let book = document.createElement("div");
          book.id='book_'+el.id;
          book.className = 'book';
          book.setAttribute('onclick', 'bookInfo(this)');


         let html = `
         <div class="title"> ${el.title} </div>
      <div class="desc"> Description: ${el.desc} </div>
      <div  class="author"> Author: ${el.author} </div>
      <div class="published">Published: ${el.published} </div>`;
          book.insertAdjacentHTML('beforeEnd',html);
          console.log(container);
          console.log(book);
          container.appendChild(book);

    })
  }).
  catch(e => console.error(e));


  function bookInfo(el){
    let id = el.id.replace("book_","");
   location.href = "./book/"+id;
  }