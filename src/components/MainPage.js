import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, Dimensions, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Button } from './common';
import OfflineNotice from './OfflineNotice';
import { caseSelected } from '../actions';

class MainPage extends Component {
    

// triggered on button press
// opens screen and then calls for action
    KeyClicked(item) {
        Actions.detail({ text: item });
        this.props.caseSelected(item);
    }

    render() {
        // to calculate size for images based on device size
        const { width } = Dimensions.get('window');
        const boxHeight = 130;
        const boxMargin = 40;
        const boxWidth = (width - boxMargin) / 2;
        return (
            <View style={{ backgroundColor: '#fff', height: 1000 }}>
            <OfflineNotice />
                <FlatList
                    style={{ marginTop: 10 }}
                    numColumns={2}
                    data={this.props.keys}
                    renderItem={({ item }) => (
                        <View key={item} style={{ flex: 1, margin: (boxMargin / 4), minWidth: boxWidth, maxWidth: boxWidth, height: boxHeight }}>
                            <Button
                                title='Add Room'
                                onPress={this.KeyClicked.bind(this, item)}
                            > 
                            <Image
                                style={{ width: boxWidth, height: boxHeight, resizeMode: 'stretch', borderRadius: 5 }}
                                source={{ uri: `https://assets.smallcase.com/images/smallcases/187/${item}.png` }}
                            />
                            </Button>
                        </View>
                    )}
                />
            </View>
        );
    } 
}

const mapStateToProps = state => ({
    keys: state.main.dataSourceArray
});

export default connect(mapStateToProps, { caseSelected })(MainPage);

