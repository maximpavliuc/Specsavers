import { NavLink } from 'react-router-dom';

const FooterBlock = () => {
    // Блок футера
    return (
        <div className='footer-background'>
            <div className='container'>
                <div className='footer-subblock'>
                    <img src='/footer-logo.png' alt='SpecSavers' className='logo'/>
                    <p className='footer-description'>Lorem sed risus ultricies tristique nulla aliquet enim tortor at auctor urna nunc id cursus metus aliquam eleifend mi in nulla posuere sollicitudin aliquam ultrices.</p>
                </div>
                <div className='footer-line'></div>
                <div className='footer-subblock'>
                    <span className='footer-rights'>© 2024 SpecSavers. All Rights Reserved. </span>
                    <div className='footer-menu'>
                        <NavLink to='#' className='footer-menu-link'>Privacy Policy</NavLink>
                        <NavLink to='#' className='footer-menu-link'>Terms & Conditions</NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FooterBlock;