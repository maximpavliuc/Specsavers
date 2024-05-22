import {NavLink} from 'react-router-dom';

const MenuLink = ({link}) => {
    // Блок ссылки в меню хэдера
    return (
        <NavLink to={link[1]} className='header-menu-link'>{link[0]}</NavLink>
    )
}

const HeaderBlock = ({links, isAuthenticated, logout}) => {
    // Блок хэдера
    return (
        <div className='header'>
            <NavLink to='/'>
                <img src='/logo.png' alt='SpecSavers' className='logo'/>
            </NavLink>
            <div className='header-menu'>
                {links.map((link) => <MenuLink link={link} key={link[1]} />)}
            </div>
            {isAuthenticated ? <span onClick={logout} className='header-login'>Выйти</span> : <NavLink to='/login' className='header-login'>Войти</NavLink>}
        </div>
    )
}

export default HeaderBlock;