import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/v1/discount/');
}

const getAllCat = () => {
    return httpClient.get('/api/v1/discount/allCat');
}

const getByCat = (cat) => {
    return httpClient.get('/api/v1/discount/byCat?cat=${cat}');
}

const create = data => {
    return httpClient.post("/api/v1/discount/", data);
}

const get = id => {
    return httpClient.get(`/api/v1/discount/${id}`);
}

const update = data => {
    return httpClient.put('/api/v1/discount/', data);
}

const remove = id => {
    return httpClient.delete(`/api/v1/discount/${id}`);
}
export default { getAll, getAllCat, getByCat, create, get, update, remove };
