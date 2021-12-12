import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { textAlign } from "@mui/system";

const Alert = ({ alerts }) =>
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
        <div
            style={{
                marginTop: "20px",
                padding: "5px",
                borderRadius: "10px",
                backgroundColor: "#f76161",
                width: "385px",
                height: "40px",
                textAlign: "center",
                position: "fixed",
                left: "50%",
                transform: "translate(-50%, 0)",
            }}
            key={alert.id}
            className={`alert alert--${alert.alertType}`}
        >
            {alert.msg}
        </div>
    ));

Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
    alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
