import { NavLink } from 'react-router-dom';

const MenuLink = ({link, type, section}) => {
    // Блок кнопки в меню переключения между типами устройств
    let active = link[1] == type ? ' active' : '';
    let to = link[1] == type ? `/${section}` : `/${section}/${link[1]}`;

    return (
        <NavLink to={to} className={'devices-menu-link' + active}>{link[0]}</NavLink>
    )
}

const DevicesMenu = ({type, section}) => {
    // Меню переключения между типами устройств
    const links = [['Смартфоны', 'phones'], ['Ноутбуки', 'laptops'], ['Умные часы', 'watches']];
    return (
        <div className='devices-menu'>
            {links.map((link) => <MenuLink link={link} type={type} section={section} key={link[1]} />)}
        </div>
    )
}

export default DevicesMenu;