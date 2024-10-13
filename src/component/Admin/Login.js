import { notification } from 'antd';
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearMessage, signinRequest } from '../actions/createblogActions';
import AuthContext from './AuthContext';

function Login() {

    const signinSuccess = useSelector(state => state.blog.SignINSucess);
    const signinFailure = useSelector(state => state.blog.SignInFailure);
    const [notificationShown, setNotificationShown] = useState(false); 
    const { login} = useContext(AuthContext);
  
    const handleLin = useCallback(() => {
      login();
    }, [login]);
  

    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    
    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const openFailNotification = () => {
        const args = {
            message: (<span style={{ color: 'red' }}>Login Failed</span>),
            description: (<span style={{ color: 'red' }}>Please enter valid credentials</span>),

            // duration: 3,
            style: {
                backgroundColor: 'white', // Set background color to a shade of red
                borderRadius: '8px', // Add border radius
                border: '2px solid white', // Add border
                boxShadow: '0 2px 4px white', // Add shadow
            },

        };
        notification.open(args);
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            alert('Please enter both email and password');
            return;
        }
        dispatch(signinRequest(formData))



    };


    const navigate = useNavigate()



useEffect(() => {
  if (signinFailure ) {
 
    openFailNotification();
    setTimeout(() => {
      dispatch(clearMessage())
    }, 3000);
  }
}, [signinFailure,  navigate,dispatch]);

useEffect(() => {
    if (signinSuccess && !notificationShown) {
      setNotificationShown(true);
      openNotification();
      handleLin();
    
      setTimeout(() => {
        navigate('/admin/dashboard'); // Navigate after 5 seconds
        dispatch(clearMessage())
      }, 2000);
    }
  }, [signinSuccess, notificationShown,handleLin, navigate,dispatch]);

    const openNotification = () => {
      const args = {
        message: "Login Success",
        description: "Congratulations, You have login Successfully",
        duration: 2,
      };
      notification.open(args);
    };

    return (
        <div className='maindiv'>
            <div className='userloginbody'>
                <div className="wrapper"  >
                    <div className="title-text">
                        <div className="title login">Admin Login</div>
                    </div>
                    <div className="form-container">
                        <div className="form-inner">
                            <form onSubmit={handleSubmit} className='login'>
                                <div className="field" style={{ marginTop: "20px" }}>
                                    <input type="text" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Your Email" />
                                </div>
                                <div className="field" style={{ marginTop: "20px" }}>
                                    <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter Your Password" />
                                </div>
                                <div className="field lbtn">
                                    <div className="lbtn-layer"></div>
                                    <input type="submit" className='submitsbtn' value="Login" />
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login