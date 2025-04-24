import httpClient from "../http-common";

const getAll = () => {
    return httpClient.get('/api/v1/client/');
}

const create = data => {
    return httpClient.post("/api/v1/client/", data);
}

const get = id => {
    return httpClient.get(`/api/v1/client/${id}`);
}

const getByName = name => {
    return httpClient.get(`/api/v1/client/?name=${name}`);
}

const getByRut = rut => {
    return httpClient.get(`/api/v1/client/?rut=${rut}`);
}

const getAllByBirthday = birthday => {
    return httpClient.get(`/api/v1/client/?birthdate=${birthday}`);
}

const update = data => {
    return httpClient.put('/api/v1/client/', data);
}

const remove = id => {
    return httpClient.delete(`/api/v1/client/${id}`);
}
export default { getAll, create, get, 
	getByName, getAllByBirthday, getByRut,
	update, remove };
