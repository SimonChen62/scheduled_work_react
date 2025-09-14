import React, { useState } from 'react'

function Pra2(){

    const [value,setValue] =useState('')

    return(
        <div>

            <input type='text' value={value} onChange={(e)=>setValue(e.target.value)}/>  
            {/* 监听输入框，e.target是input这个dom，.value是他这个value属性*/}






        </div>


    )
}

export default Pra2