import React from 'react'
import NavTag from '../../components/NavTags';
import AppRoute from '../../routes';
import './index.less';

export default function content() {
  return (
    <>
      <NavTag />
      <div className='main-view'><AppRoute /></div>
    </>
  )
}
