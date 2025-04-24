import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/v1/transaction/');
}

const create = data => {
    return httpClient.post("/api/v1/transaction/", data);
}

const find = id, date => {
    return httpClient.get(`/api/v1/transaction/find?id=${id}?date=${date}`);
}

const get = id => {
    return httpClient.get(`/api/v1/transaction/${id}`);
}

const update = data => {
    return httpClient.put('/api/v1/transaction/', data);
}

const remove = id => {
    return httpClient.delete(`/api/v1/transaction/${id}`);
}
export default { getAll, create, get, find, update, remove };
