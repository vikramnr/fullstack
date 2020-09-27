import { useQuery } from '@apollo/client'
import React from 'react'

import { ME } from '../queries'
import DisplayBooks from './DisplayBooks'

const Recomended = ({show}) => {
    const result = useQuery(ME)
    console.log(result.data)

    if (result.loading && show) {
        return <>loding...please wait</>;
      }
      if (result.data && show) {
        return (
          <div>
            <h2>recommendations</h2>
            your recomended readings under genre <strong>{result.data.me.genre}</strong>
            <DisplayBooks book={result.data.me.book}/>
          </div>
        );
      }
      return (<></>)
}

export default Recomended
