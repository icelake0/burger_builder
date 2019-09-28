import React, {Component} from 'react';

class Success extends Component{
    render(){
        return (
            <div class="alert alert-dismissable alert-success">
                    <li><strong>{this.props.message}</strong></li>
            </div>
        )
    }
};
export default Success;