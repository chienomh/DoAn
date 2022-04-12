import '@splidejs/splide/dist/css/splide.min.css';
import LayoutShop from 'app/components/ShopLayout';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import BestSale from './components/bestSellers';
import Middle from './components/middle/index';
import SlideShow from './components/sliderShow';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Trang chủ</title>
      </Helmet>
      <LayoutShop>
        <SlideShow />
        <Middle />
        <BestSale />
      </LayoutShop>
    </>
  );
}
