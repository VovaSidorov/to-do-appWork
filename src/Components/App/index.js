import React,{Component} from 'react';
import AppHeader from "../AppHeader";
import SearchPanel from "../SearchPanel";
import ToDoList from "../ToDoList";
import './style.css'
import ItemStatusFilter from "../ItemStatusFilter";
import ItemAddForm from "../ItemAddForm";

export default class App extends Component{

    maxId = 1;
    state = {
        toDoData: [
            this.createNewItem("Drink Coffe"),
            this.createNewItem("Make awesome App"),
            this.createNewItem("Have a lunch")
        ]
    };
    createNewItem(item){
       const newItem = {
            label:item, 
            important: false, 
            id:this.maxId++
        }
        return newItem;
    }
    deleteItem=(id)=>{
        this.setState(({toDoData})=>{
            const idx = toDoData.findIndex((el)=>el.id===id);
            const newArray = [
                ...toDoData.slice(0,idx),
                ...toDoData.slice(idx+1)
            ];
            return {
                toDoData:newArray
            }
        });
    };
    addItem=(text)=>{
        this.setState(({toDoData})=>{
            const newItem = this.createNewItem(text);
            const newArray = [
                ...toDoData,
                newItem
            ];
            return {
                toDoData:newArray
            }
        });
    };

    render(){
    return (
        <div className="todo-app ">
            <AppHeader todo={1} done={2}/>
            <SearchPanel />
            <ItemStatusFilter/>
            <ToDoList 
            todos = {this.state.toDoData} 
            onDeleted={this.deleteItem}
            />
            <ItemAddForm  addItem={this.addItem}/>
        </div>
    );
    }
};

