import React, { Component } from 'react';
import { Animated,ActivityIndicator,FlatList,StyleSheet, View, Image,Dimensions, ToastAndroid } from 'react-native';
import ImageLoad from 'react-native-image-placeholder';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class PhotoList extends Component {

  static navigationOptions = {
    title: 'Album Photos',
  };

  constructor(props){
    super(props);
    this.state = {isLoading : true, opacity: new Animated.Value(0)}
  }

  onPicClicked(item){
    const { navigate } = this.props.navigation;

    //ToastAndroid.show('Selected '+ item.url, ToastAndroid.SHORT)

    navigate('PhotoDetail', {
      data: item.url,
    })
  }

  componentDidMount(){

    const bundle = this.props.navigation.state.params

    //'https://jsonplaceholder.typicode.com/albums/'+ bundle.data +'/photos'
    // https://jsonplaceholder.typicode.com/albums/1/photos

    return fetch('https://jsonplaceholder.typicode.com/albums/'+ bundle.data +'/photos')
            .then((response) => response.json())
            .then((responseJson) => {
              this.setState({
                isLoading: false,
                dataSource: responseJson,
              });
      
            })
            .catch((error) =>{
              console.error(error);
            });

  }

  render() {

    const { navigate } = this.props.navigation;

    const {
      placeholderColor,
      style,
      source
    } = this.props
   
    if(this.state.isLoading){
      return(
          <View style={styles.loadingView}>
                <ActivityIndicator
                 color="#00FF00"
                    size = 'large'
                />
          </View>
      )
  }
  

  return(
   
    <View style = {styles.container}>

      <FlatList
          data = {this.state.dataSource}
          numColumns = {2}
          renderItem = {({item}) => 
          <TouchableOpacity  onPress = {this.onPicClicked.bind(this, item)}>

            <ImageLoad 
              style={styles.imageStyle}
              loadingStyle={{ size: 'large', color: 'blue' }}
              source={{ uri: item.thumbnailUrl }}
              isShowActivity = {false}
            />
          </TouchableOpacity>
          }
          keyExtractor={({id}, index) => id}
      />

 </View>
)

}
}

const w = Dimensions.get('window');

const styles = StyleSheet.create({

  loadingView : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center'
  },
  container: {
    backgroundColor: '#e1e4e8',
  },
  imageStyle : {
    margin : 10,
    width : 170,
    height : 170,
    borderRadius : 5
  }
});