import React from 'react';
import { Router } from '@reach/router';

import withFirebaseAuth from 'react-with-firebase-auth';
import {
    Dashboard, SignIn, Editor, Preloader
} from 'components';
import { firebaseAppAuth, providers } from 'services/firebase';

import './App.css';

const createComponentWithAuth = withFirebaseAuth({
    providers,
    firebaseAppAuth
});

const App = (props) => {
    const {
        signInWithGoogle,
        signInWithGithub,
        signOut,
        user,
        loading
    } = props;
    return (
        <>
            { loading && <Preloader /> }
            <header className="header">
                <h2>Smart Markdown</h2>
                { user && (
                    <div className="user-profile">
                        <a
                            className="log-out-link"
                            href="#log-out"
                            onClick={() => {
                                console.log('Signed out...');
                                signOut();
                            }}
                        >
                            Выйти
                        </a>
                        <img alt="Profile" className="avatar" src={user.photoURL} />
                    </div>
                ) }
            </header>
            <Router>
                <SignIn
                    path="/"
                    user={user}
                    signIns={{ signInWithGithub, signInWithGoogle }}
                />
                <Dashboard path="user/:userId" user={user} />
                <Editor path="user/:userId/editor/:fileId" user={user} />
            </Router>
        </>
    );
};
const newApp = createComponentWithAuth(App);
export default newApp;
