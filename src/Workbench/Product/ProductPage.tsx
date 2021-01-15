import { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/configureStore';

export default function ProductPage(): ReactElement {
  const dispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.kravbank);
  const [productList, setProductList] = useState(products);
  const [showEditor, setShowEdior] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  return <p>Products</p>;
}
