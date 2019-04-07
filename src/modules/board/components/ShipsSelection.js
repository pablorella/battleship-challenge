import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Ship from './Ship';
import { initShips, selectShip, rotateShip } from '../actions';

const SyledH2 = styled.h2`
  color: var(--gray);
  font-size: 1.4rem;
  margin-top: 5%;
  text-align: center;

  @media (min-width: 992px) {
    margin-top: 0;
    text-align: left;
    margin-bottom: 3%;
  }
`;

class ShipSelection extends Component {
  componentDidMount() {
    this.props.initShips();
  }

  handleSelectShip = ship => {
    this.props.selectShip(ship);
  };

  handleRotateShip = () => {
    this.props.rotateShip(this.props.selectedShip);
  };

  render() {
    const { playerName, ships, selectedShip } = this.props;

    const filteredShips = ships.filter(ship => {
      return ship.position === null;
    });

    const renderShips = () => {
      return filteredShips.map(ship => {
        return (
          <Ship
            handleSelectShip={this.handleSelectShip}
            key={ship.id}
            type={ship.type}
            id={ship.id}
            direction={ship.direction}
            wasSelected={!!(selectedShip && selectedShip.id === ship.id)}
            position={ship.position}
          />
        );
      });
    };

    return (
      <div className="col-12 col-lg-6">
        <div>
          <SyledH2>
            Hi <strong> {playerName}</strong> , these is your army
          </SyledH2>
        </div>
        <div>{renderShips()}</div>
        <div>
          {filteredShips.length === 0 ? (
            <button
              onClick={this.handleRotateShip}
              type="button"
              className="btn btn-outline-primary mt-5"
            >
              START BATTLE
            </button>
          ) : (
            <button
              onClick={this.handleRotateShip}
              type="button"
              disabled={!selectedShip ? 'disabled' : ''}
              className="btn btn-outline-primary mt-5"
            >
              ROTATE SHIP
            </button>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ships: state.boardReducer.ships,
    selectedShip: state.boardReducer.selectedShip
  };
};

export default connect(
  mapStateToProps,
  { initShips, selectShip, rotateShip }
)(ShipSelection);