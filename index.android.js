/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    ListView
} from 'react-native';


//模拟数据
var MOCKED_MOVIES_DATA = [
    {title: '标题', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
];

//请求数据地址
const REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

export default class SampleAppMovies extends Component {

    constructor(props) {
        super(props);
        this.state = {
            movies: null
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        if (!this.state.movies) {
            return this.renderLoadingView();
        }

        var movie = this.state.movies[0];

        return this.renderMovie(movie);
    }

    renderMovie(movie) {
        return (
            <View style={styles.container}>
                <Image
                    source={{uri: movie.posters.thumbnail}}
                    style={styles.thumbnail}
                />
                <View style={styles.rightContainer}>
                    <Text style={styles.title}>{movie.title}</Text>
                    <Text style={styles.year}>{movie.year}</Text>
                </View>
            </View>
        );
    }

    renderLoadingView() {
        return (
            <View style={styles.container}>
                <Text>
                    正在加载电影数据。。。。
                </Text>
            </View>
        );
    }

    fetchData = () =>
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    movies: responseData.movies
                });
            });

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        flexDirection: 'row'
    },
    thumbnail: {
        width: 53,
        height: 81
    },
    rightContainer: {
        flex: 1
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center'
    },
    year: {
        textAlign: 'center'
    }
});

AppRegistry.registerComponent('SampleAppMovies', () => SampleAppMovies);
