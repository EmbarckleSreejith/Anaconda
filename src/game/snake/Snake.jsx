import './styles.scss';

export const Snake =({snake})=>{
    
    return <div className="snake">
        {snake.map((dot,i)=>{
            let style = {
                top:`${dot[0]}%`,
                left:`${dot[1]}%`,
            }
           return <div className="snake-dot" key={`snakeDot${i}`} style={style} ></div>
        })
        }
        
    </div>
}