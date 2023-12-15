import './index.css'


const WeatherCard = props=>{
    const {weatherItems} = props
    const {time,values} = weatherItems
    return (
        <li className='weather-cards'>
            <h1 className='weather-card-heading'>Time : {time}</h1>
            <div className='main-values-container'>
            <div className='values-container'>
                <p className='values'>Max CloudBase : {values.cloudBaseMax}</p>
                <p className='values'>Max Humidity: {values.humidityMax}</p>
            </div>
            <div className='values-container'>
                <p className='values'>Max Temperature : {values.temperatureMax}</p>
                <p className='values'>Avg Temperature : {values.temperatureAvg}</p>
            </div>
            </div>
        </li>
    )

}


export default WeatherCard