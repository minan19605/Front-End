import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Highlight = ({icon, title, para}) => {
    return (
    <div className="highlight">
        <div className="highlight__img">
            {icon}
        </div>
        <div className="highlight__subtitle">
            <h3>{title}</h3>
        </div>
        <p className="highlight__para">{para}</p>
    </div>
    )
}

export default function Highlights() {
  return (
    <section id="highlights">
        <div className="container">
            <div className="row">
                <h2 className="section__title">Why Choose <span className="purple">Library</span></h2>
                <div className="highlight__wrapper">
                    <Highlight
                        icon={<FontAwesomeIcon icon='bolt' />}
                        title="Easy and Quick"
                        para="Get access to the book you purchased online instantly."
                    />
                    <Highlight
                        icon={<FontAwesomeIcon icon='book-open' />}
                        title="10,000+ Books"
                        para="Library has books in all your favourite categories."
                    />
                    <Highlight
                        icon={<FontAwesomeIcon icon='tags' />}
                        title="Affordable"
                        para="Get your hands on popular books for as little as $10."
                    />
                </div>
            </div>
        </div>
    </section>
  )
}
