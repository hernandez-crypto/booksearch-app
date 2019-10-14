import React from 'react';
import Search from './components/Search';
import Results from './components/Results';

class App extends React.Component {
  state = {
    store: [],
    form: {
      searchParameter: null,
      printType: 'all',
      bookType: 'noFilter',
    },
  }
  fetchBooks = () => {
    const API = 'https://www.googleapis.com/books/v1/volumes?';
    let params = [];
    if (this.state.form.searchParameter) {
      params.push(`q={${this.state.form.searchParameter}}`);
      params.push(`printType=${this.state.form.printType}`);
      if (this.state.form.bookType !== 'noFilter') {
        params.push(`filter=${this.state.form.bookType}`);
      }
      let endURL = params.join('&');
      fetch(API + endURL)
        .then(data => {
          return data.json()
        })
        .then(data => {
          const newBooks = data.items.map(book => {
            return {
              title: book.volumeInfo.title,
              author: (book.volumeInfo.authors ? book.volumeInfo.authors.join(' ') : 'Name not Available'),
              price: (book.saleInfo.listPrice ? book.saleInfo.listPrice.amount : 'Price Not Avaliable'),
              description: book.volumeInfo.description,
              thumbnail: book.volumeInfo.imageLinks.smallThumbnail,
            }
          })
          return newBooks;
        })
        .then(books => {
          this.setState({
            store: books
          })
        })
    }
  }

  search = (event) => {
    event.preventDefault();
    let newForm = { ...this.state.form };
    newForm.searchParameter = event.target[0].value;
    event.target[0].value = '';
    this.setState({form: newForm},() => this.fetchBooks());
  }

  filterEvent = (type, value) => {
    let filteredForm = { ...this.state.form };
    filteredForm[type] = value;
    this.setState({form: filteredForm},() => this.fetchBooks());
  }

  render() {
    return (
      <main className='App'>
        <h1>Google Book Search</h1>
        <Search form={this.state.form} filterEvent={this.filterEvent} search={this.search} />
        <Results store={this.state.store} />
      </main>
    );
  }
}

export default App;