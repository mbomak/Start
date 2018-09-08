// import modules
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

// import components
import Header from 'components/Header';
import DiceBoard from 'components/DiceBoard';

// import selectors and actions
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

    clickDice = () => {
        this.props.fetchData(1);
    };

    render() {
        const {
            postNumber,
        } = this.props;

        return (
            <div className="app">
                <Header
                    title="Welcome to our game!"
                />
                <main className="app__content">
                    <div className="app__main" onClick={this.clickDice}>
                        <DiceBoard
                            className="mm"
                        />
                    </div>
                    <div>{postNumber}</div>
                </main>
            </div>
        );
    }
}

App.propTypes = {
    postNumber: PropTypes.number,
    fetchData: PropTypes.func,
};
const mapStateToProps = createStructuredSelector({
    postNumber: dataSelectors.takePostNumber,
});

const mapDispatchToProps = {
    fetchData: dataActions.fetchData,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
