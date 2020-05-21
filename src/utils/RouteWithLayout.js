import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import TodoApi from '../api/TodoApi'
import {userContext} from '../utils/userContext'
class RouteWithLayout extends React.Component{
    state={
        loading:true,
        redirect:false,
        user:{}
    }
    componentDidMount(){
        TodoApi.post('user/checkToken',{},{withCredentials:true})
        .then( res => {
            if(res.status ===200){
                this.setState({loading:false,user:res.data})
            }
        }).catch( err => {
            this.setState({loading:false,redirect:true})
        })
    }
    render(){
        const {layout:Layout, component:Component,...rest} = this.props;
        const {loading , redirect } = this.state;
        if(loading){
            return null
        }
        if(redirect){
            return <Redirect to="/signin"/>
        }
        return(
            <Route {...rest} render ={ matchProps =>(
                <userContext.Provider value={this.state.user}>
                    <Layout><Component {...matchProps}></Component></Layout>
                </userContext.Provider>
            )}/>
        );
    }
}

export default RouteWithLayout