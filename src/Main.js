import React from "react";
import Typewriter from 'typewriter-effect';
import { useHistory } from "react-router-dom";

const Main=()=>{
    const history=useHistory();
    const goToUserPlayground=()=>{
        history.push("/friend");
    }
    return(
        <>
            <div className="jumbotron m-3 mt-5">
                
                <h1 className="display-4">
                    {<Typewriter
                    options={{
                        autoStart: true,
                        loop: true,
                      }}
                    onInit={(typewriter) => {
                        typewriter.typeString('Hello,mates!')
                            .callFunction(() => {
                                // console.log('String typed out!');
                            })
                            .pauseFor(1000)
                            // .deleteAll()
                            // .callFunction(() => {
                            //     // console.log('All strings were deleted');
                            // })
                            .start()
                            .deleteAll()
                            }
                        }
                />}
                </h1>
                <p className="lead">Add yourself here and find out the degree of separation between you and Mr.X!😎</p>
                <hr className="my-4"/>
                <p>It is said that all people on average are six, or fewer, social connections away from each other.</p>
                <p className="lead">
                    <button className="btn btn-success text-white" onClick={goToUserPlayground}>Let's Find Out!</button>
                </p>
            </div>
        </>
        
    )
}

export default Main;