import React from 'react'
import './DeleteText.scss'

const DeleteText = ({ removeitem, setRemoveitem, deleteItem, }: any) => {

  // removeitem[2].preventDefault()
  return (
    <div className='DeleteHeader'>
      <div className='DeleteText'>
        <p>Ջնջել?</p>
        <div className='buttons'>
          <button className='yes' onClick={() => { deleteItem(...removeitem); setRemoveitem([-1] ) }}>Այո</button>
          <button className='no' onClick={() => setRemoveitem([-1])}>Ոչ</button>
        </div>
      </div>
    </div>

  )
}

export default DeleteText