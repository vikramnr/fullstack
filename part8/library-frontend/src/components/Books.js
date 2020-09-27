import React, {useEffect, useState} from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import DisplayBooks from "./DisplayBooks";

const Books = ({ show }) => {
  const result = useQuery(ALL_BOOKS);
  const [books, setBooks] = useState([])
  const [filter, setFilter] = useState('')
  let filterBooks = filter ? books.filter(b => b.genres.includes(filter)) : books 

  useEffect(() => {
    if(result.data) {
      setBooks(result.data.allBooks)
    }
  },[result.data])
  
  
  if (result.loading && show) {
    return <>loding...please wait</>;
  }

  if (result.data && show) {
    let genres = []
    result.data.allBooks
      .map(b => b.genres)
      .map(g => Array.isArray(g) ? genres.push(...g) : genres.push(g))
    genres = genres.filter((g,i,gArr) => gArr.indexOf(g)===i)

    return (
      <div>
        <h2>books</h2>
        in genres {filter ? filter : 'all-no filters'}
        <DisplayBooks book={filterBooks}/>
        <div>
          {genres.map(g => 
            <button key={g} onClick={({target}) => setFilter(target.value)}  value={g}> {g} </button> 
          )}
          <button key={'allgener'} onClick={() => setFilter('')}  value={''}> allgenres </button> 
        </div>
      </div>
    );
  }
  return (<></>)
};

export default Books;
