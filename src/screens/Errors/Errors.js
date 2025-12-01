import { ToastContainer, ToastStore } from 'react-toasts';
import React, { Component } from 'react';
import { clearErrors } from '../../actions/ErrorActions';
import { connect } from 'react-redux';

class Error extends Component {

  componentDidMount() {

    ToastStore.success(this.props.error);

    testPause(30000, this.props)

    function testPause(pause, pro) {
      setTimeout(() => {
        var clear = {

        }
        pro.clearErrors(clear)
      }, pause);
    }

  }


  render() {
    return (
      <div>
        {/* <button onClick={() => ToastStore.error("There is an error :'(")}>Click me !</button> */}
        <ToastContainer
          position={ToastContainer.POSITION.TOP_RIGHT}
          store={ToastStore}

        // lightBackground
        />

      </div>
    );
  }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps, { clearErrors })(Error);