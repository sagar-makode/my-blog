import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateBlog from "./component/CreateBlog";
import AllBlogs from "./component/AllBlogs";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';  
import Navbar from "./component/home/Navbar";
import Home from "./component/home/Home";
import BlogDetails from "./component/BlogDetails/BlogDetails";
import Tagblog from "./component/home/Tagblog";
import Footer from "./component/Footer/Footer";
import SearchBlog from "./component/home/SearchBlog";
import BlogCard from "./component/home/BlogCard";
function App() {

  
  return (
    <Router>


      <Navbar />


      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/createblog' element={<CreateBlog />} />

        <Route exact path='/allblogs' element={<BlogCard />} />
        <Route exact path="/:title" element={<BlogDetails/>} />
        <Route exact path="/tag/:search" element={<Tagblog/>} />
        <Route exact path="/search/:data" element={<SearchBlog/>} />



      </Routes>
      <Footer/>

  
  </Router>
    
  );
}

export default App;
