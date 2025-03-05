import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
import { Spin, Button } from 'antd'
import { Link } from 'react-router-dom'



const Home = () => {
    const { allCoin, currency } = useContext(CoinContext)
    const [isLoading, setIsLoading] = useState(true)
    const [displayCoin, setDisplayCoin] = useState([]);
    const [input, setInput] = useState('')


    const handleInput = (e) => {
        setInput(e.target.value)
        if (e.target.value === "") {
            setDisplayCoin(allCoin)
        }
    }

    const handleSubmitForm = async (e) => {
        e.preventDefault()
        const coins = await allCoin.filter((items) => {
            return items.name.toLowerCase().includes(input.toLocaleLowerCase())
        })
        setDisplayCoin(coins)
    }

    useEffect(() => {
        setIsLoading(true)
        setDisplayCoin(allCoin)
    }, [allCoin])

    useEffect(() => {
        if (displayCoin.length > 0) {
            setIsLoading(false)
        }
    }, [displayCoin])
    const handleSearch = () => {
        setIsLoading(true)
    }

    return (
        <Spin spinning={isLoading}>
            <div className='home '>
                <div className='hero'>
                    <h1 className='text-[40px] font-bold'>Largest <br /> Crypto Marketplace </h1>
                    <p> Welcome to the world's larget cryptocurrency marketplace.
                        Sign up to explore more about cryptos.</p>
                    <form onSubmit={handleSubmitForm}>
                        <input onChange={handleInput} list='coinlist' value={input} type='text' className='text-black' placeholder='Search crypto...' />
                        <datalist id='coinlist'>
                            {allCoin.map((item, index) => (
                                <option key={index} value={item.name} />
                            ))}
                        </datalist>

                        <button onClick={handleSearch} className='text-black bg-red-300 rounded-full'> Search </button>
                    </form>
                </div>
                <div className="crypto-table">
                    <div className="table-layout">
                        <div>#</div>
                        <div>Coins</div>
                        <div>Price</div>
                        <div style={{ textAlign: "left" }}>24H Change</div>
                        <div className="market-cap">Market Cap</div>
                    </div>
                    {displayCoin.slice(0, 10).map((items, index) => (
                        <Link to={`/coin/${items.id}`} className="table-layout" key={index}>
                            <p>{items?.market_cap_rank}</p>
                            <div>
                                <img src={items?.image} alt="image" className='w-10 h-10' />
                                <p>{items.name + " - " + items?.symbol?.toUpperCase()}</p>
                            </div>
                            <div>{currency?.symbol} {items.current_price?.toLocaleString()} </div>
                            <div className={items.price_change_percentage_24h > 0 ? "green" : "red"}>{Math.floor(items.price_change_percentage_24h * 100) / 100} </div>
                            <div className='market-cap'>{currency?.symbol} {items.market_cap.toLocaleString()}</div>
                        </Link>
                    ))}
                </div>
            </div>
        </Spin>
    )
}

export default Home
