import React, { useState, useEffect } from "react";
import navlogo from "../images/github.png";
import "../scss/reset.css";
import "../scss/theme.css";
import "../scss/profile.css";
import "../scss/trending.css";
import axios from "axios";
import { Link, Redirect, Switch } from "react-router-dom";

export default function Trendingrepo() {
  var [loading, setLoading] = useState(true);
  var [repoinfo, setRepoinfo] = useState([]);
  var gettrendingrepo = async () => {
    var link = "/trendingrepo";
    console.log("Printing link from userinfo", link);
    var response = await axios.get(link);
    var k=response.data[0];
    console.log(k);
    setRepoinfo(response.data);
    
    setLoading(false);

  };
  useEffect(() => {
    gettrendingrepo();
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
        ) :(
        <div className='users'>
          
          {repoinfo.map((value, index) => {
              return(
          <div className='cards'>
            <div className='details'>
              <ul>
                  <li className="lineheight"><span className="noleft">Repo Name : </span>{value.reponame.length>0?value.reponame:"No info availabble"}</li>
                  <li className="lineheight"><span className="noleft">About Repo : </span>{value.aboutrepo.length>0?value.aboutrepo:"No info availabble"}</li>
                  <li className="lineheight"><span className="noleft">Language : </span>{value.language.length>0?value.language:"No info availabble"}</li>
                  <li className="lineheight"><span className="noleft">Stars : </span>{value.stars.length>0?value.stars:"No info availabble"}</li>
                  <li className="lineheight"><span className="noleft">Forked : </span>{value.forked.length>0?value.forked:"No info availabble"}</li>
              </ul>
            </div>
          </div>
          );})}
          
        </div>
        )}
      </div>
    </>
  );
}
