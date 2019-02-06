import React, { Component } from 'react';


//returns block with user information
export const ProfileInformation = () => {


  return (
    <div className={'profile'}>
      <p><strong>Имя:</strong> {localStorage.getItem('name')}</p>
      <p><strong>Почта:</strong> {localStorage.getItem('email')}</p>
      <p><strong>Статус:</strong> {localStorage.getItem('userType') === 'true' ? 'Администратор' : 'Пользователь'}</p>
    </div>
  )
};