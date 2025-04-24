import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/v1/feeType/');
}

const create = data => {
    return httpClient.post("/api/v1/feeType/", data);
}

const get = id => {
    return httpClient.get(`/api/v1/feeType/${id}`);
}

const getByLap = lap => {
    return httpClient.get(`/api/v1/feeType/?lap=${lap}`);
}

const getAllCat = () => {
    return httpClient.get(`/api/v1/feeType/allCat`);
}

const update = data => {
    return httpClient.put('/api/v1/feeType/', data);
}

const remove = id => {
    return httpClient.delete(`/api/v1/feeType/${id}`);
}
export default { getAll, create, get, getByLap, getAllCat, update, remove };
