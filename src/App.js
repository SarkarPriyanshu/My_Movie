import React, { useState,useEffect } from 'react'
import { HashRouter, Route} from 'react-router-dom'
import Trending from './components/trending'
import Detail from './components/detail'
import CastAndCrew from './components/castandcrew'
import WishList from "./components/wishlist";
import TVSeries from "./components/tvseries";
import Popular from "./components/popular";
import TopRated from "./components/toprated";
import UpComing from "./components/upcoming";
import Nav from "./components/nav";
import './App.css';

function App() {
 
  function handleAddWishlist(e){
    console.log(`${e} Clicked !!!`)
  }
  
  return <>
    <HashRouter>
      <Nav/>
      <Route path="/" exact component={Trending}/>
      <Route path="/detail/:category/:id" exact  component={Detail} handleAddWishlist={handleAddWishlist}/>
      <Route path="/detail/cast_and_crew/:category/:id" component={CastAndCrew}/>
      <Route path="/wishlist" exact component={WishList}/>
      <Route path="/series" exact component={TVSeries}/>
      <Route path="/popular" exact component={Popular}/>
      <Route path="/toprated" exact component={TopRated}/>
      <Route path="/upcoming" exact component={UpComing}/>
    </HashRouter>
  </>
}

export default App;
