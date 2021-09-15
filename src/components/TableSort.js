import React from 'react';
import {DetailDescription} from './DetailDescription'
import {useEffect, useState} from 'react'
import {connect} from "react-redux";
import {getData} from "../redux/actions/actions";
import './../App.css';


const tableLayout = [
    ['№', 'id'],
    ['First Name', 'firstName'],
    ['Last Name', 'lastName'],
    ['Email', 'email'],
    ['Phone', 'phone'],
    ['State', 'state']
]

export const FilterField = () => {

    return (
        <div>
            <input/>
        </div>
    )
}


const TableSort = ({data, getData}) => {

    const [dataState, setDataState] = useState()
    const [columnToSort, setColumnToSort] = useState()
    const [displaySegment, setDisplaySegment] = useState()
    const [segmentIndex, setSegmentIndex] = useState(0)
    const [maxSegmentLists, setMaxSegmentLists] = useState()
    const [detailDescription, setDetailDescription] = useState(null)
    const [inputValue, setInputValue] = useState('')
    const [filterValue, setFilterValue] = useState()
    const [currentFilterState, setCurrentFilterState] = useState()


    useEffect(() => {
        getData()
    }, [])


    useEffect(() => {
        if (data.data !== undefined) {
            setDataState(data.data)
            setMaxSegmentLists(Math.ceil(data.data.length / 20) - 1)
        }
    }, [data])


    useEffect(() => {
        if (dataState !== undefined) {
            setDisplaySegment(dataState.slice(0, 20))
            setMaxSegmentLists(Math.ceil(dataState.length / 20))
        }
    }, [dataState])


    const handleColumnSort = (param) => {
        setColumnToSort(param)
        if (columnToSort === param) {
            setColumnToSort(param + 'Down')
            const newState = dataState.reverse()
            setDataState([...newState])
            setDisplaySegment(dataState.slice(dataState.length - 20, dataState.length))
            if (maxSegmentLists === 0) {
                setSegmentIndex(maxSegmentLists)
                return;
            }
            setSegmentIndex(maxSegmentLists - 1)
            return
        }
        const newState = dataState.sort((a, b) => {
            if (a[param] < b[param]) {
                return -1;
            }
            if (a[param] > b[param]) {
                return 1;
            }
            return 0;
        })
        setDataState([...newState])
        setDisplaySegment(dataState.slice(0, 20))
        setSegmentIndex(0)
    }

    const handleFilter = (e) => {
        e.preventDefault()
        if (inputValue === '') {
            setDataState(data.data)
            return
        }
        let newState = dataState.filter((item) => {
            if (item[filterValue] == inputValue) {
                return true
            }
            return false
        })
        setDataState(newState)
        setSegmentIndex(0)
    }

    const handleStateFilter = (e) => {
        e.preventDefault()
        let newState = dataState.filter((item) => {
            if (item.adress.state == currentFilterState) {
                return true
            }
            return false
        })
        setDataState(newState)
        setSegmentIndex(0)
    }

    const handleSelectPage = (value) => {
        if (value === 'next') {
            const nextIndex = (segmentIndex + 1) * 20
            const nextEndIndex = nextIndex + 20
            setDisplaySegment(dataState.slice(nextIndex, nextEndIndex))
            setSegmentIndex(segmentIndex + 1)
            return
        }
        if (value === 'prev') {
            const prevIndex = (segmentIndex - 1) * 20
            const prevEndIndex = prevIndex + 20
            setDisplaySegment(dataState.slice(prevIndex, prevEndIndex))
            setSegmentIndex(segmentIndex - 1)
            return
        }
    }

    const handleDeleteFilter = (e) => {
        e.preventDefault()
        setDataState(data.data)
    }

    return (
        <div>
            <form>
                <input
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                />
                <select defaultValue={'DEFAULT'} value={filterValue} onChange={e => setFilterValue(e.target.value)}>
                    <option value="DEFAULT" disabled>Choose option</option>
                    <option value="id">№</option>
                    <option value="firstName">First Name</option>
                    <option value="lastName">Last Name</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                </select>
                <button onClick={handleFilter}>Confirm</button>
            </form>
            <form>
                <select defaultValue={'DEFAULT'} value={currentFilterState}
                        onChange={e => setCurrentFilterState(e.target.value)}>
                    <option value='DEFAULT' disabled>Choose state</option>
                    <option value="WI">WI</option>
                    <option value="TI">TI</option>
                    <option value="FL">FL</option>
                    <option value="NE">NE</option>
                    <option value="OR">OR</option>
                </select>
                <button onClick={handleStateFilter}>Confirm</button>
            </form>
            <form>
                <button onClick={handleDeleteFilter}>Clear filter</button>
            </form>
            <table className="Table">
                <thead>
                <tr className="TableUpperRow">
                    {tableLayout.map((item, index) => {
                        return <th key={index} className="TableCeil" onClick={() => handleColumnSort(item[1])}>
                            <p>{item[0]}</p>
                            <span>{columnToSort === item[1] ? '🔼' : columnToSort === item[1] + 'Down' ? '🔽' : null}</span>
                        </th>
                    })}
                </tr>
                </thead>
                <tbody>
                {displaySegment && displaySegment.map((item, index) => {
                    return <tr key={index} className="TableCeil" onClick={() => setDetailDescription(item)}>
                        <th>{item.id}</th>
                        <th>{item.firstName}</th>
                        <th>{item.lastName}</th>
                        <th>{item.email}</th>
                        <th>{item.phone}</th>
                        <th>{item.adress.state}</th>
                    </tr>
                })}
                </tbody>
            </table>
            <ul className="PageScroller">
                {segmentIndex !== 0 ?
                    <li>
                        <button className="PageButtons" onClick={() => handleSelectPage('prev')}>prev</button>
                    </li> : null}
                <li>{segmentIndex + 1}</li>
                {segmentIndex + 1 !== maxSegmentLists && maxSegmentLists !== 0 ?
                    <li>
                        <button className="PageButtons" onClick={() => handleSelectPage('next')}>next</button>
                    </li> : null}
            </ul>
            {detailDescription && <DetailDescription description={detailDescription}/>}
        </div>
    )
}

const mapStateToProps = (({dataList}) => ({
    data: dataList
}))

const mapDispatchToProps = {
    getData
}

export default connect(mapStateToProps, mapDispatchToProps)(TableSort)
