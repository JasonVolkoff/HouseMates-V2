import React from "react";
import { useSelector } from "react-redux";
import ProfileNotifications from "../components/ProfileNotifications";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
}));

const HomePage = () => {
    const { first_name } = useSelector((state) => state.auth);
    return (
        <Box sx={{ flexGrow: 1, marginTop: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <Item>Sidebar Placeholder</Item>
                </Grid>
                <Grid item xs={6}>
                    <Item>
                        <ProfileNotifications />
                    </Item>
                </Grid>
                <Grid item xs={3}>
                    <Item>IDK</Item>
                </Grid>
            </Grid>
        </Box>
    );
};
export default HomePage;
