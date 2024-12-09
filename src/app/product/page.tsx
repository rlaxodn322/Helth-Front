'use client';
import React, { useState, useEffect } from 'react';
import { getAllProducts } from '../../apis/productService';
import Link from 'next/link';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      setProducts(response.data);
    } catch (err) {
      console.error('Failed to load product list.', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <Link href="../../product/list" style={{ float: 'right' }}>
        Add Product
      </Link>
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Product List
      </h1>

      <div className="mt-4 space-y-4">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="p-4 border rounded-md shadow-sm bg-gray-50"
            >
              <h3 className="text-lg font-semibold">{product.title}</h3>
              <p className="text-sm text-gray-600">{product.description}</p>
              <p className="mt-2 text-lg font-medium">{`Price: ₩${product.price}`}</p>
              {product.images && product.images.length > 0 && (
                <div className="mt-4">
                  {product.images.map((image, index) => (
                    <img
                      key={index}
                      src={image} // 백엔드에서 반환된 이미지 경로를 그대로 사용
                      alt={`Product Image ${index + 1}`}
                      className="w-24 h-24 object-cover rounded-md mr-2"
                    />
                  ))}
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-gray-500">No products available.</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
