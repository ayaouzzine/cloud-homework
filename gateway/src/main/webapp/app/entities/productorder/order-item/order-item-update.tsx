import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IProduct } from 'app/shared/model/productorder/product.model';
import { getEntities as getProducts } from 'app/entities/productorder/product/product.reducer';
import { IProductOrder } from 'app/shared/model/productorder/product-order.model';
import { getEntities as getProductOrders } from 'app/entities/productorder/product-order/product-order.reducer';
import { IOrderItem } from 'app/shared/model/productorder/order-item.model';
import { OrderItemStatus } from 'app/shared/model/enumerations/order-item-status.model';
import { getEntity, updateEntity, createEntity, reset } from './order-item.reducer';

export const OrderItemUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const products = useAppSelector(state => state.gateway.product.entities);
  const productOrders = useAppSelector(state => state.gateway.productOrder.entities);
  const orderItemEntity = useAppSelector(state => state.gateway.orderItem.entity);
  const loading = useAppSelector(state => state.gateway.orderItem.loading);
  const updating = useAppSelector(state => state.gateway.orderItem.updating);
  const updateSuccess = useAppSelector(state => state.gateway.orderItem.updateSuccess);
  const orderItemStatusValues = Object.keys(OrderItemStatus);

  const handleClose = () => {
    navigate('/order-item' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getProducts({}));
    dispatch(getProductOrders({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...orderItemEntity,
      ...values,
      product: products.find(it => it.id.toString() === values.product.toString()),
      order: productOrders.find(it => it.id.toString() === values.order.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          status: 'AVAILABLE',
          ...orderItemEntity,
          product: orderItemEntity?.product?.id,
          order: orderItemEntity?.order?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gatewayApp.productorderOrderItem.home.createOrEditLabel" data-cy="OrderItemCreateUpdateHeading">
            <Translate contentKey="gatewayApp.productorderOrderItem.home.createOrEditLabel">Create or edit a OrderItem</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="order-item-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('gatewayApp.productorderOrderItem.quantity')}
                id="order-item-quantity"
                name="quantity"
                data-cy="quantity"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  min: { value: 0, message: translate('entity.validation.min', { min: 0 }) },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('gatewayApp.productorderOrderItem.totalPrice')}
                id="order-item-totalPrice"
                name="totalPrice"
                data-cy="totalPrice"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  min: { value: 0, message: translate('entity.validation.min', { min: 0 }) },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('gatewayApp.productorderOrderItem.status')}
                id="order-item-status"
                name="status"
                data-cy="status"
                type="select"
              >
                {orderItemStatusValues.map(orderItemStatus => (
                  <option value={orderItemStatus} key={orderItemStatus}>
                    {translate('gatewayApp.OrderItemStatus.' + orderItemStatus)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                id="order-item-product"
                name="product"
                data-cy="product"
                label={translate('gatewayApp.productorderOrderItem.product')}
                type="select"
              >
                <option value="" key="0" />
                {products
                  ? products.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <ValidatedField
                id="order-item-order"
                name="order"
                data-cy="order"
                label={translate('gatewayApp.productorderOrderItem.order')}
                type="select"
              >
                <option value="" key="0" />
                {productOrders
                  ? productOrders.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/order-item" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default OrderItemUpdate;
