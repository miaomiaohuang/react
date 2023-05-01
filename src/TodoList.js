import React, { Component } from 'react';
import './style.css';
import TodoItme from './TodoItme'

class TodoList extends Component{

  //当组件的state或props发生改变时，render函数就会重新执行(props，state与render函数的关系)
  constructor(props){
    super(props);
    this.state = {
        inputVal : '',
        list : []
    }
  }

    render(){

      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleBtnClick = this.handleBtnClick.bind(this);
      this.handleItemDelete = this.handleItemDelete.bind(this);

        return (
          <>
            <div>
                 {/*这个是一个注释，必须写在{}里面*/}
                 {
                 /*jsx语法：
                    1、引用class必须使用className
                    2、事件名称必须使用骆驼命名写法
                    3、<label>标签的for属性，需要写成htmlFor
                      3.1、for属性：输入光标定位到指定id的input输入框
                 */
                 }
                <label htmlFor="insertArea">输入内容：</label>
                <input id="insertArea" className = 'todolist-input' value={this.state.inputVal} onChange={this.handleInputChange}></input> 
                <button onClick={this.handleBtnClick}>新增</button>
            </div>

            <ul>
                {this.getTodoItem()}
            </ul>
          </>
        )
    }

    handleInputChange(e){
      //写法1
      /*
      this.setState(
        {
          inputVal:e.target.value
        }
      )
      */

      //写法2：异步执行
      const value =e.target.value;
      this.setState(() => ({
          inputVal:value
        })
      );
    }

    handleBtnClick(){
        this.setState(
          {
            list :[...this.state.list,this.state.inputVal],
            inputVal : ''
          }
        )
    }

    handleItemDelete(index){
      const li = [...this.state.list];
      li.splice(index,1);
      this.setState({
        list : li
      });
      console.log(index)
  }

  //实现3：使用自定义子标签方式
  getTodoItem(){
    return this.state.list.map((item,index) => {                    
      /*
        1、父组件传值给子组件：
             1.1 通过在父组件定义属性的方式进行传值，比如示例 <TodoItme> 定义了属性content
             1.2 在子组件通过 this.props.属性名称 获取数据值
        2、子组件传值给父组件：
             2.1 通过在父组件定义属性的方式进行传值，比如示例 <TodoItme> 定义了属性delItme，属性delItme指向方法this.handleItemDelete
             2.2 在子组件调用父组件方法时，记住要this的指向
      */
      return (
           <TodoItme 
              content={item} 
              index={index}
              key={index}
              delItme = {this.handleItemDelete}
           />
      )

    })
  }
  
  getTodoItem1(){
    return this.state.list.map((item,index) => {
      return <li key = {index} onClick={this.handleItemDelete.bind(this,index)}>{item}</li>
    })
  }

  //实现2：无需转义HTML标签的写法
  getTodoItem2(){

    return this.state.list.map((item,index) => {
                     
      return (
        <li key = {index}
            onClick={this.handleItemDelete.bind(this,index)}
            dangerouslySetInnerHTML={{__html:item}}
        >
        </li>
      )
    })
  }

}  

export default TodoList;