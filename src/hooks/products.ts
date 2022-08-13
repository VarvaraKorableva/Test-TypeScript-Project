import React, {useEffect,useState} from 'react';
//import {Product} from '../components/Product'
//import {products} from '../data/products';
import axios, { AxiosError } from 'axios';
import { Iproduct } from '../models';

export function useProducts() {
  const [products,setProducts] = useState<Iproduct[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function addProduct(product: Iproduct){
    setProducts( prev => [...prev,product])
  }

  async function fetchProduct() {
    try {
      setError("")
      setLoading(true)
      const response = await axios.get<Iproduct[]>('https://fakestoreapi.com/products?limit=10')
      setProducts(response.data)
      setLoading(false)
    } catch (e: unknown) {
      const error = e as AxiosError
      setLoading(false)
      setError(error.message)
    }
  }

  useEffect(() => {
    fetchProduct();
  }
  ,[])

  return {products, loading, error, addProduct }
}

