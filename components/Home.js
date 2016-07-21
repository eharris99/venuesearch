import React, { Component } from 'react'
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	TouchableOpacity,
	ListView
} from 'react-native'

class Home extends Component {
	constructor(props, context){
		super(props, context)
		this.queryUpdated = this.queryUpdated.bind(this)
		this.searchVenues = this.searchVenues.bind(this)

		var dataSource = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2,
		})


		this.state = {
			query: '',
			latLng: '',
			venues: dataSource
		}
	}

	componentDidMount(){
		console.log('componentDidMount: ')
		navigator.geolocation.getCurrentPosition(
			location => {
				const coordinates = location.coords.latitude+','+location.coords.longitude

				console.log('LOCATION: '+coordinates)
				this.setState({
					latLng: coordinates
				})
			},
			error => {

			}
		)
	}

	queryUpdated(text){
		// console.log('queryUpdated: '+text)
		this.setState({
			query: text
		})
	}

	renderRow(venue, sId, rId){
		return (
			<View style={styles.row}>
				<Text>{venue.name}</Text>
			</View>
		)

	}

	searchVenues(){
		var coords = (this.state.latLng.length == 0) ? '40.7430169,-73.9888682' : this.state.latLng

		var url = 'https://api.foursquare.com/v2/venues/search?v=20140806&ll='+coords+'&query='+this.state.query+'&client_id=VZZ1EUDOT0JYITGFDKVVMCLYHB3NURAYK3OHB5SK5N453NFD&client_secret=UAA15MIFIWVKZQRH22KPSYVWREIF2EMMH0GQ0ZKIQZC322NZ'

		console.log('searchVenues: '+url)

		fetch(url)
		.then((response) => response.json())
		.then((json) => {
			var venues = json.response.venues
			console.log(JSON.stringify(venues))
			this.setState({
				venues: this.state.venues.cloneWithRows(venues)
			})
		})
		.catch((error) => {
			console.log('ERROR: '+error)

		})
	}

	render(){
		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<TextInput onChangeText={this.queryUpdated} style={styles.searchField} />
					<TouchableOpacity onPress={this.searchVenues} style={styles.btnSearch}>
						<Text>Search</Text>
					</TouchableOpacity>
				</View>
				<ListView style={styles.table} dataSource={this.state.venues} renderRow={this.renderRow} />

			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 16,
		backgroundColor: '#f9f9f9'
	},
	header: {
		flexDirection: 'row',
		paddingTop: 16,
		backgroundColor: '#f9f9f9'
	},
	btnSearch: {
		backgroundColor: 'red'
	},
	table: {
		paddingTop: 16

	},
	row: {
		height: 44

	},
	searchField: {
		flex: 1,
		height: 40,
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 3,
		backgroundColor: '#fff',
		padding: 12,
		marginRight: 12
	}
})

export default Home