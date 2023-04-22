import { COLORS } from "../constants";

export const parseBook = (item: any, provider: BookProvider): Book => {
    if (provider === "googleBooksSearch") {
      return {
        image: item.volumeInfo.imageLinks?.thumbnail,
        title: item.volumeInfo?.title,
        authors: item.volumeInfo?.authors,
        isbn: item.volumeInfo.industryIdentifiers?.[0]?.identifier,
        rating: item.volumeInfo?.averageRating,
        description: item.volumeInfo?.description,
        pageNumber: item.volumeInfo?.pageCount,
        language: item.volumeInfo.language?.[0],
        type: item.volumeInfo.categories?.[0],
        backgroundColor: COLORS.lightGray4,
      };
    }
    return {
      image: `https://covers.openlibrary.org/b/olid/${item.cover_edition_key}-M.jpg`,
      title: item.title,
      authors: item?.author_name,
      isbn: item.isbn?.[0],
      rating: 0,
      description: item?.first_sentence,
      pageNumber: item?.number_of_pages_median,
      language: item.language?.[0],
      type: item?.type,
      backgroundColor: COLORS.lightGray4,
    };
  };