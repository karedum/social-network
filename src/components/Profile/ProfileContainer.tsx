import React from 'react';
import {connect} from "react-redux";
import Profile from "./Profile";
import {getProfile, getStatus, setStatus, updatePhoto, updateProfile} from "../../Redux/ProfleReducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";
import {appStateType} from "../../Redux/redux-store";
import {ProfileType} from "../../Types/types";

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getProfile: (userId: number) => void
    getStatus: (userId: number) => void
    setStatus: (text: string) => void
    updatePhoto: (file: File) => void
    updateProfile: (profile: ProfileType) => Promise<any>
}

type PathParamsType = {
    userId: string
}


type PropsType = MapPropsType & DispatchPropsType & RouteComponentProps<PathParamsType>;

class ProfileContainer extends React.Component<PropsType> {

    refreshProfile = () => {
        let userId: number | null = +this.props.match.params.userId;
        if (!userId) {
            userId = this.props.userId;
            if (!userId) {
                this.props.history.push('/login');
            }
        }
        this.props.getProfile(userId as number);
        this.props.getStatus(userId as number);
    }

    componentDidMount() {
        this.refreshProfile();
    }


    componentDidUpdate(prevProps: PropsType, PrevState: appStateType) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
        this.refreshProfile();
        }
    }

    render() {


        return (
            <div>
                <Profile {...this.props} profile={this.props.profile} status={this.props.status}
                         setStatus={this.props.setStatus} isOwner={!this.props.match.params.userId} updatePhoto={this.props.updatePhoto} updateProfile={this.props.updateProfile}/>
            </div>
        );
    }
}


let mapStateToProps = (state: appStateType) => {

    return {
        profile: state.profilePage.profile,
        status: state.profilePage.status,
        userId: state.auth.id
    }
};

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getProfile, setStatus, getStatus, updatePhoto, updateProfile}),
    withRouter,
    // withAuthRedirect
)(ProfileContainer);
