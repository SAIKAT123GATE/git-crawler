import React, { useState } from "react";
import navlogo from "../images/github.png";
import "../scss/reset.css";
import "../scss/theme.css";
import "../scss/profile.css";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
export default function Profile() {
  const history=useHistory();
  var [users, setUsers] = useState("");
  var [loading, setLoading] = useState(false);
  var [loaded,setLoaded]=useState(false);
  var [info, setInfo] = useState([]);
  var [pageno,setPageno]=useState(1);
  var[username,setUsername]=useState("");
  var handleinput = (e) => {
    console.log("hi");
    setUsers(e.target.value);
  };
  var susername=(e)=>{
    setUsername(e.target.value);
  }

  var handleusername=async(e)=>{
    e.preventDefault();
    var path="/user/"+username;
    console.log(path);
    history.push(path);
  }

  var handlemessage = async (e) => {
    console.log("checking prevent default");
    e.preventDefault();

    var inputvalue = {
      users: users,
    };
    setLoading(true);
    var response = await axios.post("/search", inputvalue);
    setLoading(false);
    setLoaded(true);
    setInfo(response.data);
    console.log("printing info", info);
    //console.log("printing input value", response.data);
  };


  var getinfo=async(no)=>{
    setPageno(no);
    console.log(no);
    console.log(users);
    var link="/pagination/"+no+"/"+users;
    console.log(link);
    setLoading(true);
     var response = await axios.get(link);
     setLoading(false);
     setLoaded(true);
     setInfo(response.data);
  }
  return (
    <>
      <div className='main-section msec2'>
        <div className='inputfield'>
          <figure className='logo'>
            <img src={navlogo} />
          </figure>
          <form onSubmit={handlemessage}>
            <input
              placeholder='Search For Users by their name'
              name='users'
              value={users}
              onChange={handleinput}
            />
          </form>

          
        </div>
        <div className='inputfield m-t'>
          <figure className='logo'>
            <img src={navlogo} />
          </figure>
          <form onSubmit={handleusername}>
            <input
              placeholder='Search For Users by their username'
              name='username'
              value={username}
              onChange={susername}
            />
          </form>

          
        </div>

        <Link to='/trendingrepo'>
          <button className='linked-button'> Trending Repos </button>
        </Link>

        {loading ? (
          <div className='loader'></div>
        ) : (
          <div className='users'>
            {info.map((value, index) => {
              return (
                <div className='cards'>
                  <figure className='userlogo'>
                    <Link className='link' to={`/user/${value.username}`}>
                      <img src={value.imgsrc} />
                    </Link>
                  </figure>
                  <div className='details'>
                    <ul>
                      <li>
                        <span>Name :</span>
                        {value.name.length > 0
                          ? value.name
                          : "No info availabble"}
                      </li>
                      <li>
                        <span>User Name :</span>
                        <Link className='link' to={`/user/${value.username}`}>
                          {value.username.length > 0
                            ? value.username
                            : "No info availabble"}
                        </Link>
                      </li>
                      <li>
                        <span>Location :</span>
                        {value.location.length > 0
                          ? value.location
                          : "No info availabble"}
                      </li>
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {loaded?
        (
        <div>
          <ul className='pagination'>
            <li className={"page "+(pageno===1?"active":"inactive")} onClick={()=>getinfo(1)}>1</li>
            <li className={"page "+(pageno===2?"active":"inactive")} onClick={()=>getinfo(2)}>2</li>
            <li className={"page "+(pageno===3?"active":"inactive")} onClick={()=>getinfo(3)}>3</li>
            <li className={"page "+(pageno===4?"active":"inactive")} onClick={()=>getinfo(4)}>4</li>
            <li className={"page "+(pageno===5?"active":"inactive")} onClick={()=>getinfo(5)}>5</li>
          </ul>
        </div>):
        (
          <div></div>
        )}
      </div>
    </>
  );
}
