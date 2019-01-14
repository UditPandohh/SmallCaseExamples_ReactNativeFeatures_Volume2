import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Image, Text } from 'react-native';
import { AreaChart, Grid } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { CardSection } from './common';
import OfflineNotice from './OfflineNotice';
import { loadGraph } from '../actions';


const styles = {
   
    header: {
        flex: 1,
        flexGrow: 7,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'

    },
    img: { 
        marginTop: 10,
        marginLeft: 10,
        width: 150, 
        height: 150, 
        resizeMode: 'stretch',
        borderRadius: 3
    },
    indexDetails: {
        height: 150,
        marginTop: 10,
        width: 200,
        borderRadius: 3,
        flex: 1,
        marginLeft: 10,
        marginRight: 10
    },
    rationale: {
        flex: 1,
        margin: 10,
        borderRadius: 5,
        flexDirection: 'column'
    }
};
class DefaultPage extends Component {
    
    componentWillMount() {
       console.log('case1');
       this.props.loadGraph(this.props.text);
    }
   
    render() {
        return (
            <View style={{ backgroundColor: '#fff', height: 2000 }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <OfflineNotice />

                    <View style={styles.header}>

                        <Image    
                            style={styles.img}
                            source={{ uri: this.props.detail.imageUrl }}
                        />

                        <View style={styles.indexDetails}>
                            <CardSection>
                                <Text>Index: {'\n'} {this.props.detail.index}</Text>
                            </CardSection>
                            <CardSection>
                                <Text>Monthly return: {'\n'} {this.props.detail.monthlyReturns}</Text>
                            </CardSection>
                            <CardSection>
                                <Text>Yearly return: {'\n'} {this.props.detail.yearlyReturns}</Text>
                            </CardSection>
                        </View>

                    </View> 

                    <View style={styles.rationale}>
                        <Text style={{ marginLeft: 5, fontSize: 20 }}>Rationale: </Text>    
                        <CardSection>
                        <Text>{this.props.detail.rationale}</Text>
                        </CardSection>
                    </View>

                    <AreaChart
                        animate={true}
                        style={{ height: 200 }}
                        data={this.props.graphData}
                        contentInset={{ top: 30, bottom: 30 }}
                        curve={shape.curveNatural}
                        svg={{ fill: 'rgba(134, 65, 244, 0.8)' }}
                    >
                        <Grid />
                    </AreaChart>
                    
                </ScrollView>
            </View>
        );
    } 
     
}

const mapStateToProps = state => ({
    detail: state.main.detailData,
    graphData: state.main.graphData
});

export default connect(mapStateToProps, { loadGraph })(DefaultPage);

