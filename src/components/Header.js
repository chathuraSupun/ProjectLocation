import React, { Component } from 'react';
import { Text, View } from 'react-native';
export default class Header extends Component {
  render() {
    return (
      <View style={styles.viewStyle}>
        <View style={styles.backButtonView} /> 
        <View style={styles.headerTitleView}>
          <Text
            adjustsFontSizeToFit
            numberOfLines={1}
            style={styles.textStyle}>Resorts details</Text>
        </View>
        <View style={styles.rightButtonsView} />    
      </View>
    );
  }
}

const styles = {
  inputFieldIconSize: 30,
  viewStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'red',
    alignItems: 'center',
    height: 55,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
  },
  filterSearchButton: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    height: 55,
    marginRight: 10
  },
  backButton: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'stretch',
    height: 55
  },
  filterButton: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    height: 55
  },
  searchButton: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    height: 55
  },
  textStyle: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center'
  },
  headerTitleView: {
    flex: 6,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    height: 55
  },
  backButtonView: {
    flex: 1,
    alignItems: 'center',
    marginLeft: 10,
    justifyContent: 'flex-start',
    flexDirection: 'row'
  },
  rightButtonsView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginRight: 10,
  }
};
