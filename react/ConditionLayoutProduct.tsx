import React, { useMemo } from 'react'
import { useProduct } from 'vtex.product-context'

import ConditionLayout from './ConditionLayout'

export const PRODUCT_SUBJECTS = {
  productId: {
    type: 'value',
  },
  categoryId: {
    type: 'value',
  },
  brandId: {
    type: 'value',
  },
  selectedItemId: {
    type: 'value',
  },
  productClusters: {
    type: 'array',
    id: 'id',
  },
  categoryTree: {
    type: 'array',
    id: 'id',
  },
  specificationGroups: {
    type: 'array',
    id: 'name',
  },
} as const

const Product: StorefrontFunctionComponent = ({ children }) => {
  const { product, selectedItem } = useProduct() as any
  const { productId, categoryId, brandId, productClusters, categoryTree, specificationGroups} =
    product ?? {}
  const { itemId: selectedItemId } = selectedItem ?? {}

  // We use a useMemo to modify the a condition layout "values"
  // only when some of the context props change.
  const values = useMemo(
    () => ({
      productId,
      categoryId,
      brandId,
      productClusters,
      categoryTree,
      selectedItemId,
      specificationGroups
    }),
    [
      brandId,
      categoryId,
      categoryTree,
      productClusters,
      productId,
      selectedItemId,
      specificationGroups
    ]
  )

  // Sometimes it takes a while for useProduct() to return the correct results
  if (values.selectedItemId == null || values.productId == null) {
    return null
  }

  return (
    <ConditionLayout values={values} subjects={PRODUCT_SUBJECTS}>
      {children}
    </ConditionLayout>
  )
}

Product.schema = {
  title: 'admin/editor.condition-layout.wrapper.product',
}

export default Product
