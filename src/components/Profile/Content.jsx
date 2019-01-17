import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, NavLink, Route } from 'react-router-dom';

import * as routes from '../../utils/routes';
import StatusUpdate from './StatusUpdate';
import Activity from './Activity';
import Details from './Details';
import '../styles/Feed.css';
import '../../views/styles/Profile.css';
import '../styles/NetworkArray.css';

const Content = ({
  publicProfileActivity,
  publicProfile,
  publicVerifiedAccounts,
  location,
  isPublicProfilePage,
}) => (
    <div>
      <StatusUpdate />

      <div className="profile__category--mobile">
        <div className="profile__category__sectionWrapper">
          <NavLink exact to={isPublicProfilePage ? `${routes.PUBLIC_BASE}/${location.pathname.split('/')[2]}${routes.PUBLIC_ACTIVITY_ROUTE}` : routes.PROFILE_ACTIVITY} className="profile__category__section">Activity</NavLink>
          <NavLink exact to={isPublicProfilePage ? `${routes.PUBLIC_BASE}/${location.pathname.split('/')[2]}${routes.PUBLIC_DETAILS_ROUTE}` : routes.PROFILE_ABOUT} className="profile__category__section ">Details</NavLink>
        </div>
      </div>

      <Route
        exact
        path={routes.PROFILE_ACTIVITY}
        component={() => <Activity />}
      />
      <Route
        exact
        path={routes.PROFILE_ABOUT}
        component={() => <Details />}
      />

      <Route
        exact
        path={routes.PUBLIC_ACTIVITY}
        component={() => <Activity publicProfileActivity={publicProfileActivity} publicVerifiedAccounts={publicVerifiedAccounts} isPublicProfilePage={isPublicProfilePage} />}
      />
      <Route
        exact
        path={routes.PUBLIC_DETAILS}
        component={() => <Details publicProfile={publicProfile} publicVerifiedAccounts={publicVerifiedAccounts} isPublicProfilePage={isPublicProfilePage} />}
      />
    </div>
  );

Content.propTypes = {
  publicProfile: PropTypes.object,
  publicVerifiedAccounts: PropTypes.object,
  publicProfileActivity: PropTypes.array,
  location: PropTypes.object,
  isPublicProfilePage: PropTypes.bool.isRequired,
};

Content.defaultProps = {
  publicProfile: {},
  publicVerifiedAccounts: {},
  publicProfileActivity: [],
};

const mapState = state => ({
  feedByAddress: state.threeBox.feedByAddress,
  ifFetchingActivity: state.threeBox.ifFetchingActivity,
  verifiedGithub: state.threeBox.verifiedGithub,
  publicVerifiedAccounts: state.threeBox.publicVerifiedAccounts,
});

export default withRouter(connect(mapState)(Content));


// pathmatching doesnt work with this method

// {
//   location.pathname === routes.PROFILE_ACTIVITY
//   && <Activity publicProfileActivity={publicProfileActivity} />
// }

// {
//   location.pathname === routes.PROFILE_ABOUT
//   && <Details />
// }

// {
//   location.pathname === routes.PUBLIC_ACTIVITY
//   && <Activity publicProfileActivity={publicProfileActivity} />
// }

// {
//   location.pathname === routes.PUBLIC_ABOUT
//   && <Details publicProfile={publicProfile} />
// }