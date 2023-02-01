import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button, Row, Col, FormText, UncontrolledTooltip } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm, ValidatedBlobField } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { IProductCategory } from 'app/shared/model/productorder/product-category.model';
import { getEntities as getProductCategories } from 'app/entities/productorder/product-category/product-category.reducer';
import { IProduct } from 'app/shared/model/productorder/product.model';
import { ProductSize } from 'app/shared/model/enumerations/product-size.model';
import { getEntity, updateEntity, createEntity, reset } from './product.reducer';

export const ProductUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const productCategories = useAppSelector(state => state.gateway.productCategory.entities);
  const productEntity = useAppSelector(state => state.gateway.product.entity);
  const loading = useAppSelector(state => state.gateway.product.loading);
  const updating = useAppSelector(state => state.gateway.product.updating);
  const updateSuccess = useAppSelector(state => state.gateway.product.updateSuccess);
  const productSizeValues = Object.keys(ProductSize);

  const handleClose = () => {
    navigate('/product' + location.search);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getProductCategories({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...productEntity,
      ...values,
      productCategory: productCategories.find(it => it.id.toString() === values.productCategory.toString()),
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
          productSize: 'XS',
          ...productEntity,
          productCategory: productEntity?.productCategory?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gatewayApp.productorderProduct.home.createOrEditLabel" data-cy="ProductCreateUpdateHeading">
            <Translate contentKey="gatewayApp.productorderProduct.home.createOrEditLabel">Create or edit a Product</Translate>
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
                  id="product-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('gatewayApp.productorderProduct.sku')}
                id="product-sku"
                name="sku"
                data-cy="sku"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('gatewayApp.productorderProduct.upc')}
                id="product-upc"
                name="upc"
                data-cy="upc"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('gatewayApp.productorderProduct.name')}
                id="product-name"
                name="name"
                data-cy="name"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                }}
              />
              <ValidatedField
                label={translate('gatewayApp.productorderProduct.description')}
                id="product-description"
                name="description"
                data-cy="description"
                type="textarea"
              />
              <ValidatedField
                label={translate('gatewayApp.productorderProduct.price')}
                id="product-price"
                name="price"
                data-cy="price"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  min: { value: 0, message: translate('entity.validation.min', { min: 0 }) },
                  validate: v => isNumber(v) || translate('entity.validation.number'),
                }}
              />
              <ValidatedField
                label={translate('gatewayApp.productorderProduct.productSize')}
                id="product-productSize"
                name="productSize"
                data-cy="productSize"
                type="select"
              >
                {productSizeValues.map(productSize => (
                  <option value={productSize} key={productSize}>
                    {translate('gatewayApp.ProductSize.' + productSize)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('gatewayApp.productorderProduct.colors')}
                id="product-colors"
                name="colors"
                data-cy="colors"
                type="text"
                validate={{
                  pattern: {
                    value: /^([a-z]+,)*[a-z]+$/,
                    message: translate('entity.validation.pattern', { pattern: '^([a-z]+,)*[a-z]+$' }),
                  },
                }}
              />
              <ValidatedBlobField
                label={translate('gatewayApp.productorderProduct.image')}
                id="product-image"
                name="image"
                data-cy="image"
                isImage
                accept="image/*"
                validate={{}}
              />
              <UncontrolledTooltip target="imageLabel">
                <Translate contentKey="gatewayApp.productorderProduct.help.image" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('gatewayApp.productorderProduct.imageSha1')}
                id="product-imageSha1"
                name="imageSha1"
                data-cy="imageSha1"
                type="text"
                validate={{
                  minLength: { value: 40, message: translate('entity.validation.minlength', { min: 40 }) },
                  maxLength: { value: 40, message: translate('entity.validation.maxlength', { max: 40 }) },
                  pattern: { value: /[a-f0-9]{40}/, message: translate('entity.validation.pattern', { pattern: '[a-f0-9]{40}' }) },
                }}
              />
              <UncontrolledTooltip target="imageSha1Label">
                <Translate contentKey="gatewayApp.productorderProduct.help.imageSha1" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('gatewayApp.productorderProduct.imageCdnUrl')}
                id="product-imageCdnUrl"
                name="imageCdnUrl"
                data-cy="imageCdnUrl"
                type="text"
              />
              <UncontrolledTooltip target="imageCdnUrlLabel">
                <Translate contentKey="gatewayApp.productorderProduct.help.imageCdnUrl" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('gatewayApp.productorderProduct.thumbnailSha1')}
                id="product-thumbnailSha1"
                name="thumbnailSha1"
                data-cy="thumbnailSha1"
                type="text"
                validate={{
                  minLength: { value: 40, message: translate('entity.validation.minlength', { min: 40 }) },
                  maxLength: { value: 40, message: translate('entity.validation.maxlength', { max: 40 }) },
                  pattern: { value: /[a-f0-9]{40}/, message: translate('entity.validation.pattern', { pattern: '[a-f0-9]{40}' }) },
                }}
              />
              <UncontrolledTooltip target="thumbnailSha1Label">
                <Translate contentKey="gatewayApp.productorderProduct.help.thumbnailSha1" />
              </UncontrolledTooltip>
              <ValidatedField
                label={translate('gatewayApp.productorderProduct.thumbnailCdnUrl')}
                id="product-thumbnailCdnUrl"
                name="thumbnailCdnUrl"
                data-cy="thumbnailCdnUrl"
                type="text"
              />
              <UncontrolledTooltip target="thumbnailCdnUrlLabel">
                <Translate contentKey="gatewayApp.productorderProduct.help.thumbnailCdnUrl" />
              </UncontrolledTooltip>
              <ValidatedField
                id="product-productCategory"
                name="productCategory"
                data-cy="productCategory"
                label={translate('gatewayApp.productorderProduct.productCategory')}
                type="select"
              >
                <option value="" key="0" />
                {productCategories
                  ? productCategories.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.id}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/product" replace color="info">
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

export default ProductUpdate;
