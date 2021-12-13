import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import AlertComponent from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const Alert = ({ alerts }) =>
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
        <AlertComponent
            sx={{
                marginTop: "20px",
                padding: "5px",
                borderRadius: "10px",
                width: "385px",
                height: "46px",
                textAlign: "center",
                position: "fixed",
                left: "50%",
                transform: "translate(-50%, 0)",
            }}
            key={alert.id}
            severity={alert.alertType}
        >
            {alert.msg}
        </AlertComponent>
    ));

Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
    alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
