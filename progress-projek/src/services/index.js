import GetDataAPI from "./Get";
import PostDataAPI from "./Post";
import DeleteDataAPI from "./Delete";

// API - GET
const getListStudents = () => GetDataAPI("daftarSiswa?_sort=nama&_order=asc");

// API - POST
const postListStudents = (postData) => PostDataAPI("daftarSiswa", postData);

// API - DELETE
const deleteListStudents = (deleteData) => DeleteDataAPI("daftarSiswa", deleteData);

const API = {
  //Inisialisasi functuion-function yang akan di sediakan global API
  getListStudents,
  postListStudents,
  deleteListStudents,
};

export default API;
