import React, { useState, useEffect } from 'react';
import useSWR, { mutate } from 'swr';
// import useSWR from 'swr';
import { Link, navigate } from '@reach/router';
import { db } from 'services/firebase';
import './Dashboard.css';

// Получение файлов юзера из базы данных
const getUserFiles = async (userId) => {
    const doc = await db.collection('users').doc(userId).get();

    if (doc.exists) {
        console.log('User found in database');
        const snapshot = await db
            .collection('users')
            .doc(doc.id)
            .collection('files')
            .get();

        const userFiles = [];
        snapshot.forEach((file) => {
            const { name, content } = file.data();
            userFiles.push({ id: file.id, name, content });
        });
        return userFiles;
    }
    console.log('User not found in database, creating new entry...');
    db.collection('users').doc(userId).set({});
    return [];
};

// Новый файл-заметка в БД
const createFile = async (userId, fileName) => {
    const res = await db.collection('users').doc(userId).collection('files').add({
        name: fileName,
        content: ''
    });
    return res;
};

const deleteFile = async (userId, fileId) => {
    const res = await db
        .collection('users')
        .doc(userId)
        .collection('files')
        .doc(fileId)
        .delete();
    return res;
};

export const Dashboard = ({ user, userId }) => {
    const [nameValue, setNameValue] = useState('');
    const { data, error } = useSWR(userId, getUserFiles);
    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user]);

    if (error) return <p>Ошибка при загрузке данных!</p>;
    if (!data) return <p>Загрузка...</p>;

    return (
        <div>
            <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        if (nameValue) {
                            setNameValue('');
                            createFile(userId, nameValue).then(r => {});
                            mutate(userId).then(r => {});
                        }
                    }}
                    className="new-file-form"
            >
                <input
                        type="text"
                        placeholder="Название файла..."
                        value={nameValue}
                        onChange={(e) => setNameValue(e.target.value)}
                />
                <button type="submit" className="add-button">
                    Создать
                </button>
            </form>
            <ul className="files-list">
                {data.map((file) => (
                    <li key={file.id} className="file">
                        <Link to={`/user/${userId}/editor/${file.id}`} className="link">
                            {file.name}
                        </Link>
                        <button
                                    type="button"
                                    onClick={() => {
                                        deleteFile(userId, file.id).then(() => mutate(userId));
                                    }}
                                    className="delete-button"
                        >
                            x
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
