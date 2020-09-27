import { useMutation, useQuery } from "@apollo/client";
import React, { useState,useEffect } from "react";
import Select from "react-select";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const Authors = ({ show }) => {
  const result = useQuery(ALL_AUTHORS);
  const [selectedOption, setSelectedOption] = useState();
  const [year, setYear] = useState("");
  const options = []
  
  useEffect(() => {
    if (result.data && result.data !== null) {
      result.data.allAuthors.forEach(a => options.push({value: a.name, label: a.name}))
    }
  }, [result.data])

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = (e) => {
    e.preventDefault();
    console.log(selectedOption)
    editAuthor({ variables: { name: selectedOption.value, year: parseFloat(year) } });
    setYear("");
  };

  if (result.loading && show) {
    return <>loading...please wait</>;
  }
  if (result.data && show) {
    return (
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {result.data.allAuthors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>Set birthyear</h2>
        <form onSubmit={submit}>
          <div>
          author{" "}
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
            />
            
          </div>
          <div>
            year{" "}
            <input
              type="number"
              value={year}
              onChange={({ target }) => setYear(target.value)}
            />
          </div>
          <button type="submit">set now!!</button>
        </form>
      </div>
    );
  }
  return <></>;
};

export default Authors;
