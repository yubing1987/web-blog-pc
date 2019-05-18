import Request from "../utils/Request"

let request = new Request();

class BookApi {
    static getBooks(page, key){
        return request.get("/api/manage/group/list.json", {type: 'BOOK', page: page, size: 10, key: key});
    }

    static getCollectionList(page, key){
        return request.get("/api/manage/group/list.json", {type: 'COLLECTION', page: page, size: 10, key: key});
    }

    static addBook(book){
        book["type"] = 'BOOK';
        return request.post("/api/manage/group.json", book);
    }

    static addCollection(book){
        book["type"] = 'COLLECTION';
        return request.post("/api/manage/group.json", book);
    }

    static editBook(book){
        return request.post("/api/manage/group/edit.json", book);
    }

    static delBook(id){
        return request.post("/api/manage/group/" + id + "/del.json");
    }

    static getGroupArticle(id){
        return request.get("/api/group/ref/" + id + "/tree.json");
    }

    static addGroupArticle(ref){
        return request.post("/api/manage/group/ref.json", ref);
    }

    static delGroupArticle(id){
        return request.post("/api/manage/group/ref/" + id + "/del.json");
    }

    static editGroupArticle(ref){
        return request.post("/api/manage/group/ref/edit.json", ref);
    }
}

export default BookApi;