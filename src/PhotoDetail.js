import React, { Component } from 'react';
import {View, StyleSheet} from 'react-native';
import ImageLoad from 'react-native-image-placeholder';

class PhotoDetail extends Component{

    static navigationOptions = {
        title: 'Detail Image',
      };

      render(){
        const bundle = this.props.navigation.state.params
          return(
              <View styles = {styles.container}>
                  <ImageLoad
                        style={styles.ivPic}
                        loadingStyle={{ size: 'large', color: '#00FF00' }}
                        source={{ uri: bundle.data}}
                        />
              </View>
          )
      }

}

export default PhotoDetail

const styles = StyleSheet.create({
    container : {
        backgroundColor : '#FFFFFF',
        flex:1, 
        alignItems:'center',
        justifyContent:'center',
        margin : 10
    },
    ivPic : {
        width : 250, 
        height : 250,
        margin : 20
    }

})