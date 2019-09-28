import React, {Component} from 'react';

class Error extends Component{
    render(){
        return (
            <div class="alert alert-dismissable alert-danger">
                    <li><strong>{this.props.message}</strong></li>
            </div>
        )
    }
};
export default Error;