import React, { Component } from 'react';
import './App.css';
import headerimage from './images/Capture.JPG'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';

export default class AppDragDropDemo extends Component {
    state = {
        tasks: [
            {name:"Task 1",category:"requested",to: "xyz", by: "abc", deadline: "09-Dec-2020", priority: "High",},
            {name:"Task 2", category:"requested",to: "xyz", by: "abc", deadline: "09-Dec-2020", priority: "High",},
            {name:"Task 3", category:"complete",to: "xyz", by: "abc", deadline: "09-Dec-2020", priority: "Low",},
            {name:"Task 4", category:"todo",to: "xyz", by: "abc", deadline: "09-Dec-2020", priority: "High",},
            {name:"Task 5", category:"todo",to: "xyz", by: "abc", deadline: "09-Dec-2020", priority: "Low",},
            {name:"Task 6", category:"complete",to: "xyz", by: "abc", deadline: "09-Dec-2020", priority: "Low",},
            {name:"Task 7", category:"progress",to: "xyz", by: "abc", deadline: "09-Dec-2020", priority: "High",},
          ],
          view: 0,
}

    onDragStart = (ev, id) => {
        console.log('dragstart:',id);
        ev.dataTransfer.setData("id", id);
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (ev, cat) => {
       let id = ev.dataTransfer.getData("id");
       
       let tasks = this.state.tasks.filter((task) => {
           if (task.name === id) {
               task.category = cat;
           }
           return task;
       });

       this.setState({
           ...this.state,
           tasks
       });
    }

    render() {
        var tasks = {
            requested: [],
            complete: [],
            todo: [],
            progress: [], 
        }

        this.state.tasks.forEach ((t) => {
            tasks[t.category].push(
                <div key={t.name} 
                    onDragStart = {(e) => this.onDragStart(e, t.name)}
                    draggable
                    className="draggable"
                    
                >
                    {t.name}
                </div>
            );
        });

        return (
            <div className="container-drag">
                <div className="header" 
                style={{
                  width: "100%",
                  height: "80px",
                }}>
                  <img src={headerimage} alt="headerimage" />
                </div>
               <div className="Button_For_View" 
               style={{width: "100%", height: "40px", marginBottom: "15px", }}>
               <Button variant="contained" 
               style={{float: "right", marginRight: "20px", backgroundColor:"#56A286"}}
               onClick={() => {
                this.setState({ view: ((this.state.view+1)%2) })
            }}>
                 Change View</Button>

               </div>
                { 
                this.state.view === 0 ? <div className="table_view">
                     <Grid conatiner style={{ display: "flex" }}>
             
              <Grid item xs={1} sm={1} md={1}>
                <div className="id">
                  ID 
                </div>
              </Grid>
              <Grid item xs={1} sm={1} md={2}>
                <div className="status" >
                  Name
                </div>
              </Grid>
              <Grid item xs={1} sm={1} md={2}>
                <div className="ban" style={{ marginLeft: "15px" }}>
                  Status 
                </div>
              </Grid>
              <Grid item xs={1} sm={1} md={2}>
                <div className="cron">
                 Assigned to 
                </div>
              </Grid>
              <Grid item xs={1} sm={1} md={2}>
                <div className="combo" style={{ marginLeft: "15px" }}>
                  Assigned By
                </div>
              </Grid>
              <Grid item xs={1} sm={1} md={2}>
                <div className="crby" style={{ marginLeft: "15px" }}>
                 Deadline
                </div>
              </Grid>
              <Grid item xs={1} sm={1} md={2}>
                <div className="tick" style={{ marginLeft: "15px" }}>
                  Priority
                </div>
              </Grid>   
            </Grid>
                       {
                         this.state.tasks.map((listEle,index)=>{
                           return(
                            <div style={{ height: "70px", backgroundColor: "#F5F5F9", marginTop: "2.5px",marginBottom: "15px" }} >
                          <Grid conatiner 
                          style={{ display: "flex" }}>
             
                          <Grid item xs={1} sm={1} md={1}>
                            <div className="id"
                             style={{paddingTop:"20px"}}>
                             { index+1 }
                            </div>
                          </Grid>
                          <Grid item xs={1} sm={1} md={2}>
                            <div className="names" 
                            style={{paddingTop:"20px"}}>
                              {listEle.name}
                            </div>
                          </Grid>
                          <Grid item xs={1} sm={1} md={2}>
                            <div className="categories" 
                            style={{paddingTop:"20px"}}>
                            {listEle.category}
                            </div>
                          </Grid>
                          <Grid item xs={1} sm={1} md={2}>
                            <div className="Assigned_To" 
                            style={{paddingTop:"20px"}}>
                             {listEle.to}
                            </div>
                          </Grid>
                          <Grid item xs={1} sm={1} md={2}>
                            <div className="Assigned_By" 
                            style={{paddingTop:"20px"}}>
                             {listEle.by}
                            </div>
                          </Grid>
                          <Grid item xs={1} sm={1} md={2}>
                            <div className="Deadline" style={{paddingTop:"20px"}}>
                             {listEle.deadline}
                            </div>
                          </Grid>
                          <Grid item xs={1} sm={1} md={2}>
                            <div className="Priority" 
                            style={{paddingTop:"20px"}}>
                             {listEle.priority}
                            </div>
                          </Grid>   
                        </Grid>
                           </div>        
                         )})
                       }
             </div>
                : <div className="Kanboard_View">
                <div className="none"
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>{this.onDrop(e, "requested")}}>
                    <span className="task-header">Requested</span>
                    {tasks.requested}
                </div>
                <div className="todo" 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e, "todo")}>
                     <span className="task-header">To-Do</span>
                     {tasks.todo}
                </div>
                <div className="progress" 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e, "progess")}>
                     <span className="task-header">In Progress</span>
                     {tasks.progress}
                </div>
                <div className="droppable" 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e, "complete")}>
                     <span className="task-header">Completed</span>
                     {tasks.complete}
                </div>
                </div>
    }
            </div>
        );
    }
}