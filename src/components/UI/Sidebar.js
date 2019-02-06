import React, {Component} from 'react';
import {SidebarLink} from "./Sidebar_link";


class Sidebar extends React.Component {


  render() {

    return (
      <div className="wrapper__col-xs-12 wrapper__col-lg-3 sidebar-layout">
        <aside>
          <div className={'avatar_wrapper ripple'}>
            <i
              className="material-icons resizing"
            >
              add_a_photo
            </i>
          </div>
          <nav>
            <ul>
              <li>
                <SidebarLink
                  name={'Профиль'}
                  link={'/profile'}
                />
              </li>
              <li>
                <SidebarLink
                  name={'Пользователи'}
                  link={'/users'}
                />
              </li>
            </ul>
          </nav>
        </aside>
      </div>
    );
  }
}


export default Sidebar;