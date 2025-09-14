import { use } from "react"
import React, { useState , useEffect} from 'react'

const URL = "http://geek.itheima.net/v1_0/channels"
function Pra3(){

    const [list,setlist]=useState('')

    useEffect(()=>{
        // 发送请求获取数据,额外的操作，获取频道列表
        async function getlist(){
            const res=await fetch(URL)  //异步处理，可以同时进行其他的操作，不会卡顿
            const resa =await res.json()
            console.log(list)   
            setlist(resa.data.channels)
        }
        getlist()
    },[])

    return(
        <div>

        this is app
        <ul>
            {list.map(item=><li key={item.id}>{item.name}</li>)}

        </ul>
        </div>


    )
}

export default Pra3