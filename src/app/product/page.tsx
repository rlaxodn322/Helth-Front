'use client';
import React, { useState, useEffect } from 'react';
import { getAllProducts, deleteProduct } from '../../apis/productService';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  const fetchProducts = async () => {
    try {
      const response = await getAllProducts();
      console.log(response);
      setProducts(response.data);
    } catch (err) {
      console.error('Failed to load product list.', err);
    }
  };
  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((product) => product.id !== id)); // 삭제 후 제품 목록에서 제거
      console.log('Product deleted');
    } catch (err) {
      console.error('Failed to delete product.', err);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-8 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 rounded-xl shadow-xl mt-12">
      <Link
        href="../../product/list"
        className="text-white bg-blue-600 hover:bg-blue-700 py-2 px-6 rounded-full text-sm font-semibold "
      >
        Add Product
      </Link>

      <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-900">
        헬스 제품 리뷰
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product.id}
              className="group bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:scale-105"
            >
              <div className="relative">
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600">
                  품목: {product.title}
                </h3>
                <p className="text-sm text-gray-500">
                  설명: {product.description}
                </p>
                <p className="mt-4 text-lg font-medium text-gray-900">{`ID: ${product.user.email}`}</p>
                <p className="mt-4 text-lg font-medium text-gray-900">{`비용 ₩${product.price}`}</p>

                {product.images && product.images.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {product.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Product Image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-md"
                      />
                    ))}
                  </div>
                )}
                <button
                  onClick={() => handleDelete(product.id)}
                  className="mt-2 text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products available.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
