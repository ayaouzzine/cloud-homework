import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './order-item.reducer';

export const OrderItemDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const orderItemEntity = useAppSelector(state => state.gateway.orderItem.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="orderItemDetailsHeading">
          <Translate contentKey="gatewayApp.productorderOrderItem.detail.title">OrderItem</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{orderItemEntity.id}</dd>
          <dt>
            <span id="quantity">
              <Translate contentKey="gatewayApp.productorderOrderItem.quantity">Quantity</Translate>
            </span>
          </dt>
          <dd>{orderItemEntity.quantity}</dd>
          <dt>
            <span id="totalPrice">
              <Translate contentKey="gatewayApp.productorderOrderItem.totalPrice">Total Price</Translate>
            </span>
          </dt>
          <dd>{orderItemEntity.totalPrice}</dd>
          <dt>
            <span id="status">
              <Translate contentKey="gatewayApp.productorderOrderItem.status">Status</Translate>
            </span>
          </dt>
          <dd>{orderItemEntity.status}</dd>
          <dt>
            <Translate contentKey="gatewayApp.productorderOrderItem.product">Product</Translate>
          </dt>
          <dd>{orderItemEntity.product ? orderItemEntity.product.id : ''}</dd>
          <dt>
            <Translate contentKey="gatewayApp.productorderOrderItem.order">Order</Translate>
          </dt>
          <dd>{orderItemEntity.order ? orderItemEntity.order.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/order-item" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/order-item/${orderItemEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default OrderItemDetail;