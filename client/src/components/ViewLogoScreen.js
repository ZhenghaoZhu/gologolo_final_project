import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import LogoTextBox from './LogoTextBox.js';
import GologoloNavBar from './GologoloNavBar.js';
import { Grid, Button } from '@material-ui/core';
import { DeleteForever } from '@material-ui/icons';

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            text
            color
            fontSize
            backgroundColor
            borderColor
            borderRadius
            borderWidth
            padding
            margin
            lastUpdate
            ms
        }
    }
`;

const DELETE_LOGO = gql`
  mutation removeLogo($id: String!) {
    removeLogo(id:$id) {
      _id
    }
  }
`;

class ViewLogoScreen extends Component {

    render() {
        return (
            <Query pollInterval={500} query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    return (
                        <div>
                            <GologoloNavBar currentScreen = "View Screen"/>
                            <Grid
                            container
                            direction="row"
                            justify="center"
                            alignItems="flex-start"
                            >
                                <Grid
                                id = "viewScreenGridContainer"
                                container
                                direction="column"
                                justify="space-between"
                                alignItems="flex-start"
                                xs = {3}
                                >
                                    <Grid item>
                                        <dt>Text:</dt>
                                        <dd id = "textDD">{data.logo.text}</dd>
                                    </Grid>
                                    <Grid item>
                                        <dt>Font Color:</dt>
                                        <dd>{data.logo.color}</dd>
                                    </Grid>
                                    <Grid item>
                                        <dt>Font Size:</dt>
                                        <dd>{data.logo.fontSize}</dd>
                                    </Grid>
                                    <Grid item>
                                        <dt>Background Color:</dt>
                                        <dd>{data.logo.backgroundColor}</dd>
                                    </Grid>
                                    <Grid item>
                                        <dt>Border Color:</dt>
                                        <dd>{data.logo.borderColor}</dd>
                                    </Grid>
                                    <Grid item>
                                        <dt>Border Radius:</dt>
                                        <dd>{data.logo.borderRadius}</dd>
                                    </Grid>
                                    <Grid item>
                                        <dt>Border Thickness:</dt>
                                        <dd>{data.logo.borderWidth}</dd>
                                    </Grid>
                                    <Grid item>
                                        <dt>Padding:</dt>
                                        <dd>{data.logo.padding}</dd>
                                    </Grid>
                                    <Grid item>
                                        <dt>Margin:</dt>
                                        <dd>{data.logo.margin}</dd>
                                    </Grid>
                                    <Grid item>
                                        <dt>Last Updated:</dt>
                                        <dd>{data.logo.lastUpdate}</dd>
                                    </Grid>
                                    <Grid item id = "viewScreenButtons">
                                        <Mutation mutation={DELETE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push('/')}>
                                                {(removeLogo, { loading, error }) => (
                                                    <div>
                                                        <form
                                                            onSubmit={e => {
                                                                e.preventDefault();
                                                                removeLogo({ variables: { id: data.logo._id } });
                                                            }}>
                                                            <Button variant = "contained" id = "viewScreenEditButton">
                                                                <Link to={`/edit/${data.logo._id}`} id = "toEditScreenlink">Edit</Link>&nbsp;
                                                            </Button>
                                                        <button type="submit" className="btn btn-danger" id = "viewScreenDeleteButton"><DeleteForever/></button>
                                                        </form>
                                                        {loading && <p>Loading...</p>}
                                                        {error && <p>Error. Please try again</p>}
                                                    </div>
                                                )}
                                        </Mutation>
                                    </Grid>
                                </Grid>
                                <Grid item id = "viewScreenLogo">
                                    <LogoTextBox styles = {data.logo} logoText = {data.logo.text}  />
                                </Grid>
                            </Grid>
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default ViewLogoScreen;

