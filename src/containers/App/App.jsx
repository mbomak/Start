// import modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

// inmport components
import Header from 'components/Header';
import DiceBoard from 'components/DiceBoard';

//import selectors and actions
import {
  selectors as dataSelectors,
  actions as dataActions,
} from 'modules/data';

// import styles
import './App.css';


class App extends Component {
    constructor(props) {
      super(props);
    }


    render() {
        // take data from props container(reducer -> selectors,actions -> props)
        // const {
        //     balance,
        // } = this.props;

        return (
            <div className="app">
                <Header
                    title="Welcome to our game!"
                />
                <main className="app__content">
                    <div className="app__main">
                        <DiceBoard
                            className="mm"
                        />
                    </div>                  
                </main>
            </div>
        );
    }
}

App.propTypes = {
    // balance: PropTypes.number,
    // betAmount: PropTypes.number,
    // number: PropTypes.number,
    // hash: PropTypes.string,
    // result: PropTypes.number,
    // addFreeCredits: PropTypes.func,
    // changeBetAmount: PropTypes.func,
    // changeNumber: PropTypes.func,
    // changeResult: PropTypes.func,
    // changeOldResult: PropTypes.func,
    // changeStatusWin: PropTypes.func,
    // changeBalance: PropTypes.func,
    // onWriteStore: PropTypes.func,
    // addNewHash: PropTypes.func,
};
const mapStateToProps = createStructuredSelector({
    // balance: dataSelectors.takeBalance,
    // result: dataSelectors.takeResult,
    // betAmount: dataSelectors.takeBetAmount,
    // number: dataSelectors.takeNumber,
    // winStatus: dataSelectors.takeWinStatus,
    // hash: dataSelectors.takeHash,
    // oldResult: dataSelectors.takeOldResult
});

const mapDispatchToProps = {
    // addFreeCredits: dataActions.addFreeCredits,
    // changeBetAmount: dataActions.changeBetAmount,
    // changeNumber: dataActions.changeNumber,
    // changeResult: dataActions.changeResult,
    // changeOldResult: dataActions.changeOldResult,
    // changeStatusWin: dataActions.changeStatusWin,
    // changeBalance: dataActions.changeBalance,
    // addNewHash: dataActions.addNewHash,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
