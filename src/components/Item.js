import React from 'react';

function Item(book) {
  return(
    <li>
      <h2>{book.item.title}</h2>
      <div>
        <img src={book.item.thumbnail} alt="book-pic"/>
        <div>
          <span>Author:{book.item.author}</span>
          <p>{book.item.description}</p>
        </div>
      </div>
    </li>
  )
}


export default Item;