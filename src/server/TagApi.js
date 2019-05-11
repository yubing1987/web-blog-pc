import Request from "../utils/Request"

let request = new Request();

class TagApi {
    static getTags(){
        return request.get("/api/manage/tag/");
    }
}

export default TagApi;