import axios from "axios";
import {userToken} from "@/store.js";

class UploadFilesService {
    upload(file) {
        let formData = new FormData();

        formData.append("image", file);
        axios.defaults.headers.common["Authorization"] = `Bearer ${userToken}`
        axios.defaults.headers.common["Content-Type"] = "multipart/form-data"
        return axios.post("http://localhost:8080/images/post", formData)
    }

    getFiles() {
        return axios.get("http://localhost:8080/images/get");
    }
}

export default new UploadFilesService();