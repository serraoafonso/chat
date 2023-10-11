import { View, Text, StyleSheet,  Pressable} from 'react-native'
import React, { useContext } from 'react'
import { UserContext } from '../context/userContext'

const Navbar = () => {

  const {user, verifyUser} = useContext(UserContext)

  function handleLogout(){
    verifyUser('')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Mychat</Text>
      <Pressable style={styles.pressable} onPress={()=>handleLogout()}>
        <Text>Log out</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    height: 80,
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#6ac2e6',
    borderBottomColor: 'black',
    borderBottomWidth: 1
  },
  text: {
    alignItems: 'center',
    fontSize: 27
  },
  pressable:{
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff'
  }
})

export default Navbar