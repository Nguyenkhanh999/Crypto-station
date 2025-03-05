import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import "./Coin.css"
import LineCharts from '../../components/LineCharts/LineCharts'
import { CoinContext } from '../../context/CoinContext'
const Coin = () => {
    const { coinId } = useParams()
    const [coinData, setCoinData] = useState()
    const [historyCalData, setHistoryCalData] = useState()
    const { currency } = useContext(CoinContext)
    const [isLoading, setIsLoading] = useState(false)

    console.log("currency", currency);

    const fetchCoindata = async () => {
        setIsLoading(true)
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-mA9qd7KPFZQUNdBHqVFatvoo' }
        };

        fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
            .then(res => res.json())
            .then(res => setCoinData(res))
            .catch(err => console.error(err));
        setIsLoading(false)

    }

    const fetchHistoryCalData = async () => {
        const options = {
            method: 'GET',
            headers: { accept: 'application/json', 'x-cg-demo-api-key': 'CG-mA9qd7KPFZQUNdBHqVFatvoo' }
        };

        fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
            .then(res => res.json())
            .then(res => setHistoryCalData(res))
            .catch(err => console.error(err));
    }


    useEffect(() => {
        fetchCoindata()
        fetchHistoryCalData()

    }, [currency])
    if (coinData && historyCalData) {

        console.log("coinData", coinData);

        return (
            <div className='coin'>
                <div className="coin-name">
                    <img src={coinData?.image.large} alt="" />
                    <p><b>{coinData?.name} ({coinData.symbol.toUpperCase()})</b></p>
                </div>
                <div className="coin-chart">
                    <LineCharts historyCalData={historyCalData} />
                </div>

                <div className="coin-info mt-20">
                    <ul>
                        <li>Crypto Market Rank </li>
                        <li>{coinData.market_cap_rank}</li>
                    </ul>
                    <ul>
                        <li>Crypto Price </li>
                        <li>{currency.symbol} {coinData.market_data.current_price?.[currency.name].toLocaleString()}</li>
                    </ul>
                    <ul>
                        <li>Market Cap </li>
                        <li>{currency.symbol} {coinData.market_data.market_cap?.[currency.name].toLocaleString()}</li>
                    </ul>
                    <ul>
                        <li>24H Hour Hight </li>
                        <li>{currency.symbol} {coinData.market_data.high_24h?.[currency.name].toLocaleString()}</li>
                    </ul>
                    <ul>
                        <li>24H Hour Low </li>
                        <li>{currency.symbol} {coinData.market_data.low_24h?.[currency.name].toLocaleString()}</li>
                    </ul>
                </div>
            </div>
        )
    } else {
        return (
            <div className='spinner'><div className='coin'></div></div>
        )
    }
}

export default Coin
