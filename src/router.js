import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';

import {Root} from './view/Root';
import {BookList} from './view/BookList';
import { BookDetails } from './view/BookDetails';
import { Cart } from './view/Cart';
import { Orders } from './view/Orders';
import { Profile } from './view/Profile';
import { Login } from './view/Login';
import { OrderDetails } from './view/OrderDetails';
export const router=createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Root/>}>
      <Route index element={<BookList/>}/>
      <Route path="book/:id" element={<BookDetails/>}/>
      <Route path='cart' element={<Cart/>}/>
      <Route path='orders' element={<Orders/>}/>
      <Route path='orders/:id' element={<OrderDetails/>}/>
      <Route path='profile' element={<Profile/>}/>
      <Route path='login' element={<Login/>}/>
    </Route>
  ))