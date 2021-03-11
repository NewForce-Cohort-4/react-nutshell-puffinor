import React from "react"
import { Link } from "react-router-dom"
import "./Article.css"

export function ArticleCard({ article }) {
    return(
        <section className="article">
        <h3 className="article__title">{article.title}</h3>
        <div className="article__synopsis">Synopsis: {article.synopsis}</div>
        <Link className="article__url">{article.url}</Link>
    </section>
    )
}

