import './App.css';
import React from 'react';
import {BrowserRouter, Navigate, Route, Routes} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import HeaderBlock from './components/HeaderBlock';
import FooterBlock from './components/FooterBlock';
import MainPage from './components/MainPage';
import AboutPage from './components/AboutPage';
import CatalogPage from './components/CatalogPage';
import CartPage from './components/CartPage';
import DevicePage from './components/DevicePage';
import LoginPage from './components/LoginPage';
import RegistrationPage from './components/RegistrationPage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'phones': [],
      'laptops': [],
      'watches': [],
      'slides': [],
      'token': ''
    }
  }

  getHostAddress = () => {
    // Функция, возвращающая адреса хоста в зависимости от того, разработка это или продакшн
    let hostAddress;

    if (window.location.origin === "http://localhost:3000") {
        hostAddress = "http://127.0.0.1:8000";
    } else {
        hostAddress = window.location.origin + ':8443';
    }
    return hostAddress
  }

  setToken = (token) => {
    // Функция, устанавливающая/меняющаяя в куки токен для повторной авторизации 
    const cookies = new Cookies();
    cookies.set('token', token);
    this.setState({'token': token});
  }

  isAuthenticated = () => {
    // Функция, возвращающая авторизован ли пользователь
    return this.state.token != '';
  }

  logout = () => {
    // Функция для выхода пользователя из системы
    this.setToken('');
  }

  getTokenFromStorage = () => {
    // Функция, получающая из куки токен для входа
    const cookies = new Cookies();
    const token = cookies.get('token');
    this.setState({'token': token});
  }

  login = (username, password) => {
    // Функция, выполняющая вход в систему путём обращения к бэкенду
    axios.post(this.getHostAddress() + '/api-token-auth/', {username: username, password: password})
    .then((response) => {this.setToken(response.data['token'])})
    .catch(error => alert('Неверный логин или пароль'));
  }

  register = (params) => {
    // Функция, выполняющая регистрацию пользователя в системе путём обращения к бэкенду

    let user = {
      'first_name': params['firstName'],
      'last_name': params['lastName'],
      'username': params['email'],
      'email': params['email'],
      'password': params['password'],
      'phone_number': params['phoneNumber'],
      'date_of_birth': [String(params['dateOfBirth'].getFullYear()), String(params['dateOfBirth'].getMonth()+1), String(params['dateOfBirth'].getDate())].join('-'),
    }
 
    axios.post(this.getHostAddress() + '/api/users/', user, {
      'Content-Type': 'application/json'
    })
    .then((response) => {
      document.getElementsByClassName('header-login')[0].click();
    })
    .catch(error => alert('Этот адрес электронной почты уже занят'));
  }

  loadData = (hostAddress, type) => {
    // Функция, загружающая из бэкенда информация о переданном типе сущностей
    axios.get(hostAddress + `/api/${type}/`)
    .then(response => {
        let obj = {};
        obj[type] = response.data;
        this.setState(obj);
    }).catch(error => console.log(error));
  }

  componentDidMount() {
    // Функция, срабатывающая при загрузке страницы. Загружает данные о необходимых сущностях и устанавливает куки для корзины, если их нет
    let hostAddress = this.getHostAddress();

    this.loadData(hostAddress, 'phones');
    this.loadData(hostAddress, 'laptops');
    this.loadData(hostAddress, 'watches');
    this.loadData(hostAddress, 'slides');

    const cookie = new Cookies();
    let added = cookie.get('added');
    if(added == undefined) {
        cookie.set('added', '');
    }
  }

  getDevices = () => {
    // Функция, возвращающая массив со всеми устройствами
    return [...this.state.phones, ...this.state.laptops, ...this.state.watches].map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  }

  render () {
    return (
        <BrowserRouter>
            <div className='wrapper'>
              <div className='container'>
                <HeaderBlock links={[['О нас', '/about'], ['Каталог', '/catalog'], ['Корзина', '/cart/phones']]} isAuthenticated={this.isAuthenticated()} logout={this.logout} />
                <Routes>
                    <Route exact path={'/'} element={<MainPage slides={this.state.slides}/>} />
                    <Route exact path={'/about'} element={<AboutPage/>} />
                    <Route path={'/catalog'}>
                      <Route index element={<CatalogPage devices={this.getDevices()} type='devices'/>} />
                      <Route path={'phones'} element={<CatalogPage devices={this.state.phones} type='phones'/>} />
                      <Route path={'laptops'} element={<CatalogPage devices={this.state.laptops} type='laptops'/>} />
                      <Route path={'watches'} element={<CatalogPage devices={this.state.watches} type='watches'/>} />
                      <Route path={':id'} element={<DevicePage devices={this.getDevices()} />} />
                    </Route>
                    <Route path={'/cart'}>
                      <Route path={'phones'} element={<CartPage devices={this.state.phones} type='phones'/>} />
                      <Route path={'laptops'} element={<CartPage devices={this.state.laptops} type='laptops'/>} />
                      <Route path={'watches'} element={<CartPage devices={this.state.watches} type='watches'/>} />
                    </Route>
                    <Route exact path={'/login'} element={this.isAuthenticated() ? 
                                                          <Navigate to='/' /> : 
                                                          <LoginPage login={(username, password) => this.login(username, password)} />} />
                    <Route exact path={'/registration'} element={<RegistrationPage register={(params) => this.register(params)}/>} />
                </Routes>
              </div>
              <FooterBlock/>
            </div>
        </BrowserRouter>
    )
}
}

export default App;
