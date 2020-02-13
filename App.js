import React from 'react';
import AlbumList from './src/AlbumList';
import PhotoList from './src/PhotoList';
import PhotoDetail from './src/PhotoDetail';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator} from 'react-navigation-stack';

const App = createStackNavigator({
  AlbumList : {screen : AlbumList},
  PhotoList : {screen : PhotoList},
  PhotoDetail : {screen : PhotoDetail}
},
  {
      initialRouteName : 'AlbumList',
  }
);

export default createAppContainer(App);


