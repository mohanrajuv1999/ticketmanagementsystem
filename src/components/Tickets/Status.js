import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom';
import { apiCall } from '../securityAuth/jwtAuthprovider';

function Status() {


    const { id } = useParams()
    const [apiData, setApiData] = useState([]);
    const [update, setUpdate] = useState('');
    const [apiDataStatus, setApiDataStatus] = useState([]);

    const navigate = useNavigate();

    function retriveTicket() {
        apiCall.get(`/api/ticket/ticket/${id}`)
            .then((response) => {
                setApiData(response.data);
                console.log(response)
            }).catch((err) => {
                console.log(err)
            });
    }
    function retriveStatus() {
        apiCall.get(`/api/ticket/ticket/${id}/status`)
            .then((response) => {
                setApiDataStatus(response.data);
                console.log(response.data)
                console.log(response)
            }).catch((err) => {
                console.log(err)
            });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        apiCall.post(`/api/ticket/status/${id}`, {
            description: update
        }).then(() => {
            window.location.reload(true)
            
        }).catch((err) => {
            console.log(err)
        });
    }

    useEffect(() => {
        retriveStatus();
    }, [])

    useEffect(() => {
        retriveTicket();
    }, [])

    function editTicket(id)
    {
        navigate(`/edit/${id}`);
    }


    // useEffect(
    //     () => retriveTicket(), [id]
    // )

    return (

        <div className="boder1">
            <div className="row">
                <div className="column1" >


                    <table className="status-table">
                        <h1>Detail of the Ticekt</h1>
                        <tr>
                            <th>ID</th>
                            <td>{apiData.id}</td>
                        </tr>
                        <tr>
                            <th>TITILE</th>
                            <td>{apiData.title}</td>
                        </tr>
                        <tr>
                            <th>Decription</th>
                            <td>{apiData.description}</td>
                        </tr>
                        <tr>
                            <th>LastUpdate</th>
                            <td>{apiData.lastUpdated}</td>
                        </tr>
                        <tr>
                            <th>CreatedBy</th>
                            <td>{apiData.createdBy}</td>
                        </tr>
                        <tr>
                            <th>AssignedTo</th>
                            <td>{apiData.assigned_to}</td>
                        </tr>
                        <tr>
                            <th>Stage</th>
                            <td>{apiData.stage}</td>
                        </tr>
                        <tr>
                            <th>Priority</th>
                            <td>{apiData.priority}</td>
                        </tr>
                        <tr>
                            <th></th>
                            <td>
                            <a className='btn btn-info' onClick={() => editTicket(apiData.id)}>WorkNote</a>

                            </td>
                        </tr>
                    </table>

                </div>
                <div className="column2" >
                    <div className='form-group'>
                        <h1>Updates of the ticket</h1>
                        <table className="status-table">
                            <thead>
                                <tr>
                                    <th>ID</th>&nbsp;<br></br>

                                    <th>Author</th>&nbsp;<br></br>
                                    <th>Update Time</th>&nbsp;<br></br>
                                    <th>Description</th>&nbsp;<br></br>
                                </tr>
                            </thead>
                            <tbody>
                                {apiDataStatus.map((item) => {
                                    return (
                                        <tr>
                                            <td>{item.id}</td>&nbsp;<br></br>

                                            <td>{item.author}</td>&nbsp;
                                            <td>{item.updateDate}</td>&nbsp;
                                            <td>{item.description}</td>&nbsp;<br></br>
                                        </tr>
                                    )
                                }
                                )
                                }

                            </tbody>
                        </table>
                        <form onSubmit={handleSubmit} className='Createruser-form'>

                            <div className="md-form">
                                <label >Enter the update details</label>
                                <textarea id="form7" className="md-textarea form-control" rows="3" onChange={(e) => setUpdate(e.target.value)}></textarea>

                            </div>
                            <div className='d-grid'>
                                <input type='submit' value='Submit' className='btncreate' />
                            </div>

                        </form>
                    </div>

                </div>
            </div>

            <div className='mb-2 mt-2'>
                <Link to='/TicketHome'>
                    <button className='btn btn-primary'>Back</button>
                </Link>
            </div>
        </div>




    )
}


export default Status;