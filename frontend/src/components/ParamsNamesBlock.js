const names = {
    'weight': 'Вес',
    'diagonal': 'Диагональ экрана',
    'resolution_width': 'Разрешение экрана',
    'price': 'Цена',
    'memory': 'Встроенная память',
    'ram': 'Оперативная память',
    'main_camera': 'Основная камера',
    'front_camera': 'Фронтальная камера',
    'battery': 'Объём аккамулятора',
    'cores': 'Количество ядер',
    'frequency': 'Частота процессора',
    'video_card': 'Видеокарта',
    'cpu': 'Процессор'
}

const ParamsNamesBlock = ({keys, extended}) => {
    // Блок с названиями параметров устройства
    let brand = extended ? <span className='cart-device-brand'>Производитель</span> : '';
    let model = extended ? <span className='cart-device-model'>Модель</span> : '';
    let button = extended ? <div className='cart-device-button'></div> : '';

    return (
        <div className='catalog-device'>
            {brand}
            {model}
            {keys.map((key) => <span className='cart-device-param '>{names[key]}</span>)}
            {button} 
        </div>
    )
}

export default ParamsNamesBlock;