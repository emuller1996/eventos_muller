import React, { useEffect, useState } from 'react'
import { useFunciones } from '../../hooks/useFunciones'
import { Link } from 'react-router-dom'

const Landing = () => {
  const [index, setIndex] = useState(0)

  const { getAllFunciones, data: ListFunciones } = useFunciones()

  useEffect(() => {
    getAllFunciones()
  }, [])

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex)
  }
  return (
    <div>
      <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center bg-light">
        <div className="col-md-5 p-lg-5 mx-auto my-5">
          <h1 className="display-4 fw-normal">Punny headline</h1>
          <p className="lead fw-normal">
            And an even wittier subheading to boot. Jumpstart your marketing efforts with this
            example based on Apple’s marketing pages.
          </p>
          <a className="btn btn-outline-secondary" href="#">
            Coming soon
          </a>
        </div>
        <div className="product-device shadow-sm d-none d-md-block"></div>
        <div className="product-device product-device-2 shadow-sm d-none d-md-block"></div>
      </div>
      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">
            {ListFunciones &&
              ListFunciones.map((fun) => (
                <div key={fun._id} className="col">
                  <div className="card  h-100 shadow-sm">
                    <img
                      style={{ maxHeight: '300px' }}
                      src={fun.image}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body d-flex flex-column justify-content-between">
                      <h4>{fun.name}</h4>
                      <p className="card-text">{fun.end_date}</p>
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                          <Link
                            to={`show/${fun._id}`}
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                          >
                            Comprar Boletos
                          </Link>
                        </div>
                        <small className="text-muted">9 mins</small>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <h3>TEST EVENTOS</h3>
      </div>
    </div>
  )
}

export default Landing
