import React, { Component,useState, useRef } from 'react'
import { Text, View, StyleSheet, Image, TouchableWithoutFeedback, Dimensions, TouchableOpacity, FlatList, Animated } from 'react-native'
import SlidingUpPanel from 'rn-sliding-up-panel';
import Carousel from 'react-native-snap-carousel'
import data from './data';
import dataUser from './dataUser';
import transactions from './transactions';
import Icon from 'react-native-vector-icons/AntDesign'
const App =()=>{
  state= {
    data: data,
    dataUser: dataUser,
    transactions : transactions
  }
  
  

  renderUser = item => {
    return(
      <View style={styles.AddUser}>
      <Image style={styles.AddUserIcon} source={item.userImage}/>
      <Text style={{color:'white'}}>{item.userName}</Text>
      </View>

    )
  }
  renderListTransactions =item=> {
    
      return(
         
        <View  style={styles.PannelItem}>
        <View  style={{flexDirection: "row", alignItems:'center'}}>
       
        </View>
        <View>
        
        <Text  style={{fontSize: 10, color: 'white', opacity: 0.6}}>{item.transactionDate}</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems:'center',}}>
        <Text style={{fontSize: 16, color:'#fff', marginHorizontal: 2}}>{item.money}
        </Text>
        {item.credit? (
         <Icon name="arrowup" size={22} color='green' />
        ) : (
         <Icon name="arrowdown" size={22} color='red' />
        )}
        </View>
        </View>
        
      )
        
     

    
      
        
       
     }
  

   RenderItem = ({item})=> {
    return (
      <TouchableWithoutFeedback>
      <Image source={item.image} style={{width: 360, height: 290, borderRadius: 10, backgroundColor: '#000'}}/>
      </TouchableWithoutFeedback>
    )
  }
  
    const {width, height}= Dimensions.get('window');
  const carouselRef= useRef(null);
  const [dragRange,
  setDragRage] = useState({
    top:height-80,
    bottom: 160
  })
  const _draggedValue= new Animated.Value(180)

  const ModalRef =useRef(null);
    
    return (
      <View style={styles.container}>
        <View style={{paddingTop: 50, paddingHorizontal:14}}>
        <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems: 'center'}}>
        <View>
        <Text style={{fontSize: 26, color:'#fff'}}>Welcome back</Text>
        <Text style={{fontSize: 26, color:'#fff', opacity: 0.6}} >Nicola Montaleone</Text>
        </View>
        <View>
        <Image source={require('./img/react-jpeg.png')} style={styles.ProfileImage}/>
        <View style={styles.ProfileImageNotification}></View>
        </View>
        
        </View>
        <View>
        <Carousel
        layout={"tinder"}
        ref={carouselRef}
        data={this.state.data}
        sliderWidth={width}
        itemWidth={width-10}
        renderItem={item => this.RenderItem(item)}
        swipeThreshold={100}
        layoutCardOffset={-12}
        inactiveSlideOpacity={0.4}
        containerCustomStyle={{
          overflow: 'visible',
          marginVertical: 30
        }


        }
        contentContainerCustomStyle= {{
          paddingTop: 14,

        }}
        />
        
        </View>
        <View>
        <Text style={{color:"#fff", opacity: 0.5, marginBottom:10}}>Send Money</Text>
        <View style={{flexDirection: 'row' }}>
        <TouchableOpacity style={styles.AddUser}>
        <View style={styles.AddUserIcon}>
        <Icon name="plus" style={{color:'white', fontSize: 24, alignSelf: 'center'}}/>
        
        </View>
        <Text style={{color: 'white'}}>Add user</Text>
        </TouchableOpacity>
       <FlatList
       
       horizontal
       data={this.state.dataUser}
       keyExtractor={item => item.key}
       renderItem={({item}) => this.renderUser(item)}
         />
        </View>
        
        </View>
        </View>

        <View style={{flex: 1}}>
        <SlidingUpPanel
        ref={ModalRef}
        draggableRange={dragRange}
        animatedValue={_draggedValue}
        backdropOpacity={0}
        snappingPoints={[360]}
        height={height +20}
        friction={0.9}

        
        >
        <View style={{flex: 1, backgroundColor: "#0c0c0c", borderRadius: 24, padding: 14
       }}>
       <View style={styles.Pannel}></View>
       <View>
       <Text style={{marginVertical: 16, color: 'white'}}>Recent Transactions</Text>
       </View>
       <View style={{height: 500, marginBottom: 10}}>
       <FlatList
       data={this.state.transactions}
       keyExtractor={item=> item.key}
       renderItem={({item})=> this.renderListTransactions(item)}
       
       />
       </View>
       <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
       <TouchableOpacity style={styles.PannelButton}>
       <Text style={styles.PannelButtonText}>View Full History</Text>
       
       </TouchableOpacity>
       
       </View>
       </View>
        
        </SlidingUpPanel>
        </View>
      </View>
    )
  } 


const styles= StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    paddingTop: 0

  }, 
  ProfileImage: {
    width: 55,
    height: 55,
    borderRadius: 40
  },
  ProfileImageNotification: {
    height: 12,
    width: 12,
    backgroundColor: "#4853ef",
    borderRadius: 6,
    position: 'absolute',
    right: 6,
    borderWidth: 2,
    borderColor: '#000'

  } , 
  AddUser: {
    height: 140,
    width: 100,
    justifyContent: 'center', 
    alignItems: 'center',
    backgroundColor: '#0c0c0c',
    borderRadius: 10,
    marginRight: 14


  },  AddUserIcon: {
    width: 70,
    height: 70,
    backgroundColor: '#000',
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'center'
  }, Pannel: {
    height: 5,
    width: 50,
    backgroundColor: '#666',
    borderRadius: 6,
    alignSelf: 'center',
    marginTop: 6
  }, PannelItem: {
    borderWidth: 0.6,
    borderColor: '#666',
    padding: 14,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20

  },
  PanelImage : {
    width: 30,
    height: 30,
    backgroundColor: '#000',
    borderRadius: 40

  },
  PannelButton: {
    padding : 14,
    width: 200,
    justifyContent:'center',
    backgroundColor: '#1c1c1c',
    borderRadius: 10

  }, 
  PannelButtonText: {
    fontSize: 16,
    color: 'white',
alignSelf: 'center'
  }
})
export default App;