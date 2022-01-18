import axios from 'axios'
 import { MAIN_URL } from './Url'
 let token=localStorage.getItem('_token');
export function addUser(data){
    return axios.post(`${MAIN_URL}adduser`,data);
}
export function login(data){
    return axios.post(`${MAIN_URL}login`,data);
}
export function getPosts(){
    return axios.get(`${MAIN_URL}fetchpost`,
    );
}
export function getPopularpost(){
    return axios.get(`${MAIN_URL}fetchpopularpost`,
    );
}

export function getProduct(){
    return axios.get(`${MAIN_URL}fetchproduct`,
    );
}
export function Email(data){
    return axios.post(`${MAIN_URL}email`,data
    );
}
export function ChangePassword(data){
    return axios.post(`${MAIN_URL}changepassword`,data
    // {headers:{"Authorization":`Bearer ${token}`}}
    );
}
export function getsingleproduct(data){
    return axios.get(`${MAIN_URL}singleproduct/`+data
    // {headers:{"Authorization":`Bearer ${token}`}}
    );
}

export function updateProfile(){
    return axios.post(`${MAIN_URL}updateprofile`,{
       headers:{"Authorization":`Bearer ${token}`}});
}

export function AddItem(data){
    return axios.post(`${MAIN_URL}additem`,data
    // {headers:{"Authorization":`Bearer ${token}`}}
    );
}

//profile fileds
export function addAddress(data) {
    console.log(data)
    return axios.post(`${MAIN_URL}addaddress`, data)
}
export function editAddress(data) {
    console.log(data)
    return axios.post(`${MAIN_URL}editaddress`, data)
}
export function deleteAddr(addr) {
    return axios.delete(`${MAIN_URL}deleteadd/${addr}`);
}

export function updProfile(id, data) {
    console.log(data)
    return axios.put(`${MAIN_URL}updprofile/${id}`, data);

}
export function getProfile(email) {
    return axios.get(`${MAIN_URL}profile/${email}`,
    {headers:{"Authorization":`Bearer ${token}`}}
    );
}
export function getSocialProfile(email) {
    return axios.get(`${MAIN_URL}socialprofile/${email}`);
}
export function getaddresses(email) {
    return axios.get(`${MAIN_URL}getaddress/${email}`,
    {headers:{"Authorization":`Bearer ${token}`}}
    );
}
export function changePass(id, data) {
    return axios.put(`${MAIN_URL}changepass/${id}`, data);
}
//get orderdata
export function getOrderdata(email) {
    return axios.get(`${MAIN_URL}getorder/${email}`);
}
export function createOrders(data) {
    console.log(data)
    return axios.post(`${MAIN_URL}carddetails`, data)
}
export function cardaddress(data) {
    console.log(data)
    return axios.post(`${MAIN_URL}cardaddress`, data, 
    {headers: {"Authorization":`Bearer ${token}`}}
    )
}
export function authentication(token) {
    return axios.get(`${MAIN_URL}loginfirst`, {
        headers: { "authorization": `Bearer ${token}` }
    });
}
export function getinvoice(orderno) {
    return axios.get(`${MAIN_URL}getinvoice/${orderno}`,
    {headers:{"Authorization":`Bearer ${token}`}}
    );
}
export function sendMail(data) {
    return axios.post(`${URL}sendmail`, data, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}
export function RatingStar(id, data) {
    console.log(data);
    return axios.put(`${MAIN_URL}Rating/${id}`, data);
}

