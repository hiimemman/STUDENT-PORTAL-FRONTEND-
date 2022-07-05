import * as React from 'react';
import { DashboardDrawer } from '../component/DashboardDrawer';
import { useNavigate } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';
export function Dashboard(){
  //UseNavigate
    const navigate = useNavigate();

    return(
<DashboardDrawer />
    );
}