import React from 'react';
import { PermissionsAndroid } from 'react-native';

class Utils extends React.Component {
    async requestPermission(permissionName) {
        let permissionType;
        switch (permissionName) {           
            case 'LOCATION':
                permissionType = PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION;
                break;           
            default:
                permissionType = PermissionsAndroid.PERMISSIONS.ACCESS_NETWORK_STATE;
                break;
        }
        try {
            let granted = await PermissionsAndroid.check(permissionType);
            if (!granted) {
                granted = await PermissionsAndroid.request(permissionType);
                if (granted === PermissionsAndroid.RESULTS.GRANTED || granted === true) {
                    return granted;
                }
                return granted;
            }
            return granted;
        } catch (err) {
            return false;
        }
    }    
}

export default Utils;
