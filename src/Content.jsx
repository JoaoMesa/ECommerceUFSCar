import react from "react";
import {Switch, Route} from 'react-router-dom'
import {Store} from "./pages/store";
import { Cart } from "./pages/cart";

export const Content = () => {
    return(
        <Switch>
            <Route exact path = '/' component = {Store}/>
            <Route exact path = '/cart' component = {Cart}/>

        </Switch>

    )

}