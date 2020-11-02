import React, { useEffect } from 'react';
import { navigate } from '@reach/router';

export const SignIn = ({
    user,
    signIns: { signInWithGoogle, signInWithGithub }

}) => {
    useEffect(() => {
        if (user) {
            navigate(`/user/${user.uid}`);
        }
    }, [user]);

    return (
        <div className="sign-in-page">
            <h3>Добро пожаловать редактор  Smart Markdown!</h3>
            <p>
                Для хранения Ваших документов и синхронизации между устройствами войдите, используя одну из учетных записей социальной сети
            </p>
            <div className="sign-in-buttons">
                <button type="button" onClick={signInWithGoogle}>Вход через Google</button>
                <button type="button" onClick={signInWithGithub}>Вход через GitHub</button>
            </div>
        </div>
    );
};
