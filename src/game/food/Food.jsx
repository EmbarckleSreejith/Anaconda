import './styles.scss';

export const Food = ({food}) =>{
    let style = {        
        top : `${food[0]}%`,
        left: `${food[1]}%`,
    }
    return <div className="food" style={style}></div>
}