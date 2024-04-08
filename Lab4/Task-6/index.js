//task 6 funk 6
function libraryManagement() {
    let books = []; // Масив книг

    // Функція для створення нової книги та додавання її до бібліотеки
    function addBook(title, author, genre, pages) {
        let newBook = {
            title: title,
            author: author,
            genre: genre,
            pages: pages,
            isAvailable: true // Нова книга доступна за замовчуванням
        };
        books.push(newBook);
    }

    // Функція для видалення книги з бібліотеки за назвою
    function removeBook(title) {
        books = books.filter(book => book.title !== title);
    }

    // Функція для пошуку книги за автором
    function findBooksByAuthor(author) {
        return books.filter(book => book.author === author);
    }

    // Функція для позначення книги як взятої чи повернутої
    function toggleBookAvailability(title, isBorrowed) {
        let book = books.find(book => book.title === title);
        if (book) {
            book.isAvailable = !isBorrowed;
        }
    }

    // Функція для сортування книг за кількістю сторінок
    function sortBooksByPages() {
        books.sort((a, b) => a.pages - b.pages);
    }

    // Функція для зведення статистики про книги
    function getBooksStatistics() {
        let totalBooks = books.length;
        let availableBooks = books.filter(book => book.isAvailable).length;
        let borrowedBooks = totalBooks - availableBooks;
        let totalPages = books.reduce((total, book) => total + book.pages, 0);
        let averagePages = totalBooks > 0 ? totalPages / totalBooks : 0;

        return {
            totalBooks: totalBooks,
            availableBooks: availableBooks,
            borrowedBooks: borrowedBooks,
            averagePages: averagePages
        };
    }

    return {
        addBook,
        removeBook,
        findBooksByAuthor,
        toggleBookAvailability,
        sortBooksByPages,
        getBooksStatistics
    };
}

//task 6 main 6

let library = libraryManagement();

library.addBook("Book 1", "Author 1", "Fiction", 200);
library.addBook("Book 2", "Author 2", "Non-fiction", 300);

console.log(library.getBooksStatistics()); // Перевірка статистики