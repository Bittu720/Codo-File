import React from 'react'

function Footer() {
    const date = new Date();
    const year = date.getFullYear();
  return (
    <> 
        <div class="wave-container wave">
            <p>© {year}, Developed & Designed with ❤️ by <a className='footer_Bittu' target='_Bittu' href='https://github.com/Bittu720'>Bittu Kushwaha</a></p>
        </div>
    </>
  )
}

export default Footer