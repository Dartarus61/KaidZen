import axios from "axios";

export default class PostServis {
    static async getAllPosts(){
        const respons = await axios.get("/api/allposts")
        return respons.data;  
    }
    static async getMyPost(id){
        const respons = await axios.post("/api/offer/myof", {
            id: id,
          })
        return respons.data;  
    }
    static async getUsers(){
        const respons = await axios.get("/api/users")
        return respons.data;  
    }
    static async setChange(id, role, area){
        const respons = await axios.post("/api/users/changerole", {
            id: id,
            role: role,
            area: role === "user" ? null : area,
        })
        return respons.data;  
    }
    static async getPostFromArea(area){
        const respons = await axios.post("/api/offer/masters", {
            area: area,
        })
        console.log(respons.data, area);
        return respons.data; 
    }
    static async getPostFromAreaFalse(area){
        const respons = await axios.post("api/offer/masters/false", {
            area: area,
        })
        console.log(respons.data, area);
        return respons.data; 
    }
    static async getCommentTrue(id, ctx, userId){
        console.log(id, ctx, userId);
        const respons = await axios.post("api/offer/master/setcomtrue", {
            id: id,
            ctx: ctx,
            userId: userId,
        })
        return respons.data; 
    }
    static async getCommentFalse(id, ctx, userId){
        const respons = await axios.post("api/offer/master/setcom", {
            id: id,
            ctx: ctx,
            userId: userId,
        })
        return respons.data; 
    }
    static async switchData(name, surname, secondName, numberGroup, login, id){
        await axios.post("api/changedata", {
            name: name,
            surname: surname,
            secondname: secondName,
            group: numberGroup,
            login: login,
            id: id,
          });
    }
    static async switchPassword(password){
        await axios.post("", {
            password: password,
          });
    }
}