const units = {
    'weight': 'г',
    'diagonal': '"',
    'resolution_width': '',
    'price': 'лей',
    'memory': 'Гб',
    'ram': 'Гб',
    'main_camera': 'Мп',
    'front_camera': 'Мп',
    'battery': 'мАч',
    'cores': '',
    'frequency': 'МГц',
    'video_card': '',
    'cpu': ''
}

const ParamBlock = ({param}) => {
    // Блок параметра устройства с единицами измерения и цветами (при сравнении)
    let [name, value, color] = param;
    let unit = units[name];

    if(name == 'weight' && value >= 1000) {
        value = value / 1000;
        unit = 'кг';
    } else if(name == 'frequency' && value >= 1000) {
        value = value / 1000;
        unit = 'ГГЦ';
    }

    if(value == null) {
        unit = '-';
    }
    
    return (
        <span className={'cart-device-param ' + color}>{value} {unit}</span>
    )
}

export default ParamBlock;