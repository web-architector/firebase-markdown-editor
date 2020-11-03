import React, { useEffect } from 'react';
import { navigate } from '@reach/router';

const { PUBLIC_URL } = process.env;

export const SignIn = ({
    user,
    signIns: { signInWithGoogle, signInWithGithub }

}) => {
    useEffect(() => {
        if (user) {
            const publicUrl = process.env.NODE_ENV === 'development' ? '' : PUBLIC_URL;
            const redirectUrl = `${publicUrl}/user/${user.uid}`;
            console.log(`###: SignIn component: User found. Redirecting to "${redirectUrl}"`);
            navigate(redirectUrl).then();
        }
    }, [user]);

    return (
        <div className="sign-in-page">
            <h3>
                Добро пожаловать в
                <em> Умный Редактор</em>
                !
            </h3>
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
