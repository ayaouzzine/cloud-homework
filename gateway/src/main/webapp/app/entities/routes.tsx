import React from 'react';
import { Route } from 'react-router-dom';

import ErrorBoundaryRoutes from 'app/shared/error/error-boundary-routes';

import { ReducersMapObject, combineReducers } from '@reduxjs/toolkit';

import getStore from 'app/config/store';

import entitiesReducers from './reducers';

import Product from './productorder/product';
import ProductCategory from './productorder/product-category';
import Customer from './productorder/customer';
import ProductOrder from './productorder/product-order';
import OrderItem from './productorder/order-item';
import Invoice from './invoice/invoice';
import Shipment from './invoice/shipment';
import Notification from './notification/notification';
/* jhipster-needle-add-route-import - JHipster will add routes here */

export default () => {
  const store = getStore();
  store.injectReducer('gateway', combineReducers(entitiesReducers as ReducersMapObject));
  return (
    <div>
      <ErrorBoundaryRoutes>
        {/* prettier-ignore */}
        <Route path="product/*" element={<Product />} />
        <Route path="product-category/*" element={<ProductCategory />} />
        <Route path="customer/*" element={<Customer />} />
        <Route path="product-order/*" element={<ProductOrder />} />
        <Route path="order-item/*" element={<OrderItem />} />
        <Route path="invoice/*" element={<Invoice />} />
        <Route path="shipment/*" element={<Shipment />} />
        <Route path="notification/*" element={<Notification />} />
        {/* jhipster-needle-add-route-path - JHipster will add routes here */}
      </ErrorBoundaryRoutes>
    </div>
  );
};
