import React from 'react'

const OtherShip = () => {
    return (
        <div>
            <div className='shipping-other' >
                <div className='new-form'>
                    <div className='d-flex'>
                        <div className="mb-3">
                            <label htmlFor="firstname" className="form-label">First name</label>
                            <input type="text" className="form-control" id="first name" name='first name' aria-describedby="emailHelp" />
                        </div>
                        <div className="mb-3" id="lastname">
                            <label htmlFor="last name" className="form-label">Last name</label>
                            <input type="text" className="form-control" id="lastname" name='enter last name' />
                        </div>
                    </div>
                </div>
                <div className='width-1 mb-3' id='width-1'>
                    <label htmlFor="" className="form-label">Company name</label>
                    <input type="text" className="form-control" id="first name" name='first name' aria-describedby="emailHelp" />
                </div>
                <div className='width-1 mb-3' id='width-1'>
                    <label htmlFor="" className="form-label">Street address *</label>
                    <input type="text" className="form-control" id="first name" name='first name' aria-describedby="emailHelp" />
                </div>
                <div className='width-1 mb-3' id='width-1'>
                    <label htmlFor="" className="form-label"></label>
                    <input type="text" className="form-control" id="first name" name='first name' aria-describedby="emailHelp" placeholder='Apartment, suite, unit, etc. ' />
                </div>
                <div className='width-1 mb-3' id='width-1'>
                    <label htmlFor="" className="form-label">Town / City *</label>
                    <input type="text" className="form-control" id="first name" name='first name' aria-describedby="emailHelp" />
                </div>
                <div className='avivanjara mb-3 ' id='width-1'>
                    <select className="form-select  avivanjara" aria-label="Default select example">

                        <option value="AS" label="American Samoa">American Samoa</option>
                        
                    </select>
                </div>
                <div className='width-1 mb-3' id='width-1'>
                    <label htmlFor="" className="form-label">Zip code</label>
                    <input type="text" className="form-control" id="first name" name='first name' aria-describedby="emailHelp" />
                </div>
            </div>
        </div>
    )
}

export default OtherShip