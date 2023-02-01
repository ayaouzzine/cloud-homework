import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, UncontrolledTooltip, Row, Col } from 'reactstrap';
import { Translate, openFile, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './product.reducer';

export const ProductDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id));
  }, []);

  const productEntity = useAppSelector(state => state.gateway.product.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="productDetailsHeading">
          <Translate contentKey="gatewayApp.productorderProduct.detail.title">Product</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{productEntity.id}</dd>
          <dt>
            <span id="sku">
              <Translate contentKey="gatewayApp.productorderProduct.sku">Sku</Translate>
            </span>
          </dt>
          <dd>{productEntity.sku}</dd>
          <dt>
            <span id="upc">
              <Translate contentKey="gatewayApp.productorderProduct.upc">Upc</Translate>
            </span>
          </dt>
          <dd>{productEntity.upc}</dd>
          <dt>
            <span id="name">
              <Translate contentKey="gatewayApp.productorderProduct.name">Name</Translate>
            </span>
          </dt>
          <dd>{productEntity.name}</dd>
          <dt>
            <span id="description">
              <Translate contentKey="gatewayApp.productorderProduct.description">Description</Translate>
            </span>
          </dt>
          <dd>{productEntity.description}</dd>
          <dt>
            <span id="price">
              <Translate contentKey="gatewayApp.productorderProduct.price">Price</Translate>
            </span>
          </dt>
          <dd>{productEntity.price}</dd>
          <dt>
            <span id="productSize">
              <Translate contentKey="gatewayApp.productorderProduct.productSize">Product Size</Translate>
            </span>
          </dt>
          <dd>{productEntity.productSize}</dd>
          <dt>
            <span id="colors">
              <Translate contentKey="gatewayApp.productorderProduct.colors">Colors</Translate>
            </span>
          </dt>
          <dd>{productEntity.colors}</dd>
          <dt>
            <span id="image">
              <Translate contentKey="gatewayApp.productorderProduct.image">Image</Translate>
            </span>
            <UncontrolledTooltip target="image">
              <Translate contentKey="gatewayApp.productorderProduct.help.image" />
            </UncontrolledTooltip>
          </dt>
          <dd>
            {productEntity.image ? (
              <div>
                {productEntity.imageContentType ? (
                  <a onClick={openFile(productEntity.imageContentType, productEntity.image)}>
                    <img src={`data:${productEntity.imageContentType};base64,${productEntity.image}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {productEntity.imageContentType}, {byteSize(productEntity.image)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="imageSha1">
              <Translate contentKey="gatewayApp.productorderProduct.imageSha1">Image Sha 1</Translate>
            </span>
            <UncontrolledTooltip target="imageSha1">
              <Translate contentKey="gatewayApp.productorderProduct.help.imageSha1" />
            </UncontrolledTooltip>
          </dt>
          <dd>{productEntity.imageSha1}</dd>
          <dt>
            <span id="imageCdnUrl">
              <Translate contentKey="gatewayApp.productorderProduct.imageCdnUrl">Image Cdn Url</Translate>
            </span>
            <UncontrolledTooltip target="imageCdnUrl">
              <Translate contentKey="gatewayApp.productorderProduct.help.imageCdnUrl" />
            </UncontrolledTooltip>
          </dt>
          <dd>{productEntity.imageCdnUrl}</dd>
          <dt>
            <span id="thumbnailSha1">
              <Translate contentKey="gatewayApp.productorderProduct.thumbnailSha1">Thumbnail Sha 1</Translate>
            </span>
            <UncontrolledTooltip target="thumbnailSha1">
              <Translate contentKey="gatewayApp.productorderProduct.help.thumbnailSha1" />
            </UncontrolledTooltip>
          </dt>
          <dd>{productEntity.thumbnailSha1}</dd>
          <dt>
            <span id="thumbnailCdnUrl">
              <Translate contentKey="gatewayApp.productorderProduct.thumbnailCdnUrl">Thumbnail Cdn Url</Translate>
            </span>
            <UncontrolledTooltip target="thumbnailCdnUrl">
              <Translate contentKey="gatewayApp.productorderProduct.help.thumbnailCdnUrl" />
            </UncontrolledTooltip>
          </dt>
          <dd>{productEntity.thumbnailCdnUrl}</dd>
          <dt>
            <Translate contentKey="gatewayApp.productorderProduct.productCategory">Product Category</Translate>
          </dt>
          <dd>{productEntity.productCategory ? productEntity.productCategory.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/product" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/product/${productEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ProductDetail;
