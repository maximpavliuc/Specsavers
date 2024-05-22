import { NavLink } from 'react-router-dom';
import DevicesMenu from './DevicesMenu';
import DeviceCartButton from './DeviceCartButton';

const DeviceBlock = ({device}) => {
    // Блок одного устройста из каталога
    let image = device.images.length > 0 ? device.images.sort((a, b) => b.main - a.main)[0]['image'] : '/no-image.jpg';

    return (
        <div className='catalog-device'>
            <div className='catalog-device-img-block'>
                <img src={image} alt='image' className='catalog-device-img'/>
            </div>
            <span className='catalog-device-type'>{device.type}</span>
            <h2 className='catalog-device-brand'>{device.brand}</h2>
            <NavLink to={'/catalog/' + device.id} className='catalog-device-model'>{device.model}</NavLink>
            <span className='catalog-device-price'>{device.price} лей</span>
            <DeviceCartButton id={`${device.id}`} />
        </div>
    )
}

const CatalogPage = ({devices, type}) => {
    // Блок страницы каталога
    return (
        <div className='catalog-block'>
            <DevicesMenu type={type} section='catalog'/>
            <div className='catalog-devices'>
                {devices.map((device) => <DeviceBlock device={device} key={device.id} />)}
            </div>
        </div>
    )
}

export default CatalogPage;