import React from 'react'

export default function ExploreMore() {
  return (
    <section id="explore">
        <div className="container">
            <div className="row">
                <div className="section_title">
                    <h2>Explore more <span className="purple">Books</span></h2>
                </div>
                <a href="/books">
                    <button className="btn">Browse books</button>
                </a>
            </div>
        </div>
    </section>
  )
}
