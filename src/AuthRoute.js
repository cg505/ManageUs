import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const AuthRoute = (props) => {
    const child = (childProps) => {
        if(props.knowLoggedIn) {
            if(props.loggedIn) {
                return React.createElement(props.component, Object.assign({}, props.props, childProps));
            } else {
                return (
                    <Redirect to={{
                        pathname: "/Login",
                        state: {from: childProps.location}
                    }} />
                );
            }
        } else {
            return (
                <h1>Loading...</h1>
            );
        }
    };


    return (
        <Route path={props.path} render={child} />
    );
};

export default AuthRoute;
