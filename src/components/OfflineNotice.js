// Donwloaded from internet to check device internet status
import React, { Component } from 'react';
import { Text, NetInfo, View } from 'react-native';

export default class InternetConnectionPopUp extends Component {
  constructor(props) {
      super(props);
      this.state = { connectionInfo: '' };
      this.handleFirstConnectivityChange = this.handleFirstConnectivityChange.bind(this);
  }
 
    componentDidMount() {
        NetInfo.getConnectionInfo().then((connectionInfo) => {
            this.setState({ connectionInfo: connectionInfo.type });
        });
        NetInfo.addEventListener('connectionChange', this.handleFirstConnectivityChange);
    }

    componentWillUnmount() {
        NetInfo.removeEventListener('connectionChange', this.handleFirstConnectivityChange);
    }

    handleFirstConnectivityChange(connectionInfo) {
        this.setState({ connectionInfo: connectionInfo.type });
    } 


    render() {
        const connectionInfo = this.state.connectionInfo;
        if (connectionInfo === 'none') {
            return (
                <View style={styles.off}>
                    <Text style={{ color: '#fff' }}>No Internet Connection</Text>
                </View>
            );
        }
        return (null);  
    }
}

const styles = {
      off: {
        backgroundColor: '#b52424',
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        position: 'relative'
      }
}
