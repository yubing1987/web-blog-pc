import Request from "../utils/Request"

let request = new Request();
class ArticleApi{
    static queryArticleList(page, size, key){
        return request.get("/api/manage/article/list",{page: page, size: size, key: key});
    }

    static getArticleById(id){
        return request.get("/api/article/" + id);
    }

    static deleteArticle(id){
        return request.post("/api/manage/article/" + id +"/del");
    }

    static articleEdited(article){
        return request.post("/api/manage/article/edit", article);
    }

    static addArticle(article){
        return request.post("/api/manage/article", article);
    }
}

export default ArticleApi;