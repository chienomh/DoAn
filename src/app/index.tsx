/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { useTranslation } from 'react-i18next';
import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { HomePage } from './pages/HomePage/Loadable';
import MenPage from './pages/MenPage';
import WomenPage from './pages/WomenPage';
import AboutShop from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import LoginForm from './pages/authentication/login';
import RegisterForm from './pages/authentication/register';
import DetailPage from './pages/DetailProduct';
import CardPage from './pages/CardPage';
import ChangePassword from './pages/ChangePasswordPage';
import Profile from './pages/Profile';
import ViewOders from './pages/ViewOdersPage';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - React Boilerplate"
        defaultTitle="React Boilerplate"
        htmlAttributes={{ lang: i18n.language }}
      ></Helmet>

      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/products" component={MenPage} />
        <Route exact path="/about" component={AboutShop} />
        <Route exact path="/contact" component={ContactPage} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/register" component={RegisterForm} />
        <Route exact path="/detail-products/:id" component={DetailPage} />
        <Route exact path="/card" component={CardPage} />
        <Route exact path="/change-password" component={ChangePassword} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/view-oders" component={ViewOders} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}
