import React from 'react';
import style from './App.module.css';
import {Redirect, Route, Switch, withRouter} from "react-router-dom";
import News from "./components/News/News";
import Music from "./components/Music/Music";
import Settings from "./components/Settings/Settings";
import Nav from "./components/Nav/Nav";
import {UserPage} from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import Header from "./components/Header/Header";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {compose} from "redux";
import {initializedApp} from "./Redux/app-reducer";
import {Prealoder} from "./components/common/Preloader";
import {appStateType} from "./Redux/redux-store";
import {withSuspense} from "./utils/withSuspense";
import "@fontsource/roboto";
import Footer from "./components/Footer/Footer";
import Dialogs from "./components/Dialogs/Dialogs";

const ChatPage = React.lazy(() => import('./pages/ChatPage/ChatPage'))

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializedApp: () => void
}
const SuspendedChatPage = withSuspense(ChatPage)

class App extends React.Component<MapPropsType & DispatchPropsType> {

    componentDidMount() {
        this.props.initializedApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Prealoder/>
        }
        return (

            <div className={style.app_wrapper}>
                <Header/>

                <Nav />
                <div className={style.app_wrapper_content}>
                    <Switch>
                        <Route path="/dialogs/:userId?" render={() => <Dialogs />}/>
                        <Route path="/profile/:userId?" render={() => <ProfileContainer/>}/>
                        <Route path="/news" component={News}/>
                        <Route path="/music" component={Music}/>
                        <Route path="/settings" component={Settings}/>
                        <Route path="/users" render={() => <UserPage />}/>
                        <Route path="/login" render={() => <Login/>}/>
                        <Route path="/chat" render={() => <SuspendedChatPage />}/>
                        <Redirect from="/" to="/profile"/>
                        <Route path="*" render={() => <div>404 NOT FOUND</div>}/>


                    </Switch>
                </div>
                <Footer />
            </div>
        )
    }
}


const mapStateToProps = (state: appStateType) => ({
    initialized: state.app.initialized
});
export default compose<React.ComponentType>(
    withRouter,
    connect(mapStateToProps, {initializedApp}))(App);

