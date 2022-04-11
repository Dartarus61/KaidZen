import axios from "axios";

export default class PostServis {
    static async getMyPost(id){
        const respons = await axios.post("/api/offer/myof", {
            id: id,
          })
        return respons.data;  
    }
}