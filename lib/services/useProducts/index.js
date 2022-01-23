import { useEffect, useState } from 'react';
import httpClient from '../httpClient';

const url = '/product';

const useProducts = (callType) => {
  const [products, setProducts] = useState([]);
  // const [product, setProduct] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getProducts = async () => {
    let errorMessage = '';
    setLoading(true);

    try {
      const { data } = await httpClient({
        method: 'GET',
        url: `${url}s`
      });
      const { data: productsList, message, success } = data;

      errorMessage = !success ? message : '';

      setProducts(productsList);
    } catch (error) {
      errorMessage = error;
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [callType]);
  
  return { products, error, loading };
};

export default useProducts;
