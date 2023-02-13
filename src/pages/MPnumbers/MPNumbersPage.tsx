import {useState} from 'react'
import { Header } from '../../components/Header/Header';
import { MPsPage } from '../../components/Step/MPsPage';
import { CommittePage } from '../../components/Step/CommittePage';
import { FactionPage } from '../../components/Step/FactionPage';
import './MPnumStyle.scss'

export const MPNumbersPage = () => {


  const [step, setStep] = useState(true);
  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(false);


  const changestep=()=>{
    setStep(false)
    setStep1(true)
    setStep2(false)
  }
  const changestep1=()=>{
    setStep(false)
    setStep1(false)
    setStep2(true)
  }
  const changestep2=()=>{
    setStep(true)
    setStep1(false)
    setStep2(false)
  }

  return (
    <div className='number'>
        <Header/>
      <div className='container6'>
        <div className='container7'>
          <img src='./images/Phone.png' alt='' />
          { step &&<h2>Պատգամավորների աշխատանքային հեռախոսահամարները</h2>}
          { step1 &&   <h2>Հանձնաժողովների հեռախոսահամարները</h2>}
          { step2 && <h2>Խմբակցությունների հեռախոսահամարները</h2>}
        </div>
        <div className='buttons'>
        <button className={step? 'active':'pasive'} onClick={()=> changestep2()}>Պատգամավորներ</button>
        <button className={step1? 'active':'pasive'} onClick={()=> changestep()}>Հանձնաժողովներ</button>
        <button className={step2? 'active':'pasive'} onClick={()=> changestep1()}>Խմբակցություններ</button>
        </div>
        
    {
      step  && <MPsPage/> 
    }
     
     {
      step1 && <CommittePage/>
     } 
     {
      step2 &&   <FactionPage/> 
     }
    
      </div>
  
      </div>
  )
}
