import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./css/Dashboard.css";
import PostDataTeachers from "./insight/postTeacherAdmin";
import sideBar from "./js/collapseSidebar";
import renderTime from "./js/currentTime";
import searchBar from "./js/searchBar";

class Admin extends Component {
  handleReset = () => {
    Array.from(document.querySelectorAll("input, textarea, select")).forEach((input) => (input.value = ""));
    this.setState({
      insertData: {
        id: 1,
        nip: "",
        nama: "",
        tgllahir: "",
        jeniskelamin: "",
        pengajar: "",
        status: "",
      },
    });
  };
  state = {
    daftarGuru: [],
    insertData: {
      id: 1,
      nip: "",
      nama: "",
      tgllahir: "",
      jeniskelamin: "",
      pengajar: "",
      status: "",
    },
  };
  getDataApi = () => {
    fetch("http://localhost:3001/daftarGuru")
      .then((response) => response.json())
      .then((jsonHasilAmbilDariAPI) => {
        this.setState({
          daftarGuru: jsonHasilAmbilDariAPI,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  componentDidMount() {
    this.getDataApi();
    sideBar();
    renderTime();
    searchBar();
  }
  handleTambahData = (event) => {
    let formInsertData = { ...this.state.insertData };
    let timestamp = new Date().getTime();
    formInsertData["id"] = timestamp;
    formInsertData[event.target.name] = event.target.value;
    this.setState({
      insertData: formInsertData,
    });
  };

  handleTombolSimpan = () => {
    fetch("http://localhost:3001/daftarGuru", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state.insertData),
    }).then((Response) => {
      this.getDataApi();
    });
    this.handleReset();
  };
  handleHapusData = (data) => {
    fetch(`http://localhost:3001/daftarGuru/${data}`, { method: "DELETE" }) // alamat URL API yang ingin kita HAPUS datanya
      .then((res) => {
        this.getDataApi();
      });
  };
  render() {
    return (
      <div className="bodyDashboard">
        <div className="sidebar">
          <div className="logo-details">
            <img src={require("./assets/ico/LogoMin.png")} alt="Logo" />
            <span className="logo_name">scholLine.id</span>
          </div>
          <ul className="nav-links">
            <li id="dashboard" className="navItem">
              <Link to={"/dashboard"}>
                <a href="#">
                  <div className="frame-ico">
                    <img src={require("./assets/ico/DashboardIco.png")} alt="item1" id="item1" />
                  </div>
                  <span className="link_name">Dashboard</span>
                </a>
              </Link>
              <ul className="sub-menu blank">
                <li>
                  <a className="link_name" href="#">
                    Dashboard
                  </a>
                </li>
              </ul>
            </li>
            <li id="teachers" className="navItem active">
              <Link to={"/teachers"}>
                <a href="#">
                  <div className="frame-ico">
                    <img src={require("./assets/ico/peopleW.png")} alt="item4" id="item4" />
                  </div>
                  <span className="link_name">All Teachers</span>
                </a>
              </Link>
              <ul className="sub-menu blank">
                <li>
                  <a className="link_name" href="#">
                    All Teachers
                  </a>
                </li>
              </ul>
            </li>
            <li id="teachers" className="navItem">
              <Link to={"/students"}>
                <a href="#">
                  <div className="frame-ico">
                    <img src={require("./assets/ico/people.png")} alt="item4" id="item4" />
                  </div>
                  <span className="link_name">All Students</span>
                </a>
              </Link>
              <ul className="sub-menu blank">
                <li>
                  <a className="link_name" href="#">
                    All Students
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <div className="profile-details">
                <div className="profile-content">
                  <img src={require("./assets/img/Wallpaper.png")} alt="profileImg" />
                </div>
                <div className="name-job">
                  <div className="profile_name">Kelompok 3</div>
                  <div className="job">Student</div>
                </div>
                <i className="bx bx-log-out"></i>
              </div>
            </li>
          </ul>
          <div className="menu">
            <i className="bx bx-menu menu-collapse"></i>
          </div>
        </div>
        <section className="home-section">
          <div className="home-navbar">
            <nav className="navbar-custom navbar-expand-lg navbar-light bg-white  shadowNavbar">
              <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <form action="https:google.com/search" method="GET" className="search-box">
                    <input type="text" name="q" className="search-txt" placeholder="Search" />
                    <button type="submit" className="search-btn border border-0">
                      <i className="fa fa-search" aria-hidden="true"></i>
                    </button>
                  </form>
                  <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item d-flex align-items-center">
                      <div id="clockDisplay" className="me-2"></div>
                      <span className="seperatorVertikal me-3"></span>
                    </li>
                    <li className="nav-item dropdown d-flex align-items-center" id="chat">
                      <a className="nav-link dropdown-toggle chat" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <span className="iconChat">
                          <img src={require("./assets/ico/IconChat.png")} id="iconChat" />
                        </span>
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown"></ul>
                    </li>
                    <li className="nav-item dropdown d-flex align-items-center notif" id="notification">
                      <a className="nav-link dropdown-toggle notif" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <span className="iconNotification">
                          <img src={require("./assets/ico/IconNotif.png")} id="iconNotif" />
                        </span>
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown"></ul>
                    </li>
                    <li className="nav-item dropdown frameProfile">
                      <a className="nav-link dropdown-toggle nav-user" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                        <span className="account-user-avatar d-inline-block">
                          <img src={require("./assets/img/Wallpaper.png")} className="rounded-circle" />
                        </span>
                        <span>
                          <span className="account-user-name">Kelompok 3</span>
                          <span className="account-position">Student</span>
                        </span>
                      </a>
                      <ul className="dropdown-menu dropdown-menu-end me-1 border border-0 custom-rounded" aria-labelledby="navbarDropdown">
                        <li>
                          <a className="dropdown-item custom-item-dropdown d-flex align-items-center" href="#">
                            <i className="bx bxs-user s-14 me-2"></i>
                            <span className="nameItem">My Profile</span>
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item custom-item-dropdown d-flex align-items-center" href="#">
                            <i className="bx bxs-edit s-14 me-2"></i>
                            <span className="nameItem">Edit Profile</span>
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item custom-item-dropdown d-flex align-items-center" href="#">
                            <i className="bx bx-log-out s-14 me-2"></i>
                            <span className="nameItem">Sign Out</span>
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
          <div className="content">
            <div className="container-fluid">
              <div className="row gx-4 pt-4">
                <div className="col-lg-9">
                  <div className="p-0" style={{ minHeight: "500px" }}>
                    <div class="row">
                      <div class="col-md-12 ">
                        <div>
                          <div class="card shadow border-0 color-black bodyTeachers">
                            <div class="card-header">
                              <h4 class="m-0 d-inline-block">Data Teachers</h4>
                              <a href="" className="btn add-btn" data-bs-toggle="modal" data-bs-target="#add_Teacher">
                                <i class="fas fa-plus"></i>
                              </a>
                            </div>

                            <div class="card-body custom-bodyCard">
                              <div class="row">
                                {this.state.daftarGuru.map((dataTeacher) => {
                                  // looping dan masukkan untuk setiap data yang ada di listartikel ke variabel artikel
                                  return <PostDataTeachers gambar={"https://source.unsplash.com/random/200x200?sig=" + dataTeacher.id} nip={dataTeacher.nip} name={dataTeacher.nama} gender={dataTeacher.jeniskelamin} teacher={dataTeacher.pengajar} status={dataTeacher.status} idData={dataTeacher.id} hapusData={this.handleHapusData} />; // mappingkan data json dari API sesuai dengan kategorinya
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 m-0">
                  <div className="bg-light shadow text-center  p-2" style={{ minHeight: "500px", borderRadius: "16px" }}>
                    <main>
                      <div className="calendar">
                        <div className="month-indicator">
                          <time datetime="2019-02"> February 2019 </time>
                        </div>
                        <div className="day-of-week">
                          <div>Su</div>
                          <div>Mo</div>
                          <div>Tu</div>
                          <div>We</div>
                          <div>Th</div>
                          <div>Fr</div>
                          <div>Sa</div>
                        </div>
                        <div className="date-grid">
                          <button>
                            <time datetime="2019-02-01">1</time>
                          </button>
                          <button>
                            <time datetime="2019-02-02">2</time>
                          </button>
                          <button>
                            <time datetime="2019-02-03">3</time>
                          </button>
                          <button>
                            <time datetime="2019-02-04">4</time>
                          </button>
                          <button>
                            <time datetime="2019-02-05">5</time>
                          </button>
                          <button>
                            <time datetime="2019-02-06">6</time>
                          </button>
                          <button>
                            <time datetime="2019-02-07">7</time>
                          </button>
                          <button>
                            <time datetime="2019-02-08">8</time>
                          </button>
                          <button>
                            <time datetime="2019-02-09">9</time>
                          </button>
                          <button>
                            <time datetime="2019-02-10">10</time>
                          </button>
                          <button>
                            <time datetime="2019-02-11">11</time>
                          </button>
                          <button>
                            <time datetime="2019-02-12">12</time>
                          </button>
                          <button>
                            <time datetime="2019-02-13">13</time>
                          </button>
                          <button>
                            <time datetime="2019-02-14">14</time>
                          </button>
                          <button>
                            <time datetime="2019-02-15">15</time>
                          </button>
                          <button>
                            <time datetime="2019-02-16">16</time>
                          </button>
                          <button>
                            <time datetime="2019-02-17">17</time>
                          </button>
                          <button>
                            <time datetime="2019-02-18">18</time>
                          </button>
                          <button>
                            <time datetime="2019-02-19">19</time>
                          </button>
                          <button>
                            <time datetime="2019-02-20">20</time>
                          </button>
                          <button>
                            <time datetime="2019-02-21">21</time>
                          </button>
                          <button>
                            <time datetime="2019-02-22">22</time>
                          </button>
                          <button>
                            <time datetime="2019-02-23">23</time>
                          </button>
                          <button>
                            <time datetime="2019-02-24">24</time>
                          </button>
                          <button>
                            <time datetime="2019-02-25">25</time>
                          </button>
                          <button>
                            <time datetime="2019-02-26">26</time>
                          </button>
                          <button>
                            <time datetime="2019-02-27">27</time>
                          </button>
                          <button>
                            <time datetime="2019-02-28">28</time>
                          </button>
                        </div>
                      </div>
                    </main>
                    <div className="event mt-lg-3 pe-2 borderActivity shadowNavbar">
                      <div className="d-flex justify-content-between">
                        <p className="headerActivy ps-3 pt-3">Today Mask</p>
                        <p className="showMore pe-1 pt-3 terlihat">Show More</p>
                      </div>
                      <div className="d-flex justify-content-between pb-3">
                        <div className="col-lg-4 align-content-between">
                          <p className="showMore ps-3 pt-3 terlihat">07:00 AM</p>
                          <p className="showMore ps-3 pt-3 terlihat">08:00 AM</p>
                        </div>
                        <div className="col-lg-1 garisVertical"></div>
                        <div className="col-lg-6 bg-info rounded-3"></div>
                      </div>
                    </div>
                    <div className="event mt-lg-3 pe-2 borderActivity shadowNavbar">
                      <div className="d-flex justify-content-between">
                        <p className="headerActivy ps-3 pt-3">Today Mask</p>
                        <p className="showMore pe-1 pt-3 terlihat">Show More</p>
                      </div>
                      <div className="d-flex justify-content-between pb-3">
                        <div className="col-lg-4 align-content-between">
                          <p className="showMore ps-3 pt-3 terlihat">07:00 AM</p>
                          <p className="showMore ps-3 pt-3 terlihat">08:00 AM</p>
                        </div>
                        <div className="col-lg-1 garisVertical"></div>
                        <div className="col-lg-6 bg-info rounded-3"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Modal  */}
        <div className="modal fade custom-modal" id="add_Teacher" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title fw-bold">Add Teacher</h5>
                <button type="button" className="close btn-danger" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body">
                <div class="row">
                  <div class="col-md-12">
                    <div class="form-group">
                      <label class="col-form-label">
                        NIP <span class="text-danger">*</span>
                      </label>
                      <input class="form-control" type="text" id="nip" name="nip" onChange={this.handleTambahData} />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label class="col-form-label">Name</label>
                      <input class="form-control" type="text" id="nama" name="nama" onChange={this.handleTambahData} />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label class="col-form-label">Date of Birth</label>
                      <input class="form-control" type="text" id="alamat" name="alamat" onChange={this.handleTambahData} />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label class="col-form-label">Gender</label>
                      <select class="form-select" aria-label="Select gender" id="jeniskelamin" name="jeniskelamin" onChange={this.handleTambahData}>
                        <option selected>Choose gender</option>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label class="col-form-label">Field of Study</label>
                      <select class="form-select" aria-label="Select material" id="pengajar" name="pengajar" onChange={this.handleTambahData}>
                        <option selected>Choose material</option>
                        <option value="Kimia">Kimia</option>
                        <option value="Offline">Offline</option>
                        <option value="Fisika">Fisika</option>
                        <option value="Biologi">Biologi</option>
                        <option value="Sejarah">Sejarah</option>
                        <option value="Matematika">Matematika</option>
                        <option value="Bahasa Indonesia">Bahasa Indonesia</option>
                        <option value="Matemtika Peminatan">Matemtika Peminatan</option>
                        <option value="Bahasa Inggris">Bahasa Inggris</option>
                        <option value="Seni Budaya">Seni Budaya</option>
                        <option value="PPKN">PPKN</option>
                      </select>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group">
                      <label class="col-form-label">Status</label>
                      <select class="form-select" aria-label="Default select example" id="status" name="status" onChange={this.handleTambahData}>
                        <option selected>Pilih Status</option>
                        <option value="Online">Online</option>
                        <option value="Offline">Offline</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Keluar
                </button>
                <button type="button" className="btn btn-primary" onClick={this.handleTombolSimpan}>
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Admin;
