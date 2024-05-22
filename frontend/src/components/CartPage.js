import { useState, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import Cookies from 'universal-cookie';
import DevicesMenu from './DevicesMenu';
import ParamBlock from './ParamBlock'
import ParamsNamesBlock from './ParamsNamesBlock';

// Массив с параметрами, которые не нужно учитывать при обработке данных об устройстве
const notComparable = ['id', 'brand', 'model', 'link', 'type', 'cpu', 'resolution_height', 'images'];

const DeviceBlock = ({device, removeFromCard}) => {
    // Блок с данными об одном устройстве
    let params = [];

    Object.entries(device).forEach((data) => {
        if(!notComparable.includes(data[0])) {
            params.push([data[0], ...data[1]]);
        }
    })

    return (
        <div className='catalog-device'>
            <h2 className='catalog-device-brand'>{device.brand}</h2>
            <NavLink to={'/catalog/' + device.id} className='catalog-device-model'>{device.model}</NavLink>
            {params.map((param) => <ParamBlock param={param} key={param[0]} />)}
            <div onClick={(e) => removeFromCard(e)} className='catalog-device-button added' id={device.id}>Убрать из корзины</div> 
        </div>
    )
}

const CartPage = ({devices, type}) => {
    // Блок страницы корзины
    const cookie = new Cookies();

    let added = `${cookie.get('added')}`.split(',');
    let [addedDevices, setAddedDevices] = useState([]);
    addedDevices = devices.filter((i) => added.includes(`${i.id}`));

    // Механизм сравнения устройств
    if(addedDevices.length > 0) {
        addedDevices = addedDevices.map((device) => {
            return {...device};
        })
        for(let param of Object.keys(addedDevices[0])) {
            if(param == 'video_card') {
                addedDevices.sort((a, b) => {return a.video_card.rank - b.video_card.rank});
            } else if(param == 'resolution_width') {
                addedDevices.sort((a, b) => {return b.resolution_width * b.resolution_height - a.resolution_width * a.resolution_height});
            } else if(['weight', 'price'].includes(param)) {
                addedDevices.sort((a, b) => {return a[param] - b[param]});
            } else if(!notComparable.includes(param)) {
                addedDevices.sort((a, b) => {return b[param] - a[param]});
            }

            if(!notComparable.includes(param)) {
                let best = addedDevices[0][param];
                let worst = addedDevices[addedDevices.length - 1][param];
                if(param == 'video_card') {
                    best = addedDevices[0]['video_card']['model'];
                    worst = addedDevices[addedDevices.length - 1]['video_card']['model'];
                } else if(param == 'resolution_width') {
                    best = addedDevices[0]['resolution_width'] * addedDevices[0]['resolution_height'];
                    worst = addedDevices[addedDevices.length - 1]['resolution_width'] * addedDevices[addedDevices.length - 1]['resolution_height'];
                }
                if(best == worst) {
                    addedDevices.forEach((device) => {
                        if(param == 'video_card') {
                            device['video_card'] = [device['video_card']['model'], 'neutral']; 
                        } else if(param == 'resolution_width') {
                            device['resolution_width'] = [`${device['resolution_width']}x${device['resolution_height']}`, 'neutral'];
                        } else {
                            device[param] = [device[param], 'neutral'];
                        }
                    })
                } else {
                    addedDevices.forEach((device) => {
                        let color = 'neutral';
                        if(param == 'video_card') {
                            if(device['video_card']['model'] == best) {
                                color = 'best';
                            } else if(device['video_card']['model'] == worst) {
                                color = 'worst';
                            }
                            device['video_card'] = [device['video_card']['model'], color];
                        } else if(param == 'resolution_width') {
                            let resolution = device['resolution_width'] * device['resolution_height'];
                            if(resolution == best) {
                                color = 'best';
                            } else if(resolution == worst) {
                                color = 'worst';
                            }
                            device['resolution_width'] = [`${device['resolution_width']}x${device['resolution_height']}`, color];
                        } else {
                            if(device[param] == best) {
                                color = 'best';
                            } else if(device[param] == worst) {
                                color = 'worst';
                            }
                            device[param] = [device[param], color];
                        }
                    })
                }
            }
        }
    }

    // Функция удаления устройства из корзины
    const removeFromCard = useCallback((e) => {
        added.splice(added.indexOf(e.target.id), 1);
        cookie.set('added', added.join(','));
        setAddedDevices(devices.filter((i) => added.includes(`${i.id}`)));
    }, [cookie, added, devices, setAddedDevices])

    // Код получения названий параметром для плока с названиями и необходимого количества этих блоков в зависимости от количества устройств
    let count = addedDevices.length > 0 ? Math.ceil(addedDevices.length / 3) : 0;
    let keys = [];
    if(count > 0) {
        Object.keys(addedDevices[0]).forEach((key) => {
            if(!notComparable.includes(key)) {
                keys.push(key);
            }
        })
    }

    return (
        <div className='cart-block'>
            <DevicesMenu type={type} section='cart'/>
            <div className='cart-bottom'>
                <div className='cart-names'>
                    {Array.apply(null, { length: count }).map((i) => <ParamsNamesBlock keys={keys} extended={true} key={i} />)}
                </div>
                <div className='cart-devices'>
                    {addedDevices.map((device) => <DeviceBlock device={device} removeFromCard={removeFromCard} key={device.id} />)}
                </div>
            </div>
        </div>
    )
}

export default CartPage;