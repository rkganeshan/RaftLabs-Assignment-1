import React,{useEffect, useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Bar from "./Bar";

class Graph {
	// defining vertex array and
	// adjacent list
	constructor(noOfVertices)
	{
		this.noOfVertices = noOfVertices;
		this.AdjList = new Map();
	}

	// functions to be implemented

	// add vertex to the graph
    addVertex(v)
    {
        // initialize the adjacent list with a
        // null array
        this.AdjList.set(v, []);
    }

	addEdge(v, w)
    {
        // get the list for vertex v and put the
        // vertex w denoting edge between v and w
        console.log("v:",v);
        console.log("w:",w);
        let t=this.AdjList.get(v);
        console.log("t:",t);
        let boolVal=false;
        if(t)
        {
            boolVal=t.find((item)=>item==w)
        }
        console.log("boolVal:",boolVal);
        if(!boolVal)
        {
            console.log("hii this.AdjList.get(v):",this.AdjList.get(v));
            this.AdjList.get(v).push(w);
    
            // Since graph is undirected,
            // add an edge from w to v also
            this.AdjList.get(w).push(v);
        }
    }
	// Prints the vertex and adjacency list
    printGraph()
    {
        // get all the vertices
        var get_keys = this.AdjList.keys();
    
        // iterate over the vertices
        for (var i of get_keys)
        {
            // great the corresponding adjacency list
            // for the vertex
            var get_values = this.AdjList.get(i);
            var conc = "";
    
            // iterate over the adjacency list
            // concatenate the values into a string
            for (var j of get_values)
                conc += j + " ";
    
            // print the vertex and its adjacency list
            console.log(i + " -> " + conc);
        }
    }
    allPaths(u,d,isVisited,localPathList)
    {
        this.printAllPathsUtil(u,d,isVisited,localPathList)
    }
    printAllPathsUtil(u,d,isVisited,localPathList)
    {
        if (u == (d)) {
            console.log(localPathList+"\n");
            // console.log("check:",localPathList)
            // console.log("hi")
            outputObj.outputList.push(localPathList+"");
            // if match found then no need to
            // traverse more till depth
            return;
        }
  
        // Mark the current node
        isVisited[u] = true;
  
        // Recur for all the vertices
        // adjacent to current vertex
        for (let i=0;i< this.AdjList.get(u).length;i++) {
            if (!isVisited[this.AdjList.get(u)[i]]) {
                // store current node
                // in path[]
                localPathList.push(this.AdjList.get(u)[i]);
                this.printAllPathsUtil(this.AdjList.get(u)[i], d,
                isVisited,localPathList);
  
                // remove current node
                // in path[]
                localPathList.splice(localPathList.indexOf
                (this.AdjList.get(u)[i]),1);
            }
        }
  
        // Mark the current node
        isVisited[u] = false;
    }
}
var g = new Graph(100);
let outputObj={
    outputList:[]
};
const UserPlayground=()=>{
    // const [personName,setPersonName]=useState("");
    
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [peopleList,setPeopleList]=useState(["Virat Kohli","M S Dhoni","Yuvraj Singh","Ravi Jadeja","Sourav Ganguly","Sachin Tendulkar","Virender Sehwag","Gautam Gambhir","Suresh Raina","Ashish Nehra"]);
    const [selectedFirstPerson,setSelectedFirstPerson]=useState("");
    const [selectedSecondPerson,setSelectedSecondPerson]=useState("");
    const [selectedPeople,setSelectedPeople]=useState([]);
    const [output,setOutput]=useState([]);
    const showFirstLastNameMissing = () => {
        toast.error('First Name and Last Name Missing!', {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    const showLastNameMissing = () => {
        toast.error('Last Name Missing', {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    const showFirstNameMissing = () => {
        toast.error('First Name Missing', {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    const duplicateFullName=()=>{
        toast.warning('This Full Name already exists.', {
            position: toast.POSITION.TOP_RIGHT
        });
    }
    const successFullName=()=>{
        toast.success('New Person has been added!',{
            position:toast.POSITION.TOP_RIGHT
        });
    };
    const addPerson=()=>{
        // e.preventDefault();
        // e.target.reset();
        if(firstName=="" && lastName=="")
        {
            showFirstLastNameMissing();
        }
        else if(firstName && lastName=="")
        {
            showLastNameMissing();
        }
        else if(firstName=="" && lastName)
        {
            showFirstNameMissing();
        }
        else
        {
            let fullName=firstName.trim()+" "+lastName.trim();
            let search=peopleList.find((item)=>item==fullName);
            if(search)
            {
                // alert("A person with same Full Name already exists.Add another person.")
                duplicateFullName();
                setFirstName("");
                setLastName("");
            }
            else
            {
                setPeopleList((prev) => [...prev, fullName]);
                setFirstName("");
                setLastName("");
                successFullName();
            }
        }
    }
    const showSecondPersonMissing = () => {
        toast.error('Missing Second Person Name', {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    const showFirstPersonMissing = () => {
        toast.error('Missing First Person Name', {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    const showSuccess = () => {
        toast.success(`${selectedFirstPerson} is now Friends with ${selectedSecondPerson}`, {
            position: toast.POSITION.TOP_RIGHT
        });
    };
    const scrollDownOnSuccess=()=>{
        toast.success(`Scroll Down to see the list of degree of separation.`, {
            position: toast.POSITION.TOP_RIGHT
        });
        
    }
    const friendshipNotExists=()=>{
        toast.error(`${selectedPeople[0]} and ${selectedPeople[1]} are not connected directly or mutually.`, {
            position: toast.POSITION.TOP_RIGHT
        });
    }
    const friendshipOnlyOneSelected=()=>{
        toast.error(`${selectedPeople[0]} alone is selected. You must select two people to find out the degree.`, {
            position: toast.POSITION.TOP_RIGHT
        });
    }
    const friendshipNoneSelected=()=>{
        toast.error(`None selected. You must select two people to find out the degree.`, {
            position: toast.POSITION.TOP_RIGHT
        });
    }
    const makeFriends=()=>{
        console.log(`${selectedFirstPerson} is friend with ${selectedSecondPerson}`);
        if(selectedFirstPerson && selectedSecondPerson=="")
        {
            
            showSecondPersonMissing();
            // return <ToastContainer />;
        }
        else if(selectedSecondPerson && selectedFirstPerson=="")
        {
            
            showFirstPersonMissing();
            // return <ToastContainer />;
        }
        else
        {
            g.addEdge(selectedFirstPerson,selectedSecondPerson);
            console.log(g);
            
            showSuccess();
            setSelectedFirstPerson("");
            setSelectedSecondPerson("");
            // return <ToastContainer />;
            // <Toast className="p-3 bg-success my-2">
            //     <ToastBody>
            //         {}
            //     </ToastBody>
            // </Toast>
            
        }
        
    }
    const tOut=()=>{
        toast.warning(`Uncheck the current people to check degree of another pair.`, {
            position: toast.POSITION.TOP_RIGHT
        })     
    }
    const findDegree=(e)=>{
        // let outputObj={
        //     outputList:[]
        // };
        e.preventDefault();
        g.allPaths(selectedPeople[0],selectedPeople[1],{},[]);
        if(selectedPeople.length==1)
        {
            friendshipOnlyOneSelected()
        }
        else if(selectedPeople.length==0)
        {
            friendshipNoneSelected();
        }
        else
        {
            console.log(outputObj.outputList);
            if(outputObj.outputList.length==0)
            {
                friendshipNotExists();
                // tOut();
                const myTimeout = setTimeout(tOut, 6000);
            }
            for(let j=0;j<outputObj.outputList.length;j++)
            {
                outputObj.outputList[j]=outputObj.outputList[j].split(",").join(">");
                outputObj.outputList[j]=selectedPeople[0]+">"+outputObj.outputList[j];
            }
            if(outputObj.outputList.length!=0)
            {
                scrollDownOnSuccess();
                const myTimeout = setTimeout(tOut, 6000);
            }
            setOutput(outputObj.outputList.join("\n"));
            outputObj.outputList=[];
        }
    }
    useEffect(()=>{
        for (let i = 0; i < peopleList.length; i++) {
            g.addVertex(peopleList[i]);
        }
        console.log(g);
    },[])
    useEffect(()=>{
        for (let i = 0; i < peopleList.length; i++) {
            g.addVertex(peopleList[i]);
        }
        console.log(g);
    },[peopleList.length])
    useEffect(()=>{
        setOutput([]);
    },[selectedPeople])
    return(
        <>
            {/* <h1 className="text-light">User Playground</h1> */}
            <Bar/>
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                    <div className="jumbotron m-3">
                                <h1 className="display-6">
                                    Actions
                                </h1>
                                {/* <p className="lead">Add yourself here and find out the degree of separation between you and Mr.X!😎</p> */}
                                <hr className="my-4"/>
                                {/* <p>It is said that all people on average are six, or fewer, social connections away from each other.</p> */}
                                <div className="d-flex justify-content-start">
                                    {/* <button className="btn btn-success text-white lead" 
                                    data-toggle="modal" data-target="#addPeopleModal"
                                    >Add People</button> */}
                                    <label type="button"className="btn btn-success text-white lead" 
                                    data-toggle="modal" data-target="#addPeopleModal"
                                    >Add People</label>
                                    {/* App People Modal */}
                                    <div className="modal fade" id="addPeopleModal" tabIndex="-1" role="dialog" aria-labelledby="addPeopleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="addPeopleModalLabel">Person Details</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="d-flex flex-column">
                                            <input className="form-control m-1" type="text" placeholder="First Name" value={firstName} onChange={(e)=>{
                                                setFirstName(e.target.value);
                                            }}/>
                                            <input className="form-control m-1" type="text" placeholder="Last Name" value={lastName} onChange={(e)=>{
                                                setLastName(e.target.value);
                                            }}/>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={addPerson}>Add Person</button>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                    {/* <button className="btn btn-success text-white lead ml-1" 
                                    data-toggle="modal" data-target="#addRelationModal"
                                    >Edit Relationship</button> */}
                                    <label type="button" className="btn btn-success text-white lead ml-1" 
                                    data-toggle="modal" data-target="#addRelationModal"
                                    >Edit Relationship</label> 
                                    <div className="modal fade" id="addRelationModal" tabIndex="-1" role="dialog" aria-labelledby="addRelationModalLabel" aria-hidden="true">
                                    <div className="modal-dialog" role="document">
                                        <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title" id="addRelationModalLabel">Modify Relationship</h5>
                                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            <div className="d-lg-flex flex-row justify-content-center">
                                                <div className="dropdown">
                                                    <button className="btn btn-success dropdown-toggle" type="button" id="listOne" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        {selectedFirstPerson==""?"Current Person":selectedFirstPerson}
                                                    </button>
                                                    <div className="dropdown-menu" aria-labelledby="listOne">
                                                        {peopleList.map((item,idx)=>{
                                                            if(item!=selectedSecondPerson)
                                                            {
                                                                return(
                                                                    <a className="dropdown-item" href="#" key={idx}
                                                                    onClick={()=>{setSelectedFirstPerson(item)}}
                                                                    >{item}</a>
                                                                )
                                                            }
                                                        })}
                                                        {/* <a class="dropdown-item" href="#">Action</a>
                                                        <a class="dropdown-item" href="#">Another action</a>
                                                        <a class="dropdown-item" href="#">Something else here</a> */}
                                                    </div>
                                                </div>
                                                {/* emoji start*/}
                                                <div className="mx-lg-2 my-lg-2 ml-5 my-2">👨🔁👨</div>
                                                {/* emoji end */}
                                                <div className="dropdown">
                                                    <button className="btn btn-success dropdown-toggle" type="button" id="listTwo" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        {selectedSecondPerson==""?"Connect to Person":selectedSecondPerson}
                                                    </button>
                                                    <div className="dropdown-menu" aria-labelledby="listTwo">
                                                        {peopleList.map((item,idx)=>{
                                                            if(item!=selectedFirstPerson)
                                                            {
                                                                return(
                                                                    <a className="dropdown-item" href="#" key={idx} 
                                                                    onClick={()=>{setSelectedSecondPerson(item)}}
                                                                    >{item}</a>
                                                                )
                                                            }
                                                        })}
                                                        {/* <a class="dropdown-item" href="#">Action</a>
                                                        <a class="dropdown-item" href="#">Another action</a>
                                                        <a class="dropdown-item" href="#">Something else here</a> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={()=>{
                                                setSelectedFirstPerson("");
                                                setSelectedSecondPerson("");
                                            }}>Close</button>
                                            <button type="button" className="btn btn-primary" 
                                            onClick={makeFriends} 
                                            data-dismiss="modal">Friends✅</button>
                                            
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                    </div>
                    <div className="col-lg-6">
                    <div className="d-flex justify-content-center">
                    <img src={require('./assetTwo.jpg')} className="rounded float-left mt-lg-5" alt="AssetOne Image" height={"262vh"}/>
                    </div>

                        {/* <img src={require('./assetOne.jpg')} className="rounded float-left mt-lg-5" alt="AssetOne Image" height={"262vh"}/> */}
                    </div>
                </div>
            </div>
            {peopleList.length>0 &&
                <div className="container text-white">
                    <div className="row my-3">
                    {
                        peopleList.map((item,idx)=>{
                            return(
                                // <li key={idx}>{item}</li>
                                <div className="col-lg-6" key={idx}>
                                    <div className="form-check m-2">
                                        <label className="form-check-label font-weight-bold">
                                            <input type="checkbox" className="form-check-input"

                                            value={item}
                                            onClick={(e)=>{
                                                if(selectedPeople.find((people)=>people==item))
                                                {
                                                    let temp=selectedPeople.filter((people)=>people!=item);
                                                    setSelectedPeople(temp);
                                                }
                                                else if(selectedPeople.length>1 && !selectedPeople.find((people)=>people==item))
                                                {
                                                    alert("Only 2 people can be selected at a time to find out degree of separation.")
                                                    e.target.checked=false;
                                                }
                                                else{
                                                    setSelectedPeople((prev)=>[...prev,item]);
                                                    console.log("selected people:",selectedPeople);
                                                }
                                            }}
                                            />{item}
                                        </label>
                                    </div>
                                </div>
                            )
                        }) 
                    }
                    </div>
                </div> 
            }
            <div className="container mb-4">
                <div className="row">
                    <div className="col-lg-8">
                    <div className="d-flex flex-row justify-content-center" id="#navbar-example2">
                        <a href="#tarea" id="navbar-example2" className="text-light">
                        <label type="button" className="btn btn-success" 
                        onClick={(e)=>{findDegree(e)}}
                        // data-target="#tarea"
                        >
                            Find Degree of Separation
                            </label></a>
                    </div>
                    </div>
                </div>
            </div>
            {output.length>0 && 
                <div className="container mb-4" >
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="form-group" data-spy="scroll" data-target="#navbar-example2" data-offset="0" id="tarea">
                                    {/* <label for="exampleFormControlTextarea1">Example textarea</label> */}
                                    <textarea readOnly className="form-control font-weight-bold" rows="4"
                                    value={output}
                                    >
                                    </textarea>
                                </div>
                        </div>
                    </div>
                </div>
            }
            <ToastContainer/>
        </>
    )
}

export default UserPlayground;