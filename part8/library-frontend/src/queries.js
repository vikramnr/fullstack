import { gql } from "@apollo/client";

export const ALL_AUTHORS = gql`
query {
    allAuthors {
      name
      bookCount
      born
    }
}
`

export const ME = gql`
query {
  me {
    book{
      title
      published
      genres
      author {
        name
      }
      id
    }
    genre
  }
}
`

export const ALL_BOOKS = gql`
query{
    allBooks{
      title
      published
      genres
      author {
        name
      }
      id
    }
}
`

export const ADD_BOOK = gql`
mutation addBook($title: String, $author: String, $published: Float, $genres:[String]) {
 addBook(
    title:$title
    author:$author
    published: $published
    genres: $genres
 ) {
     title
     author {
       name
     }
     published
     genres
    }
    }
`
export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String, $year: Float) {
  editAuthor(
     name:$name
     setBornTo:$year
  ) {
    name
    bookCount
    born
     }
  }
`

export const LOGIN =  gql`
mutation loginUser($username: String!, $password: String!){
  loginUser(username: $username, password: $password) {
    value
  }
}
`
// mutation createPerson($name: String!, $street: String!, $city: String!, $phone: String) {
//     addPerson(
//       name: $name,
//       street: $street,
//       city: $city,
//       phone: $phone
//     ) {
//       name
//       phone
//       id
//       address {
//         street
//         city
//       }
//     }
//   }
//   `

