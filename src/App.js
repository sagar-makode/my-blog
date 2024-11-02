import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateBlog from "./component/Admin/CreateBlog";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';  
import Navbar from "./component/home/Navbar";
import Home from "./component/home/Home";
import BlogDetails from "./component/BlogDetails/BlogDetails";
import Tagblog from "./component/home/Tagblog";
import Footer from "./component/Footer/Footer";
import SearchBlog from "./component/home/SearchBlog";
import BlogCard from "./component/home/BlogCard";
import EditBlog from "./component/Admin/EditBlog";
import Login from "./component/Admin/Login";
import AllBlogList from "./component/Admin/AllBlogList";
import { AuthProvider } from "./component/Admin/AuthContext";
function App() {

  
  return (
    <Router>

<AuthProvider>
      <Navbar />


      <Routes>
        {/* <Route exact path='/' element={<Home />} /> */}
        <Route exact path='/admin/createblog' element={<CreateBlog />} />

        {/* <Route exact path='/allblogs' element={<BlogCard />} /> */}
        {/* <Route exact path="/:title" element={<BlogDetails/>} /> */}
        {/* <Route exact path="/tag/:search" element={<Tagblog/>} /> */}
        {/* <Route exact path="/search/:data" element={<SearchBlog/>} /> */}
        <Route path="/edit/:blogId" element={<EditBlog />} /> {/* Edit blog route */}
        <Route exact path="/" element={<Login/>} />
        <Route exact path="/admin/dashboard" element={<AllBlogList/>} />






      </Routes>
      <Footer/>
      </AuthProvider>
  
  </Router>
    
  );
}

export default App;
