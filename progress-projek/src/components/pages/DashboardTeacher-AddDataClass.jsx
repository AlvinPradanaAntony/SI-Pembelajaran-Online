import React, { Component, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "../css/Dashboard.css";
import "../js/currentTime";
import SideBar from "../js/collapseSidebar";
import Searchbar from "../js/searchBar";
import changeIconMenu from "../js/changeIconMenu";
import Calender from "../Widget/calenderWidget";
import { addDoc, collection, doc, getDoc, onSnapshot, setDoc, Timestamp } from "firebase/firestore";
import { db, storage } from "../../config/firebase-config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

class DashboardTeacher_AddDataClass extends Component {
  componentDidMount() {
    SideBar();
    Searchbar();
    changeIconMenu();
  }
  render() {
    return <App />;
  }
}
function App() {
  const { currentUser, logout } = useAuth();
  const [error, setError] = useState("");
  const [user, setUser] = useState([]);
  const [classes, setClass] = useState([]);
  const classRef = collection(db, "class");
  const [pdf, setPDF] = useState("");

  const [className, setClassName] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [levelClass, setLevelClass] = useState("");
  const [author, setAuthor] = useState("");
  const [urlVideo, setUrlVideo] = useState("");


  const history = useHistory();
  console.log("Berhasil login dengan email: " + currentUser.email);
  console.log("Detail user: ");
  console.log(currentUser);
  console.log("State class:", classes);

  useEffect(() => {
    if (currentUser) {
      getDoc(doc(db, "teacher", currentUser.uid)).then((docSnap) => {
        if (docSnap.exists) {
          setUser(docSnap.data());
        }
      });
    }
    const unsubscribe = onSnapshot(classRef, (snapshot) => {
      setClass(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // async function addData(e) {
  //   e.preventDefault();
  //   try {
  //     // await addUserTeacher(email, password, nip, name, tutor, date, gender, status);
  //     alert(name);
  //   } catch (error) {
  //     console.log(error.code);
  //     setError(error.code);
  //   }
  // }

  const addData = async (e) => {
    e.preventDefault();

    let url;
    if (pdf) {
      const imgRef = ref(storage, `images/${new Date().getTime()} - ${pdf.name}`);
      const snap = await uploadBytes(imgRef, pdf);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    }
    const userId = currentUser.uid;

    await setDoc(doc(db, "class", userId), {
      uid: userId,
      id_teacher: currentUser.uid,
      name_class: className,
      name_teacher: user.name,
      createdAt: Timestamp.fromDate(new Date()),
    });
    await addDoc(collection(db, "class", userId, "lessons"), {
      // text,
      title: title,
      body: content,
      author: user.name,
      urlVideo: urlVideo,
      module: url || "",
      createdAt: Timestamp.fromDate(new Date()),
    });
    history.push("/dashboard-teacher/class");
    // setText("");
    // setImg("");
  };

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Fdatetimeailed to log out");
    }
  }

  return (
    <div className="bodyDashboard">
      <div className="sidebar">
        <div className="logo-details">
          <img src={require("../assets/ico/LogoMin.png")} alt="Logo" />
          <span className="logo_name">scholLine.id</span>
        </div>
        <ul className="nav-links" id="courses">
          <li id="dashboard" className="navItem">
            <Link to={"/dashboard-teacher"}>
              <div className="frame-ico">
                <img src={require("../assets/ico/DashboardIco.png")} alt="item1" id="item1" />
              </div>
              <span className="link_name">Dashboard</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="#">
                  Dashboard
                </a>
              </li>
            </ul>
          </li>
          <li id="courses" className="navItem active">
            <Link to={"/dashboard-teacher/class"}>
              <div className="frame-ico">
                <img src={require("../assets/ico/SchoolW.png")} alt="item2" id="item2" />
              </div>
              <span className="link_name">Courses</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="#">
                  Courses
                </a>
              </li>
            </ul>
          </li>
          <li id="teachers" className="navItem">
            <Link to={"/dashboard-teacher/viewstudent"}>
              <div className="frame-ico">
                <img src={require("../assets/ico/people.png")} alt="item4" id="item4" />
              </div>
              <span className="link_name">All Teachers</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="#">
                  All Teachers
                </a>
              </li>
            </ul>
          </li>
          <li id="quiz" className="navItem">
            <Link to={"/quiz"}>
              <div className="frame-ico">
                <img src={require("../assets/ico/Quiz.png")} alt="item5" id="item5" />
              </div>
              <span className="link_name">Quiz</span>
            </Link>
            <ul className="sub-menu blank">
              <li>
                <a className="link_name" href="#">
                  Quiz
                </a>
              </li>
            </ul>
          </li>
          <li>
            <div className="profile-details">
              <div className="profile-content">
                <img src={user.avatar} className="cust-avatar" />
              </div>
              <div className="name-job">
                <div className="profile_name">{user.name}</div>
                <div className="job">{user.email}</div>
              </div>
              <i className="bx bx-log-out" onClick={handleLogout}></i>
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
                        <img src={require("../assets/ico/IconChat.png")} id="iconChat" />
                      </span>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown"></ul>
                  </li>
                  <li className="nav-item dropdown d-flex align-items-center notif" id="notification">
                    <a className="nav-link dropdown-toggle notif" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <span className="iconNotification">
                        <img src={require("../assets/ico/IconNotif.png")} id="iconNotif" />
                      </span>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown"></ul>
                  </li>
                  <li className="nav-item dropdown frameProfile">
                    <a className="nav-link dropdown-toggle nav-user" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                      <span className="account-user-avatar d-inline-block">
                        <img src={user.avatar} className="cust-avatar img-fluid rounded-circle" />
                      </span>
                      <span>
                        <span className="account-user-name">{user.name}</span>
                        <span className="account-position">{user.status}</span>
                      </span>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end me-1 border border-0 custom-rounded" aria-labelledby="navbarDropdown">
                      <Link to={"/profile"} className="text-decoration-none">
                        <div className="dropdown-item custom-item-dropdown d-flex align-items-center">
                          <i className="bx bxs-user s-14 me-2"></i>
                          <span className="nameItem">My Profile</span>
                        </div>
                      </Link>
                      <li>
                        <a className="dropdown-item custom-item-dropdown d-flex align-items-center" href="#" onClick={handleLogout}>
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
                  <div className="Course p-3">
                    <div className="card-header mb-3">
                      <h4 className="m-0 d-inline-block">Add Class</h4>
                    </div>
                    <div className="itemCourse row pb-3">
                      <div className="container">
                        <div class="col-md-12">
                          <div class="card">
                            <div class="card-header">
                              <h5 class="card-title">Form</h5>
                            </div>
                            <div class="card-body">
                              <form onSubmit={addData}>
                                <div class="row">
                                  <div class="mb-3 col-md-6">
                                    <label class="form-label" for="classname">
                                      Class Name
                                    </label>
                                    <input type="text" class="form-control" id="classname" placeholder="Class" onChange={(e) => setClassName(e.target.value)}/>
                                  </div>
                                  <div class="col-md-6 mb-3">
                                    <label class="form-label" for="inputAddress">
                                      Title
                                    </label>
                                    <input type="text" class="form-control" id="inputAddress" placeholder="Title Material" onChange={(e) => setTitle(e.target.value)}/>
                                  </div>
                                  <div class="mb-3 col-md-6">
                                    <label class="form-label" for="inputPassword4">
                                      Content
                                    </label>
                                    <textarea type="text" class="form-control" id="inputPassword4" placeholder="Content" onChange={(e) => setContent(e.target.value)}/>
                                  </div>

                                  <div className="mb-3 col-md-6">
                                    <label htmlFor="classOption" className="form-label">
                                      Class
                                    </label>
                                    <select defaultValue="" className="form-select" id="classOption" onChange={(e) => setLevelClass(e.target.value)} required>
                                      <option value="" disabled>
                                        Choose class
                                      </option>
                                      <option value="10">10</option>
                                      <option value="11">11</option>
                                      <option value="12">12</option>
                                    </select>
                                  </div>
                                  <div class="col-md-6 mb-3">
                                    <label class="form-label" for="inputAddress">
                                      Author
                                    </label>
                                    <input type="text" value={user.name} class="form-control" id="inputAddress" placeholder="Bagus Pratama, etc" onChange={(e) => setAuthor(e.target.value)} readOnly/>
                                  </div>
                                  <div class="col-md-6 mb-3">
                                    <label class="form-label" for="inputAddress">
                                      URL Video/Youtube
                                    </label>
                                    <input type="text" class="form-control" id="inputAddress" placeholder="https://www.youtube.com/watch?v=BpoWFzn8Dmw" onChange={(e) => setUrlVideo(e.target.value)}/>
                                  </div>
                                  <div class="col-md-6 mb-3">
                                    <label class="form-label w-100">File input</label>
                                    <input type="file" />
                                    <small class="form-text text-muted">Ex: PDF.</small>
                                  </div>
                                </div>
                                <button type="submit" class="btn btn-primary">
                                  Submit
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 m-0">
                <Calender />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default DashboardTeacher_AddDataClass;
