import React , { useState } from 'react'
import { Formik, Form, Field } from 'formik';
import './content.css'

const App = () => {

  const [data , setData] = useState([])
  const open = (url) => {
    window.open(url)
  }
  console.log(data)

  return (
    <div>
      <header>
        <Formik
          initialValues={{ search: '' }}
          onSubmit={ 
            async values => {
              const UrlKey = 'Yyr3Twsf5HSxeMt8G7Jjj670My6AemG9CkgEStDKpHQ'
              const URL = 'https://api.unsplash.com/search/photos?per_page=20&query='
              const response = await fetch(URL + values.search, {
                headers: {
                  'Authorization': 'Client-ID ' + UrlKey
                }
              })
              const data = await response.json()
              setData(data.results)
            }
          }
        >
          <Form>
            <Field name='search' />
          </Form>
        </Formik>
      </header>
      <div className='container'>
        <div className='center'>
          {
            data.map(photo => 
            <article key={photo.id} onClick={() => open(photo.links.html)}>
              <img src={photo.urls.regular}/>
              <p>{[photo.description , photo.alt_description].join('-')}</p>
            </article>)
          }
        </div>
      </div>
    </div>
  )
}

export default App
