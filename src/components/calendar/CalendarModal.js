import React, { useState } from 'react'
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/ui';


export const CalendarModal = () => {

    const  dispatch = useDispatch()

    const {modalOpen} = useSelector(state => state.ui)

    const now = moment().minutes(0).seconds(0).add(1,'hours')
    const nowPlus1 = now.clone().add(1,'hours')

    const [dateStart, setDateStart] = useState(now.toDate())
    const [dateEnd, setDateEnd] = useState(nowPlus1.toDate())
    const  [formValues, setFormValues] = useState({
        title: 'Evento',
        notes: '',
        start: now.toDate(),
        end: nowPlus1.toDate()
    })

    const [titleValid, settitleValid] = useState(true)

    const handleInputChange = ({target}) =>{

        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const {title, notes, start, end} = formValues

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      };
    
    Modal.setAppElement('#root')


    const closeModal = () =>{
       dispatch(uiCloseModal())
    }

    const handleDataStartChange = (e)=>{
        setDateStart(e)
        setFormValues({
            ...formValues,
            start: e
        })
    }

    const handleDateEndChange = (e) => {
        setDateEnd(e)
        setFormValues({
            ...formValues,
            end: e
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        const momentStart = moment(start)
        const momentEnd = moment(end)
        if(momentStart.isSameOrAfter(momentEnd)){
            return Swal.fire('Error', 'The end-date must be greater than the start date', 'error')
        }
        if(title.trim().length <2){
            return settitleValid(false)
        }

        settitleValid(true)
        closeModal()

    }

    return (
        <Modal
        isOpen={modalOpen}
        onRequestClose={closeModal}
        style={customStyles}
        className='modal'
        closeTimeoutMS={200}
        overlayClassName='modal-fondo'
      >
          <h1> New event </h1>
            <hr />
            <form 
            className="container"
            onSubmit={handleSubmit}
            >

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker
                      onChange={handleDataStartChange}
                      value={dateStart}
                      className='form-control'
                      locale='en-EN'
                    />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker
                      onChange={handleDateEndChange}
                      value={dateEnd}
                      className='form-control'
                      minDate={dateStart}
                      locale='en-EN'
                    />
                </div>

                <hr />
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input 
                        type="text" 
                        className= {`form-control ${!titleValid && 'is-invalid'}`}
                        placeholder="Título del evento"
                        name="title"
                        value={title}
                        onChange={handleInputChange}
                        autoComplete="off"
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea 
                        type="text" 
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
      </Modal>
    )
}
