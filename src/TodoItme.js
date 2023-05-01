import React,{ Component } from "react";

class TodoItme extends Component{

    //父组件的render函数被执行时，子组件的render都将被重新执行一次(props，state与render函数的关系)
    constructor(props){
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    render() {
        const {content} = this.props;
        return (
        <li onClick={this.handleClick}>
            {content} 
        </li>
        )
    }

    handleClick(){
        //写法1
        //this.props.delItme(this.props.index);

        //写法2：优化
        const {delItme,index} = this.props;
        delItme(index);
        
    }

}

export default TodoItme;