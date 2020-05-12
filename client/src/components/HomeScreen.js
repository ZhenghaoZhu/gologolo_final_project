import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Grid, Button } from '@material-ui/core'

const GET_LOGOS = gql`
  {
    logos {
      _id
      text
      lastUpdate
    }
  }
`;

const compareDates = (ds1, ds2) => {
    let date1 = new Date(ds1);
    let date2 = new Date(ds2);

    if(date1 < date2){
        return -1;
    } else {
        return 1;
    }
};



class HomeScreen extends Component {

    render() {
        return (
            <Query pollInterval={500} query={GET_LOGOS}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                        <div id = "navBarAndMainDiv">
                            <div id = "homeScreenNavBar">
                                <Button variant = "contained" id = "homeLogOutButton">
                                    <Link to={`/login`}  id = "homeToLogInScreenLink">Log Out</Link>
                                </Button>
                            </div>
                            <Grid container xs = {12}>
                                <div className="container row" id = "homeScreenMainDiv">
                                    <Grid container xs = {8}>
                                        <div id = "homeLeftSideDiv">
                                            <div id="home_banner_container">
                                                Gologolo
                                            </div>
                                            <Button variant = "contained" id = "homeToCreateScreenButton">
                                                <Link to={`/create`}  id = "homeToCreateScreenButtonLink">Create a new logo</Link>
                                            </Button>
                                        </div>
                                    </Grid>
                                    <div id = "recentWorkList">
                                        <h3 id = "recentWorkListTitle">Recent Work List</h3>
                                        {data.logos.sort((x, y) => -compareDates(x.lastUpdate, y.lastUpdate)).map((logo, index) => (
                                            <div key={index} className='home_logo_link'>
                                                <Link to={`/view/${logo._id}`} className="home_logo_link_text" style={{ cursor: "pointer" }}>{"‣ " + logo.text}</Link>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </Grid>
                        </div>
                    );
                }
                }
            </Query >
        );
    }
}

export default HomeScreen;
