import React from 'react'
import { View, Platform, StatusBar } from 'react-native'
import AddEntry from './components/AddEntry'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import History from './components/History'
import store from './Store'
import { purple, white } from './utils/colors'
import { TabNavigator } from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'


function CustomStatusBar ({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}


const Tabs = TabNavigator(
  //structure via 1st argument to TabNavigator()
	{
		History: {
			screen: History,
			navigationOptions: {
				tabBarLabel: 'History',
				tabBarIcon: ({ tintColor }) => (
					<Ionicons name="ios-bookmarks" size={30} color={tintColor} />
				)
			}
		},
		AddEntry: {
			screen: AddEntry,
			navigationOptions: {
				tabBarLabel: 'Add Entry',
				tabBarIcon: ({ tintColor }) => (
					<FontAwesome name="plus-square" size={30} color={tintColor} />
				)
			}
		}
	},
  //style via 2nd argument to TabNavigator()
	{
    navigationOptions: {
      header: null
    },
		tabBarOptions: {
			activeTintColor: Platform.OS === 'ios' ? purple : white,
			style: {
				height: 56,
				backgroundColor: Platform.OS === 'ios' ? white : purple,
				shadowRadius: 6,
				shadowOpacity: 1,
				shadowColor: 'rgba(0, 0, 0, 0.24)',
				shadowOffset: {
					width: 0,
					height: 3
				}
			}
		}
	}
)

export default class App extends React.Component {
	render() {
		return (
			<Provider store={store}>
				<View style={{ flex: 1 }}>
          <CustomStatusBar backgroundColor={purple} barStyle='light-content' />
					<Tabs />
				</View>
			</Provider>
		)
	}
}
