import axios from "axios";

const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:8080/api/files";

export const uploadFile = (file, uploadedBy) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("uploadedBy", uploadedBy);
    return axios.post(`${API_BASE_URL}/upload`, formData);
};

export const getFiles = () => {
    return axios.get(`${API_BASE_URL}`);
};

export const getFileContent = (fileId) => {
    return axios.get(`${API_BASE_URL}/view/${fileId}`);
};
