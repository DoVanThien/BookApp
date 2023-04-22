type Book = { 
    image: string;
    title: string;
    authors: string[];
    isbn: string;
    rating: number;
    description: string;
    pageNumber: number;
    language: string[];
    type: tring[];
    backgroundColor: string;
}

type BookProvider = "googleBooksSearch" | "openLibrarySearch"