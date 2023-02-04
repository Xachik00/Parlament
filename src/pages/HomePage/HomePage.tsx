import {useNavigate} from 'react-router-dom'

export const HomePage = () => {


  const navigate = useNavigate();
  const  parlament:any  = [
    {
      "id": 1,
      "title": "DocCirculation",
      "description": "Քաղաքացիների ընդունելության և փաստաթղթա- շրջանառության կարգը",
      "img": "./images/Frame1.png"
    },
    {
      "id": 2,
      "title": "TimeTable",
      "description": "Քաղաքացիների ընդունելության ժամանակացույց",
      "img": "./images/Frame2.png"
    },
    {
      "id": 3,
      "title": "Committees",
      "description": "Մշտական հանձնաժողովները և նրանց գործունեության ոլորտները",
      "img": "./images/Frame3.png"
    },
    {
      "id": 4,
      "title": "MeetingsSchedule",
      "description": "ԱԺ նիստերի ժամանակացույց",
      "img": "./images/Frame4.png"
    },
    {
      "id": 5,
      "title": "MPNumbers",
      "description": "Պատգամավորների աշխատանքային հեռախոսահամարները",
      "img": "./images/Frame5.png"
    },
    {
      "id": 6,
      "title": "DepNumbers",
      "description": "Կառուցվածքային ստորաբաժանումների հեռախոսահամարներ",
      "img": "./images/Frame6.png"
    }
  ]
  // const dispatch = useAppDispatch()

  // useEffect(() => {
  //   dispatch(fetchParlament())
  // },[])
  


  return (

    <div className='Home'>
      <header >
        <img src="./images/Logo.png" alt="" />
        <div className='hello-text'>
          <h1>Բարի Գալուստ <br /> Հայաստանի Հանրապետության ազգային ժողով</h1>
        </div>
      </header>
      <p>Հարգելի քաղաքացի ընտրեք ձեզ հետաքրքրող բաժինը ինֆորմացիա ստանալու համար</p>
      <div className='Home-parlament'>{
        parlament?.map((item:any) => <div className='Home-item' key={item.id} onClick={() => navigate('/' + item.title)}>
          <img src={item.img} alt="" />
          <h4>{item.description}</h4></div>
        )
      }
      </div>
    </div>
  )
}
