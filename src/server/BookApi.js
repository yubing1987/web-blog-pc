import Request from "../utils/Request"

let request = new Request();

class BookApi {
    static getBooks(page, key){
        return request.get("/api/manage/group/list", {type: 'BOOK', page: page, size: 10, key: key});
    }

    static addBook(book){
        book["type"] = 'BOOK';
        return request.post("/api/manage/group", book);
    }
}

export default BookApi;