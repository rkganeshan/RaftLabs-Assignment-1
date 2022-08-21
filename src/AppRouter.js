import React from "react";
import {Route,Switch,BrowserRouter} from "react-router-dom";
import Main from "./Main";
import NotFound from "./NotFound";
import UserPlayground from "./UserPlayground";


const AppRouter=()=>{
    return(
        <>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Main}/>
                    <Route exact path="/friend" component={UserPlayground}/>
                    <Route exact component={NotFound}/>
                </Switch>
            </BrowserRouter>
        </>
    )
}

export default AppRouter;