import React from 'react';
import { StyleSheet,FlatList, ActivityIndicator, Text, View,ToastAndroid  } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import NetInfo from '@react-native-community/netinfo'

export default class AlbumList extends React.Component {

    static navigationOptions = {
        title: 'Home',
        headerTitleStyle :{textAlign: 'center',alignSelf:'center', color : 'white'},
        headerStyle:{
            backgroundColor:'#343A41'
        },
      };

    constructor(props){
        super(props);
        this.state = {isLoading : true, isNetOk : true}
    }

    handleOnClick = (item) =>{
        const { navigate } = this.props.navigation;
        ToastAndroid.show(item.title, ToastAndroid.SHORT)
        navigate('PhotoList', {
            data: item.id,
          })
    }

    retryClicked(){
        ToastAndroid.show(this.state.isNetOk ? 'Connected' : 'Unable to connect!', ToastAndroid.SHORT)
    }

  componentDidMount(){

    NetInfo.addEventListener(state => {
        this.setState({isNetOk : state.isConnected})
      });
     
  }

  doFetchApiData(){

       //https://facebook.github.io/react-native/movies.json
      //https://jsonplaceholder.typicode.com/albums
    return fetch('https://jsonplaceholder.typicode.com/albums')
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

  render(){

    if(!this.state.isNetOk){

        console.log('Intenet is not ok!')

        return(
            <View style={styles.internetContainer}>
                  <Text style = {{color : 'red', fontSize : 18}}>No Internet Connection Found.</Text>
                  <TouchableOpacity style = {styles.btnStyle} onPress = {this.retryClicked.bind(this, null)}>
                      <Text style = {{color : 'black', fontSize : 16}} >Retry</Text>
                  </TouchableOpacity>
            </View>
        )
    }else{

        console.log('Internet is ok')
        
        if(this.state.isLoading){

            this.doFetchApiData()

            console.log('Loading....')

            return(
                <View style={styles.loadingView}>
                      <ActivityIndicator
                       color="#00FF00"
                          size = 'large'
                      />
                </View>
            )
        } 
        
        console.log('Loaded!')

        return(
            <View style = {styles.contentView}>
                <FlatList
                    data = {this.state.dataSource}
                    renderItem = {({item}) => 
    
                    <TouchableOpacity
                        style = {styles.itemViewStyle} 
                        onPress = {this.handleOnClick.bind(this,item)}
                    >
                        <Text style = {styles.itemTextStyle} >{item.title}</Text>
                    </TouchableOpacity>
    
                    }
                    keyExtractor={({id}, index) => id}
                />
    
             </View>
        )

    }

    
}
}

const styles = StyleSheet.create({
    btnStyle : {
        padding : 10,
        margin : 10,
        width : 100,
        alignItems : 'center',
        borderColor : '#000000',
        borderWidth : 1,
        borderRadius : 5
    },
    loadingView : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    internetContainer : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center'
    },
    contentView : {
        flex : 1,
        padding : 10,
        backgroundColor : '#FDDCB3'
    },
    itemViewStyle:{
        flexDirection : 'column',
        justifyContent : 'space-between',
        alignItems : 'center',
        borderColor : '#343A41',
        borderWidth : 1,
        borderRadius : 5,
        margin : 5,
        marginStart : 10,
        marginEnd : 10,
        backgroundColor : '#d2f7f1',
        padding : 30
    },
    itemTextStyle : {
        color : '#000000'
    }
})