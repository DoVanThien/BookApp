import { gql } from "@apollo/client";

export const searchQuery = gql`
query SearchBooks($q: String) {
  googleBooksSearch(q: $q, country: "US") {
    items {
      id
      volumeInfo {
        authors
        averageRating
        description
        imageLinks {
          thumbnail
        }
        title
        pageCount
        language
        categories
        industryIdentifiers {
          identifier
        }
      }
    }
    totalItems
  }
  openLibrarySearch(q: $q) {
    docs {
      author_name
      title
      cover_edition_key
      isbn
      number_of_pages_median
      language
      type
      first_sentence
    }
    numFound
  }
}
`;