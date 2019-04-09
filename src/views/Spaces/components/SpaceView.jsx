import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import VaultRow from './VaultRow';
import PublicRow from './PublicRow';
import FavoriteCollectiblesRow from './FavoriteCollectiblesRow';
import VaultRowMobile from './VaultRowMobile';
import PublicRowMobile from './PublicRowMobile';
import FavoriteCollectiblesRowMobile from './FavoriteCollectiblesRowMobile';
import Mollie from '../../../assets/Mollie.png';
import '../styles/Spaces.css';

const SpaceView = ({
  openSpace,
  spaceDataToRender,
  spacesOpened,
  vaultToOpen,
  isLoadingVault,
  width,
  fadeIn,
  fadeOut,
  did,
  spaceNameOpened,
  itemToDelete,
  spaceNameToDelete,
}) => (
    <React.Fragment>
      {spaceDataToRender.length > 0 ? spaceDataToRender.map((row) => {
        if (row.name !== 'collectiblesFavoritesToRender'
          && row.name !== 'private_space_data' && width >= 600) {
          return (
            <PublicRow
              dataKey={row.name}
              dataValue={row.content}
              spaceName={row.space}
              privacy={row.privacy}
              rowType={row.type}
              fadeIn={fadeIn}
              did={did}
              spaceNameOpened={spaceNameOpened}
              itemToDelete={itemToDelete}
              spaceNameToDelete={spaceNameToDelete}
            />);
        }

        if (row.name !== 'collectiblesFavoritesToRender'
          && row.name !== 'private_space_data' && width <= 600) {
          return (
            <PublicRowMobile
              dataKey={row.name}
              dataValue={row.content}
              spaceName={row.space}
              privacy={row.privacy}
              rowType={row.type}
              fadeIn={fadeIn}
              did={did}
              spaceNameOpened={spaceNameOpened}
              itemToDelete={itemToDelete}
              spaceNameToDelete={spaceNameToDelete}
            />);
        }

        if (row.name === 'private_space_data' && width >= 600) {
          return (
            <VaultRow
              openSpace={openSpace}
              spaceName={row.space}
              isLoadingVault={isLoadingVault}
              vaultToOpen={vaultToOpen}
              fadeOut={fadeOut}
            />);
        }

        if (row.name === 'private_space_data' && width <= 600) {
          return (
            <VaultRowMobile
              openSpace={openSpace}
              spaceName={row.space}
              isLoadingVault={isLoadingVault}
              vaultToOpen={vaultToOpen}
              fadeOut={fadeOut}
            />);
        }

        if (row.name === 'collectiblesFavoritesToRender' && width >= 600) {
          return (
            <FavoriteCollectiblesRow
              dataKey={row.name}
              dataValue={row.content}
              spaceName={row.space}
              privacy={row.privacy}
              rowType={row.type}
              spaceNameOpened={spaceNameOpened}
              itemToDelete={itemToDelete}
              spaceNameToDelete={spaceNameToDelete}
            />);
        }

        if (row.name === 'collectiblesFavoritesToRender' && width <= 600) {
          return (
            <FavoriteCollectiblesRowMobile
              dataKey={row.name}
              dataValue={row.content}
              spaceName={row.space}
              privacy={row.privacy}
              rowType={row.type}
              itemToDelete={itemToDelete}
              spaceNameToDelete={spaceNameToDelete}
            />);
        }
      }) : (
          <div className="emptySpace">
            <img src={Mollie} alt="Mollie" className="emptySpace_mollie" />
            <p>There's no data in this space</p>
          </div>
        )}
    </React.Fragment>
  );

SpaceView.propTypes = {
  spaceDataToRender: PropTypes.array.isRequired,
  openSpace: PropTypes.func.isRequired,
  spacesOpened: PropTypes.bool.isRequired,
  isLoadingVault: PropTypes.bool.isRequired,
  vaultToOpen: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  fadeIn: PropTypes.bool.isRequired,
  fadeOut: PropTypes.bool.isRequired,
  did: PropTypes.string.isRequired,
  spaceNameOpened: PropTypes.string.isRequired,
  itemToDelete: PropTypes.string.isRequired,
  spaceNameToDelete: PropTypes.string.isRequired,
};

SpaceView.defaultProps = {
  spaceDataToRender: [],
};

function mapState(state) {
  return {
    spaceDataToRender: state.spaces.spaceDataToRender,
  };
}

export default connect(mapState)(SpaceView);
