import { Stack, Typography } from "@mui/material";
import { imageBaseUrl } from "../base-url/based-url"
export function NoRowBackground() {

    return(
        <>
        <img src ={imageBaseUrl+"/No-Row-Background-Light.png"} className = "h-3/4" />
        <Typography variant ="h5">No results found</Typography>
        </>
    )
}