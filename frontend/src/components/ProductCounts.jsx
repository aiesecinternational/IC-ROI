import React from 'react';
import ProductCard from './ProductCard';

const ProductCounts = ({productCounts}) => {
    return (
        <div className='flex flex-wrap justify-center items-center p-2 gap-4'>
            {productCounts.map((productCount, index) => (
                <div key={productCount.id}>
                    <ProductCard props={{ product: productCount.product, type: productCount.type,  count: productCount.count, name: productCount.name}}/>
                </div>
            ))}
        </div>
    );
}

export default ProductCounts;