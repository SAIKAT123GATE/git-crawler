import React, { useState, useEffect } from "react";
import navlogo from "../images/github.png";
import "../scss/reset.css";
import "../scss/theme.css";
import "../scss/profile.css";
import "../scss/userprofile.css";
import axios from "axios";
import { useParams, Link,Switch } from "react-router-dom";

export default function Userprofile() {
  var { username } = useParams();
  var [loading, setLoading] = useState(true);
  var [userinfo,setUserinfo]=useState([]);

  var getuserinfo = async () => {
    var link = "/usersearch/" + username;
    console.log("Printing link from userinfo", link);
    var response = await axios.get(link);
    var k=response.data[0];
    setUserinfo(response.data);
    console.log(userinfo);
    setLoading(false);

  };
  useEffect(() => {
    getuserinfo();
  }, []);

  return (
    <>
      <div className='main-section msec2'>
        <div>
            <Switch>
          <Link to='/profile'>
            <button className='linked-button'>Go Back To Home</button>
            
          </Link>
          </Switch>
        </div>
        {loading ? (
          <div className="loader"></div>
        ) : (
          <div className='userdetails'>
            <figure>
              <img src={userinfo[0].image} />
            </figure>
            <div className='indidetails'>
              <ul>
                <li>
                  <span>USERNAME : </span>{userinfo[0].username}
                </li>
                <li>
                  <span>FOLLOWERS : </span>{userinfo[0].followers}
                </li>
                <li>
                  <span>FOLLOWING : </span>{userinfo[0].following}
                </li>
                <li>
                  <span>STARS : </span>{userinfo[0].stars}
                </li>

                <li>
                  <span>CONTRIBUTION : </span>{userinfo[0].contribution}
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
