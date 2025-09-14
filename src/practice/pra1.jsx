//项目根组件
//app进入到index.js中，到public的index.html中
import {useState} from 'react'
import './index.css' //导入css文件
const count1 =100

function HelloWorld() {
  return 'Hello World'
}

const list=[{id:2,name:'1'},{id:1,name:'2'}]

const islogin = true

const articletyple =1

function getArticleTypeName() {
  if (articletyple === 1) {
    return '文章'
  } else if (articletyple === 2) {
    return '视频'
  } else {
    return '其他'
  }
}

function Button(){
  return <button>按钮</button>
}

//usesState计数器

function App() {
   const handle=(e,a) => {
        console.log('点击了按钮',e,a) //在控制台给出结果
      }

    const[count,setCount]=useState(0) //count是状态变量，setCount是更新状态的函数，useState可以一直渲染
    const clickadd=()=>{
      setCount(count+1)//更新和重新渲染 
    }

    const [formm,setform]=useState({name : 'aj'})

    const changeForm = () => {
      setform({...formm,name:'aj2'})//这样才能保留其他的属性
    }

  return (
    <div className="App">
      this is app
      {'this is app'} {/* 使用引号传递字符串，都是大括号加东西 */} 
      {count1} {/* 使用变量 */}
 
      {HelloWorld()} {/* 使用函数调用 */}
      
      {new Date().getDate()} {/* 使用方法调用，注意这里的函数没有定义，日期 */ }

      <div style={{ color: 'red'}}> this is div </div> {/* 使用style ,JavaScript对象，外层括号是识别语法，内层是识别的对象结构*/}

      <ul>
        {list.map(item => <li key={item.id}>{item.name}</li>)} {/* 使用map遍历数组，注意key的使用,item是每一个元素 */}

      </ul>

      {/* 使用逻辑与 */}
      {islogin && <span>已经登录</span>}

      {/* 使用三元运算 */}
      <div>{islogin ? '已经登录' : '未登录'}</div>

      {getArticleTypeName()}
      <button onClick={(a)=>handle('av',a)}>click me </button>

      {Button() /* 调用组件，注意这里是函数调用，不是标签*/  }

      <Button> </Button> {/* 组件标签调用，注意这里是标签调用，不是函数调用*/}

      <button onClick={clickadd}>{count}</button>

      <button onClick={changeForm}>修改{formm.name}</button>


      {/*  行内样式控制*/ }
      <div style={{color:'blue',fontSize:'20px'}}> this is a test </div>

      {/* 通过class类名表示 */}
      <div className='foo'> this is another test</div>

      
    </div>
  )
}

export default App
