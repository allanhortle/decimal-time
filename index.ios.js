'use strict';

var React = require('react-native');
var Reflux = require('reflux');
var {AppRegistry, StyleSheet, Text, View} = React;

var TimeStore = require('./lib/TimeStore')
var TimeActions = require('./lib/TimeActions');

var DecimalTime = React.createClass({
    mixins: [Reflux.listenTo(TimeStore, "onTimeChange")],
    getInitialState: function () {
        return this.getStoreState();
    },
    componentDidMount: function () {
        this.tick = setInterval(TimeActions.tick, 100);
    },
    componentWillUnmount: function () {
        clearInterval(this.tick);
    },
    getStoreState() {
        return {
            decimalTime: TimeStore.getDecimalTime()
        }
    },
    onTimeChange() {
        this.setState(this.getStoreState());
    },
    render: function() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.state.decimalTime}</Text>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#222'
    },
    text: {
        color: '#E2CCAC',
        fontFamily: 'CutiveMono-Regular',
        fontSize: 50
    }
});

AppRegistry.registerComponent('DecimalTime', () => DecimalTime);
