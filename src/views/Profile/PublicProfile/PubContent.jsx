import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import PublicActivityOrWall from './PublicActivityOrWall';
import PublicCollectiblesGallery from './PublicCollectiblesGallery';
import '../styles/Feed.scss';
import '../styles/Profile.scss';
import '../../../components/styles/NetworkArray.scss';

const PubContent = ({
  showSignInBanner,
  onOtherProfilePage,
  isLoggedIn,
  handleSignInUp,
}) => (
    <div className={` 
  ${onOtherProfilePage ? 'publicStatusUpdate' : ''}
  ${showSignInBanner ? 'publicStatusUpdate--bannerMargin' : ''} 
  ${isLoggedIn ? 'publicStatusUpdate-isLoggedIn' : ''} 
  ${(onOtherProfilePage && showSignInBanner) ? 'publicStatusUpdate--bannerMargin' : ''} 
  pubContent`}
    >
      <PublicCollectiblesGallery />
      <PublicActivityOrWall handleSignInUp={handleSignInUp} />
    </div>
  );

PubContent.propTypes = {
  handleSignInUp: PropTypes.func.isRequired,
  showSignInBanner: PropTypes.bool,
  onOtherProfilePage: PropTypes.bool,
  isLoggedIn: PropTypes.bool,
};

PubContent.defaultProps = {
  showSignInBanner: false,
  onOtherProfilePage: false,
  isLoggedIn: false,
};

function mapState(state) {
  return {
    showSignInBanner: state.uiState.showSignInBanner,
    onOtherProfilePage: state.uiState.onOtherProfilePage,

    isLoggedIn: state.userState.isLoggedIn,
  };
}

export default withRouter(connect(mapState)(PubContent));