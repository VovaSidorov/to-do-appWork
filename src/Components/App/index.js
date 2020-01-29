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
            done: false,  
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
    toggleProperty(arr,id,propName){
        const idx = arr.findIndex((el)=>el.id===id);
        const oldItem = arr[idx];
        const newItem = {...oldItem,
            [propName]:!oldItem[propName]};
        return [
            ...arr.slice(0,idx),
            newItem,
            ...arr.slice(idx+1)
        ];
    }

    onTooggleImportant=(id)=> {
        this.setState(({toDoData})=>{
            return {
                toDoData:this.toggleProperty(toDoData,id,'important')
            }
        });
    };

    onTooggleDone=(id)=> {
        this.setState(({toDoData})=>{
            return {
                toDoData:this.toggleProperty(toDoData,id,'done')
            }
        });
    };

    render(){
       
       const doneItems = this.state.toDoData.filter((el)=>el.done).length;
       const toDoItems = this.state.toDoData.length-doneItems;
    return (
        <div className="todo-app ">
            <AppHeader todo={toDoItems} done={doneItems}/>
            <SearchPanel />
            <ItemStatusFilter/>
            <ToDoList 
            todos = {this.state.toDoData} 
            onDeleted={this.deleteItem}
            onTooggleImportant={this.onTooggleImportant}
            onTooggleDone={this.onTooggleDone}
            />
            <ItemAddForm  addItem={this.addItem}/>
        </div>
    );
    }
};

