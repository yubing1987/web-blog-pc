import Request from "../utils/Request"

let request = new Request();
class ArticleApi{
    static queryArticleList(page, size, key){
        return request.get("/api/manage/article/list.json",{page: page, size: size, key: key});
    }

    static queryPublishedArticleList(page, size, key){
        return request.get("/api/article/list/published",{page: page, size: size, key: key});
    }

    static getArticleById(id){
        return request.get("/api/article/" + id);
    }

    static deleteArticle(id){
        return request.post("/api/article/" + id +"/deleted");
    }

    static articleEdited(article){
        return request.post("/api/article/edited", article);
    }

    static addArticle(article){
        return request.post("/api/article/add", article);
    }

    static articlePublished(article){
        return request.post("/api/article/" + article.id + "/published/true");
    }

    static getRelatedArticle(id){
        return request.get("/api/relation/" + id);
    }

    static getUnrelatedArticle(id, key){
        return request.get("/api/relation/unrelated/" + id,{key: key});
    }

    static addRelatedArticle(id1, id2){
        return request.post("/api/relation/create/" + id1 + "/" + id2);
    }

    static delRelatedArticle(id1, id2){
        return request.post("/api/relation/deleted/" + id1 + "/" + id2);
    }

    static updateArticleTag(id, tag){
        return request.post("/api/article/tag/" + id, tag);
    }
}

export default ArticleApi;