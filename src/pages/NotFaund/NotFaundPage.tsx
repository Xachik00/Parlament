import './NotFaundPage.scss'

const NotFaundPage = () => {
  return (
    <div className='NotFaundPage'>
       <div className="error_section">
        <div className="error_block">
            <div className="block_title">Ներողություն, այս էջը չի գտնվել</div>
            <div className="block_description">The page you are looking for is not available or does not exist</div>
            <div className="page_links">
                <a href="/Admin" className="back_home">Back to home</a>
            </div>
        </div>
        <div className="image_block">
            <img src="https://www.arenmehrabyan.org/css/images/404.png" alt="" />
        </div>
    </div>
    </div>
  )
}

export default NotFaundPage