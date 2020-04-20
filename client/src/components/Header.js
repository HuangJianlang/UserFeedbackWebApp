import React from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import Payments from "./Payments";

class Header extends React.Component{

    //a function to return React Component or JSX
    //to design the renderContent

    renderContent(){
        //auth includes all user information
        const { auth } = this.props;
        switch (auth) {
            case null:
                return;
            case false:
                return (
                    <li>
                        <a href="/auth/google"> Login in with Google </a>
                    </li>
                )
            default:
                return (
                    <>
                        <li>
                            <Payments/>
                        </li>
                        {/* upper and bottom side of margin is 0, left and right side is 10px */}
                        <li style={{ margin: "0 10px"}}>
                            <span><button className="btn"> Credit: {auth.credits} </button></span>
                        </li>
                        <li>
                            <a href="/api/logout"> Logout </a>
                        </li>
                    </>
                )
        }
    }

    render() {
        return(
            <nav>
                <div className="nav-wrapper">
                    <Link style={{ margin: "0 10px"}} className="left brand-logo" to={this.props.auth? "/surveys" : "/"}>
                        Home
                    </Link>
                    {/*if we don't log in, display this link*/}
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    };
}

export default connect(mapStateToProps, null)(Header);