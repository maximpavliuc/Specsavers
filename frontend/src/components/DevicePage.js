import {NavLink, useParams} from 'react-router-dom';
import ParamBlock from './ParamBlock';
import ParamsNamesBlock from './ParamsNamesBlock';
import DeviceCartButton from './DeviceCartButton';

const ImageBlock = ({src}) => {
    // Блок миниатюрного изображения под главным

    // Функция, делающее изображение главным при нажатии
    const onClick = () => {
        document.getElementsByClassName('device-img')[0].src = src;
    }

    return (
        <img src={src} alt='image' className='device-mini-img' onClick={onClick}/>
    )
}

const DeviceBlock = ({device}) => {
    // Блок страницы устройства
    let params = [];
    let keys = [];

    Object.entries(device).forEach((data) => {
        if(!['id', 'link', 'type', 'brand', 'model', 'price', 'resolution_height', 'images'].includes(data[0])) {
            if(data[0] != 'video_card') {
                params.push([data[0], data[1], '']);
                keys.push(data[0]);
            }
        }
    })

    let image = device.images.length > 0 ? device.images.sort((a, b) => b.main - a.main)[0]['image'] : '/no-image.jpg';

    return (
        <div className='device-block'>
            <div className='device-left'>
                <div className='device-img-block'>
                    <img src={image} alt='image' className='device-img'/>
                </div>
                <div className='device-mini-imgs'>
                    {device.images.sort((a, b) => b.main - a.main).map((image, i) => <ImageBlock src={image.image} key={i} />)}
                </div>
            </div>
            <div className='device-right'>
                <span className='device-type'>{device.type}</span>
                <h3 className='device-model'>{device.brand} {device.model}</h3>
                <span className='device-price'>{device.price} лей</span>
                <h4 className='device-params-label'>Характеристики</h4>
                <div className='device-params-wrapper'>
                    <ParamsNamesBlock keys={keys} extended={false} />
                    <div className='device-params'>
                        {params.map((param) => <ParamBlock param={param} key={param[0]} />)}
                    </div>
                    <DeviceCartButton id={`${device.id}`} />
                    <NavLink to={device.link} target='_blank' className='catalog-device-button'>Купить</NavLink>
                </div>
            </div>
        </div>
    )
} 

const DevicePage = ({devices}) => {
    let {id} = useParams();
    id = parseInt(id);
    let device = undefined;
    for(let i of devices) {
        if(i.id == id) {
            device = {...i};
        }
    }

    let block = device != undefined ? <DeviceBlock device={device} /> : <div>Этого товара не существует :с</div>
    
    return (
        <div>{block}</div>
    )
}

export default DevicePage;