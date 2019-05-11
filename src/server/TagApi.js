import Request from "../utils/Request"

let request = new Request();

class TagApi {
    static getTags(){
        return request.get("/api/manage/tag/");
    }

    static addTag(tag){
        return request.post("/api/manage/tag", {tag: tag});
    }
}

export default TagApi;