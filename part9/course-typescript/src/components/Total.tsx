/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';

interface TotalProp {
  total: number
}

const Total : React.FC<TotalProp> = (props) => {

    return (

        <p>
        Number of exercises{" "}
        {props.total}
      </p>

    )
}

export default Total
