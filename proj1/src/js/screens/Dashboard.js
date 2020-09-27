import React from 'react';
import { StrorageGetItem } from '../../utils/configs';
import { Strings } from '../../utils/strings';

export default class Dashboard extends React.Component {
    render(){
        let profile = StrorageGetItem(Strings.storage.profile, true);
        console.log("profile in dashboard : ", profile)
        return(
            <div>
                here is the dashboard.
            </div>
        )
    }
}