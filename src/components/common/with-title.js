import React from 'react'

export default function withTitle (title, component) {
    return (
        <main className="home">
            <section className="container">
                <div className="row">
                    <h1>{title}</h1>
                    {component}
                </div>
            </section>
        </main>
    )
}