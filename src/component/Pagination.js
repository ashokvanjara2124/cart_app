import React, { useEffect, useState } from 'react'

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
    const [loading, setLoading] = useState(false);
    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)
    // console.log("number is",pageNumbers);
    // useEffect(() => {
    //     setLoading(true);
    //     setTimeout(() => {
    //       setLoading(false);
    //     }, 5000);
    //   }, []);


    const nextPage = () => {
        if (currentPage !== nPages) setCurrentPage(currentPage + 1)
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 5000);
    }
    const prevPage = () => {
        if (currentPage !== 1) setCurrentPage(currentPage - 1)
    }
    return (
        <nav>

            <ul className='pagination justify-content-center'>
                <li className="page-item">
                    <a className="page-link"
                        onClick={prevPage} href='#'>
                        Previous</a>


                </li>
                {pageNumbers.map(pgNumber => (
                    <li key={pgNumber}
                        className={`page-item ${currentPage === pgNumber ? 'active' : ''} `} >

                        <a onClick={() => setCurrentPage(pgNumber)}
                            className='page-link'
                            href='#'>

                            {pgNumber}
                        </a>
                    </li>
                ))}
                <li className="page-item">
                    <a className="page-link"
                        onClick={nextPage}
                        href='#'>

                        Next
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default Pagination