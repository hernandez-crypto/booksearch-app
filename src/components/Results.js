import React from 'react';
import Item from './Item';

function Results(books) {
    return(
      <ul className="bookSearchResults">
        {books.store.map((item, index) => {
          return <Item item={item} key={index}/>
        })}
      </ul>
    )
  }

export default Results
