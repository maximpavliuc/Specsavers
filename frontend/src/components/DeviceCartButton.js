import { useState, useCallback } from 'react';
import Cookies from 'universal-cookie';

const DeviceCartButton = ({id}) => {
    // Блок кнопки добавления/удаления устройства из корзины
    const cookie = new Cookies();
    let added = `${cookie.get('added')}`.split(',');
    let isAdded = added.includes(id);

    const [addedStatus, setAddedStatus] = useState(isAdded);

    // Функция удаления устройства из корзины
    const removeFromCard = useCallback(() => {
        let added = `${cookie.get('added')}`.split(',');
        added.splice(added.indexOf(id), 1);
        cookie.set('added', added.join(','));
        setAddedStatus(false);
    }, [cookie, id, setAddedStatus])

    // Функция добавления устройства в корзину
    const addToCard = useCallback(() => {
        let added = cookie.get('added');
        cookie.set('added', added == '' ? id : [added, id].join(','));
        setAddedStatus(true);
    }, [cookie, id, setAddedStatus])

    if(isAdded) {
        return (
            <div onClick={removeFromCard} className='catalog-device-button added'>Убрать из корзины</div>
        )
    } else {
        return (
            <div onClick={addToCard} className='catalog-device-button'>Добавить в корзину</div>
        )
    }
}

export default DeviceCartButton;