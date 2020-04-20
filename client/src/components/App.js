import React from "react";
import { BrowserRouter, Route } from  'react-router-dom';
import { connect } from "react-redux";
import * as actions from "../actions";

//BrowserRouter is a brain of Router, tell how to behave, set url and display component
//Route component setup rule between routes and setup component in that route

import Header from "./Header";
import Landing from "./Landing";

const Dashboard = () => <h2> Dashboard </h2>
const SurveyNew = () => <h2> SurveyNew </h2>

//responsible for initial view layout setout
class App extends React.Component{
    componentDidMount() {
        this.props.fetchUser();
    }

    render() {
        return (
            <div className="container">
                <BrowserRouter>
                    <React.Fragment>
                        <Header />
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/surveys" component={Dashboard} />
                        <Route path="/surveys/new/" component={SurveyNew} />
                    </React.Fragment>
                </BrowserRouter>
            </div>
        );
    }
};



export default connect(null, actions)(App);