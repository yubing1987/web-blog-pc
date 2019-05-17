import Request from "../utils/Request"

let request = new Request();
class ArticleApi{
    static queryArticleList(page, size, key, hideLoading){
        return request.get("/api/manage/article/list.json",{page: page, size: size, key: key}, hideLoading);
    }

    static getArticleById(id){
        return request.get("/api/article/" + id + ".json");
    }

    static deleteArticle(id){
        return request.post("/api/manage/article/" + id +"/del.json");
    }

    static articleEdited(article){
        return request.post("/api/manage/article/edit.json", article);
    }

    static addArticle(article){
        return request.post("/api/manage/article.json", article);
    }
}

export default ArticleApi;