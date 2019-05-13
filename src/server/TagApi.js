import Request from "../utils/Request"

let request = new Request();

class TagApi {
    static getTags(){
        return request.get("/api/manage/tag.json");
    }

    static addTag(tag){
        return request.post("/api/manage/tag.json", {tag: tag});
    }

    static editTag(id, tag){
        return request.post("/api/manage/tag/edit.json", {id: id, tag: tag});
    }

    static delTag(id){
        return request.post("/api/manage/tag/" + id +"/del.json");
    }
}

export default TagApi;