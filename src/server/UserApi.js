import Request from "../utils/Request"

let request = new Request();
class UserApi {
    static login(name, pwd){
        return request.get("/api/login?name=" + name +"&password=" + pwd);
    }
}

export default UserApi;